import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup; // Formulario reactivo
  error: string = '';
  exito: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Inicializamos el formulario con validaciones
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required, this.edadMinimaValidator]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      password2: ['', Validators.required]
    }, { validators: [this.passwordsIgualesValidator] }); // Validación personalizada
  }

  // Validación personalizada para edad mínima de 14 años
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

  // Validación personalizada para contraseñas iguales
  passwordsIgualesValidator(group: AbstractControl): ValidationErrors | null {
    const pass1 = group.get('password')?.value;
    const pass2 = group.get('password2')?.value;
    return pass1 === pass2 ? null : { contrasenasNoCoinciden: true };
  }

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
      tipo: 'usuario'
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.exito = 'Usuario registrado con éxito. Ahora puedes iniciar sesión.';
    setTimeout(() => this.router.navigate(['/login']), 1500);
  }

  // Accesos rápidos a los campos del formulario desde la vista
  get f() {
    return this.registerForm.controls;
  }
}
