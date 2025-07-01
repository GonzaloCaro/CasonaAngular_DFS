import { Component } from '@angular/core';

/**
 * Componente raíz de la aplicación Angular
 *
 * Este componente sirve como:
 * - Contenedor principal de la aplicación
 * - Punto de entrada para el bootstrap de Angular
 * - Layout base que contiene la estructura común a todas las páginas
 *
 * Responsable de:
 * - Mostrar la barra de navegación principal
 * - Proporcionar el outlet para el contenido dinámico
 * - Gestionar elementos comunes a toda la aplicación
 *
 * @example
 * <!-- Uso en el index.html -->
 * <app-root></app-root>
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /**
   * Título de la aplicación
   * @type {string}
   * @default 'Casona Encantada'
   *
   * @remarks
   * Actualmente utilizado como título estático, podría extenderse para:
   * - Cambio dinámico según ruta
   * - Internacionalización
   * - Configuración desde servicio
   */
  title = 'Casona Encantada';

  /**
   * Constructor del componente raíz
   *
   * @remarks
   * Actualmente no requiere inyección de dependencias.
   * Punto de extensión para:
   * - Inicialización global de la app
   * - Suscripciones a eventos globales
   * - Manejo de errores a nivel aplicación
   */
  constructor() {
    // Constructor vacío reservado para futuras extensiones
  }

  // Nota: Este componente actúa principalmente como contenedor/wrapper
  // para toda la aplicación. La lógica de negocio específica debe residir
  // en componentes hijos o servicios especializados.
}
