import { Component } from '@angular/core';

/**
 * Componente "Sobre Nosotros" que muestra información acerca de:
 * - La historia de la organización
 * - Misión y valores
 * - Equipo de trabajo
 * - Instalaciones y ubicación
 *
 * Este componente es principalmente presentacional y muestra contenido estático
 * sobre la empresa o institución.
 *
 * @example
 * <!-- Uso básico -->
 * <app-about-us></app-about-us>
 *
 * @example
 * <!-- Uso con contenido personalizado -->
 * <app-about-us>
 *   <h2>Nuestra Historia Personalizada</h2>
 *   <p>Contenido adicional aquí...</p>
 * </app-about-us>
 */
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent {
  /**
   * Constructor del componente
   *
   * @remarks
   * Actualmente no requiere inyección de dependencias.
   * Se mantiene como punto de extensión para futuras funcionalidades.
   */
  constructor() {
    // Constructor vacío reservado para futuras extensiones
  }

  // Nota: Este componente es principalmente presentacional y muestra
  // contenido estático. La lógica de negocio debería manejarse en
  // componentes padres o servicios si se requiriera en el futuro.
}
