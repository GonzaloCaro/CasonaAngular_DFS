import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilComponent } from './perfil.component';
import { FormsModule } from '@angular/forms';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'sesion') {
        return JSON.stringify({
          nombre: 'Juan Pérez',
          usuario: 'juanperez',
          email: 'juan@example.com',
          password: '123456',
          tipo: 'usuario',
        });
      }
      if (key === 'usuarios') {
        return JSON.stringify([
          {
            nombre: 'Juan Pérez',
            usuario: 'juanperez',
            email: 'juan@example.com',
            password: '123456',
            tipo: 'usuario',
          },
        ]);
      }
      return null;
    });

    spyOn(localStorage, 'setItem').and.callThrough();
  });

  afterEach(() => {
    // Limpiar localStorage mock
    (localStorage as any).clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data from localStorage on init', () => {
    fixture.detectChanges(); // Triggers ngOnInit

    expect(component.sesion).toEqual({
      nombre: 'Juan Pérez',
      usuario: 'juanperez',
      email: 'juan@example.com',
      password: '123456',
      tipo: 'usuario',
    });

    expect(component.usuarios.length).toBe(1);
  });

  it('should display user data in the template', () => {
    fixture.detectChanges();

    const nombreElement = fixture.nativeElement.querySelector('#profileName');
    const emailElement = fixture.nativeElement.querySelector('#profileEmail');

    expect(nombreElement.textContent).toContain('Juan Pérez');
    expect(emailElement.textContent).toContain('juan@example.com');
  });

  it('should save changes to localStorage when guardarCambios is called', () => {
    fixture.detectChanges();

    // Modificar datos
    component.sesion.nombre = 'Juan Carlos Pérez';
    component.sesion.email = 'juan.carlos@example.com';
    component.sesion.password = 'nueva123';

    component.guardarCambios();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'usuarios',
      JSON.stringify([
        {
          nombre: 'Juan Carlos Pérez',
          usuario: 'juanperez',
          email: 'juan.carlos@example.com',
          password: 'nueva123',
          tipo: 'usuario',
        },
      ])
    );

    expect(component.mensaje).toBe('✅ Cambios guardados correctamente.');
  });

  it('should display success message after saving changes', () => {
    fixture.detectChanges();

    // Inicialmente no debería haber mensaje
    let mensajeElement = fixture.nativeElement.querySelector('.text-success');
    expect(mensajeElement).toBeNull();

    // Guardar cambios
    component.guardarCambios();
    fixture.detectChanges();

    // Ahora debería mostrarse el mensaje
    mensajeElement = fixture.nativeElement.querySelector('.text-success');
    expect(mensajeElement.textContent).toContain(
      '✅ Cambios guardados correctamente.'
    );
  });

  it('should not crash when user is not found in usuarios', () => {
    (localStorage.getItem as jasmine.Spy)
      .withArgs('usuarios')
      .and.returnValue(JSON.stringify([]));

    fixture.detectChanges();

    // Debería mantener los datos de sesión aunque no encuentre el usuario
    expect(component.sesion).toEqual({
      nombre: 'Juan Pérez',
      usuario: 'juanperez',
      email: 'juan@example.com',
      password: '123456',
      tipo: 'usuario',
    });
  });
});
