import { Component } from '@angular/core';

/**
 * Componente de formulario de contacto
 *
 * Este componente muestra un formulario para que los usuarios puedan contactarse
 * con los administradores de la plataforma. Permite enviar consultas, sugerencias
 * o solicitudes de información sobre eventos.
 *
 * @example
 * <!-- Uso básico -->
 * <app-contact-us></app-contact-us>
 *
 * @example
 * <!-- Uso con redirección después de enviar -->
 * <app-contact-us (onSubmit)="redirectToHome()"></app-contact-us>
 */
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  /**
   * Constructor del componente de contacto
   *
   * @remarks
   * Actualmente no realiza ninguna inyección de dependencias ni inicialización especial.
   * Se mantiene como punto de extensión para futuras funcionalidades.
   */
  constructor() {
    // Constructor vacío reservado para futuras inyecciones de dependencias
  }

  // Nota: El componente actualmente no contiene lógica, pero se documenta
  // la estructura base para mantener consistencia y permitir futuras extensiones
}
