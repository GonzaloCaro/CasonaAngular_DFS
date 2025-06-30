import { ComponentFixture, TestBed } from '@angular/core/testing'; // Herramientas para pruebas de componentes
import { ReactiveFormsModule } from '@angular/forms'; // Necesario para usar formularios reactivos
import { Router } from '@angular/router'; // Para simular navegación
import { LoginComponent } from './login.component'; // Componente a testear

describe('LoginComponent', () => {
  let component: LoginComponent; // Variable para el componente
  let fixture: ComponentFixture<LoginComponent>; // Contenedor de pruebas para el componente

  // Antes de cada test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent], // Declaramos el componente
      imports: [ReactiveFormsModule], // Importamos formularios reactivos
      providers: [
        { provide: Router, useValue: { navigate: () => {}, url: '' } } // Simulamos Router para evitar errores
      ]
    }).compileComponents(); // Compilamos el módulo de pruebas

    // Creamos una instancia del componente y activamos el ciclo de vida
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta cambios en el DOM
  });

  // Test 1: Verifica que el componente se cree correctamente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy(); // Esperamos que exista (sea verdadero)
  });

  // Test 2: Verifica que el formulario sea inválido si está vacío
  it('debería marcar el formulario como inválido si los campos están vacíos', () => {
    component.loginForm.setValue({ email: '', password: '' }); // Seteamos valores vacíos
    expect(component.loginForm.invalid).toBeTrue(); // Debe ser inválido
  });
});
