
import { ComponentFixture, TestBed } from '@angular/core/testing'; // Herramientas de testing
import { ReactiveFormsModule } from '@angular/forms'; // Necesario para trabajar con forms reactivos
import { Router } from '@angular/router'; // Para simular navegación
import { RegisterComponent } from './register.component'; // Componente a probar

describe('RegisterComponent', () => {
  let component: RegisterComponent; // Instancia del componente
  let fixture: ComponentFixture<RegisterComponent>; // Contenedor de pruebas

  // Se ejecuta antes de cada test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent], // Declaramos el componente
      imports: [ReactiveFormsModule], // Importamos módulo necesario
      providers: [
        { provide: Router, useValue: { navigate: () => {} } } // Mock del Router para evitar navegación real
      ]
    }).compileComponents(); // Compilamos las dependencias

    // Creamos el componente y su fixture
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Activamos el ciclo de Angular
  });

  // Test 1: El componente debe crearse correctamente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy(); // Verificamos que existe
  });

  // Test 2: Si el formulario está vacío, debe ser inválido
  it('debería marcar el formulario como inválido si los campos están vacíos', () => {
    component.registerForm.setValue({
      nombre: '', usuario: '', email: '', fechaNacimiento: '',
      password: '', password2: ''
    });
    expect(component.registerForm.invalid).toBeTrue(); // Debe estar inválido
  });

  // Test 3: Las contraseñas no coinciden y debe marcar error
  it('debería marcar error si las contraseñas no coinciden', () => {
    component.registerForm.setValue({
      nombre: 'Juan',
      usuario: 'juanito',
      email: 'juan@correo.com',
      fechaNacimiento: '2005-01-01',
      password: 'abc123',
      password2: 'xyz789'
    });
    expect(component.registerForm.errors?.['contrasenasNoCoinciden']).toBeTrue(); // Error esperado
  });
});
