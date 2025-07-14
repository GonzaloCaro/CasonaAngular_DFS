import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';

/**
 * Interface que define la estructura de una exposición pasada
 */
interface Expos {
  /** URL de la imagen de la exposición */
  src: string;
  /** Título de la exposición */
  title: string;
  /** Descripción de la exposición */
  description: string;
}

/**
 * Componente que muestra un carrusel de imágenes de exposiciones pasadas
 * Utiliza el módulo NgbCarousel de ng-bootstrap para la funcionalidad del carrusel
 *
 * @example
 * <app-carousel-images></app-carousel-images>
 */
@Component({
  selector: 'app-carousel-images',
  templateUrl: './carousel-images.component.html',
  styleUrls: ['./carousel-images.component.css'],
})
export class CarouselImagesComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>('https://gonzalocaro.github.io/expos/exposiciones.json')
      .subscribe({
        next: (data) => {
          this.exposPasadas = data.exposPasadas;
        },
        error: (err) => {
          console.error('Error al cargar expos pasadas:', err);
        },
      });
  }

  /**
   * Lista de exposiciones pasadas a mostrar en el carrusel
   * @type {Expos[]}
   */
  exposPasadas: Expos[] = [];

  /**
   * Indica si el carrusel está pausado
   * @type {boolean}
   */
  paused = false;

  /**
   * Indica si el carrusel debe reanudarse al usar flechas de navegación
   * @type {boolean}
   */
  unpauseOnArrow = false;

  /**
   * Indica si el carrusel debe pausarse al hacer clic en los indicadores
   * @type {boolean}
   */
  pauseOnIndicator = false;

  /**
   * Indica si el carrusel debe pausarse al pasar el mouse sobre él
   * @type {boolean}
   */
  pauseOnHover = true;

  /**
   * Indica si el carrusel debe pausarse al recibir foco
   * @type {boolean}
   */
  pauseOnFocus = true;

  /**
   * Referencia al componente NgbCarousel
   * @type {NgbCarousel}
   */
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  /**
   * Alterna el estado de pausa del carrusel
   * @returns {void}
   */
  togglePaused(): void {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  /**
   * Maneja los eventos de deslizamiento del carrusel
   * @param {NgbSlideEvent} slideEvent - Evento de deslizamiento
   * @returns {void}
   */
  onSlide(slideEvent: NgbSlideEvent): void {
    // Reanuda si está pausado y se usaron flechas
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }

    // Pausa al hacer clic en indicadores si está configurado
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
}
