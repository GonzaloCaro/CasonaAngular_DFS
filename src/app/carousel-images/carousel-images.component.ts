import { Component, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';

interface Expos {
  src: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-carousel-images',
  templateUrl: './carousel-images.component.html',
  styleUrls: ['./carousel-images.component.css'],
})
export class CarouselImagesComponent {
  // Datos del carrusel
  exposPasadas: Expos[] = [
    {
      src: '../assets/img/expo24y25_mayo.png',
      title: 'Dia de los Patrimonios',
      description: '',
    },
    {
      src: '../assets/img/expo22_mayo.png',
      title: 'Junta Dark Moon',
      description: '',
    },
    {
      src: '../assets/img/expo17y18_mayo.png',
      title: 'Expo Etherica',
      description: '',
    },
  ];

  // Configuración del carrusel
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
}
