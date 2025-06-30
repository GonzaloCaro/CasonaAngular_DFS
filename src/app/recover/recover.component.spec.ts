import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Necesario para formularios reactivos
import { RecoverComponent } from './recover.component'; // El componente que vamos a testear

describe('RecoverComponent', () => {
  let component: RecoverComponent;
  let fixture: ComponentFixture<RecoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoverComponent],
      imports: [ReactiveFormsModule] // Importamos módulo para formularios reactivos
    }).compileComponents();

    fixture = TestBed.createComponent(RecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Activamos detección de cambios para iniciar Angular
  });

  // Test 1: Verificar que el formulario se inicializa correctamente con campo 'email'
  it('debería inicializar el formulario con el campo "email"', () => {
    expect(component.recoverForm.contains('email')).toBeTrue(); // Verifica que existe el campo 'email'
  });

  // Test 2: El campo email debe ser inválido si está vacío
  it('debería marcar como inválido el campo email si está vacío', () => {
    const emailControl = component.recoverForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.invalid).toBeTrue(); // Campo debe estar inválido si está vacío
  });

  // Test 3: El formulario debe ser válido si se ingresa un email correcto
  it('debería marcar el formulario como válido con un email válido', () => {
    component.recoverForm.setValue({ email: 'test@correo.com' }); // Simula ingreso correcto
    expect(component.recoverForm.valid).toBeTrue(); // El formulario debe estar válido
  });
});

