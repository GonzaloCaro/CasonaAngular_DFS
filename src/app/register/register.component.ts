import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Componente para el registro de nuevos usuarios
 * Maneja la validación de datos y el almacenamiento del nuevo usuario
 * @selector app-register
 * @templateUrl ./register.component.html
 * @styleUrls ['./register.component.css']
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  /**
   * Formulario reactivo para el registro de usuarios
   * @type {FormGroup}
   */
  registerForm!: FormGroup;

  /**
   * Mensaje para mostrar errores en el registro
   * @type {string}
   */
  error: string = '';

  /**
   * Mensaje para mostrar éxito en el registro
   * @type {string}
   */
  exito: string = '';

  /**
   * Constructor del componente
   * @constructor
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos
   * @param {Router} router - Servicio para navegación entre rutas
   */
  constructor(private fb: FormBuilder, private router: Router) {}

  /**
   * Inicializa el componente y configura el formulario con validaciones
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        usuario: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        fechaNacimiento: ['', [Validators.required, this.edadMinimaValidator]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        password2: ['', Validators.required],
      },
      { validators: [this.passwordsIgualesValidator] }
    );
  }

  /**
   * Validador personalizado para verificar la edad mínima (14 años)
   * @method edadMinimaValidator
   * @param {AbstractControl} control - Control del formulario a validar
   * @returns {ValidationErrors | null} - Objeto con error o null si es válido
   */
  edadMinimaValidator(control: AbstractControl): ValidationErrors | null {
    const fecha = new Date(control.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }
    return edad < 14 ? { edadMinima: true } : null;
  }

  /**
   * Validador personalizado para verificar que las contraseñas coincidan
   * @method passwordsIgualesValidator
   * @param {AbstractControl} group - Grupo de controles del formulario
   * @returns {ValidationErrors | null} - Objeto con error o null si coinciden
   */
  passwordsIgualesValidator(group: AbstractControl): ValidationErrors | null {
    const pass1 = group.get('password')?.value;
    const pass2 = group.get('password2')?.value;
    return pass1 === pass2 ? null : { contrasenasNoCoinciden: true };
  }

  /**
   * Procesa el registro del nuevo usuario
   * Valida el formulario, almacena el usuario y muestra feedback
   * @method registrar
   * @returns {void}
   */
  registrar() {
    this.error = '';
    this.exito = '';

    if (this.registerForm.invalid) {
      this.error = 'Revisa los campos, hay errores en el formulario.';
      return;
    }

    const { nombre, usuario, email, password } = this.registerForm.value;

    const nuevoUsuario = {
      nombre,
      usuario,
      email,
      password,
      tipo: 'usuario',
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.exito = 'Usuario registrado con éxito. Ahora puedes iniciar sesión.';
    setTimeout(() => this.router.navigate(['/login']), 1500);
  }

  /**
   * Getter para acceso simplificado a los controles del formulario desde el template
   * @method f
   * @returns {AbstractControl} - Controles del formulario
   */
  get f() {
    return this.registerForm.controls;
  }
}
