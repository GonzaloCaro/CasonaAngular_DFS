import { Component, OnInit } from '@angular/core';
import { exposFuturas } from '../../assets/data/expos';
import { ActivatedRoute } from '@angular/router';

/**
 * Interface que define la estructura de una exposición/evento
 */
interface expos {
  /** Identificador único del evento */
  id: string;
  /** URL de la imagen representativa del evento */
  src: string;
  /** Título del evento */
  title: string;
  /** Fecha del evento en formato string */
  date: string;
  /** Descripción detallada del evento */
  description: string;
}

/**
 * Componente que carga y muestra tarjetas de eventos, permitiendo agregarlos al carrito
 * @example
 * <app-card-loader></app-card-loader>
 */
@Component({
  selector: 'app-card-loader',
  templateUrl: './card-loader.component.html',
  styleUrls: ['./card-loader.component.css'],
})
export class CardLoaderComponent implements OnInit {
  /**
   * Lista de exposiciones/eventos futuros
   * @type {expos[]}
   */
  exposFuturas: expos[] = [];

  /**
   * Datos de la sesión actual del usuario
   * @type {any}
   */
  sesion: any = null;

  /**
   * Constructor del componente
   * @param {ActivatedRoute} route - Servicio para acceder a parámetros de ruta
   */
  constructor(private route: ActivatedRoute) {}

  /**
   * Método del ciclo de vida OnInit
   * Carga los eventos y verifica la sesión al inicializar el componente
   */
  ngOnInit(): void {
    this.cargarEventos();
    this.verificarSesion();
  }

  /**
   * Carga los eventos desde localStorage o usa los datos iniciales si no existen
   * @returns {void}
   */
  cargarEventos(): void {
    const eventosStr = localStorage.getItem('eventos');
    this.exposFuturas = eventosStr ? JSON.parse(eventosStr) : [];

    // Si no hay eventos, carga los iniciales
    if (this.exposFuturas.length === 0) {
      this.exposFuturas = [...exposFuturas];
      localStorage.setItem('eventos', JSON.stringify(this.exposFuturas));
    }
  }

  /**
   * Verifica y carga la sesión del usuario desde localStorage
   * @private
   * @returns {void}
   */
  private verificarSesion(): void {
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;
  }

  /**
   * Agrega una exposición al carrito de compras
   * @param {expos} expo - La exposición a agregar al carrito
   * @returns {void}
   * @throws {Alert} Muestra alerta si el usuario no ha iniciado sesión o no es tipo 'usuario'
   */
  agregarAlCarrito(expo: expos): void {
    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (!sesion || sesion.tipo !== 'usuario') {
      alert('Debes iniciar sesión como usuario para agregar al carrito.');
      return;
    }

    const claveCarrito = 'carrito_' + sesion.email;
    const carritoStr = localStorage.getItem(claveCarrito);
    const carrito = carritoStr ? JSON.parse(carritoStr) : [];

    const index = carrito.findIndex((item: any) => item.nombre === expo.title);

    if (index >= 0) {
      carrito[index].cantidad++;
    } else {
      carrito.push({
        nombre: expo.title,
        fecha: expo.date,
        descripcion: expo.description,
        imagen: expo.src,
        tipo_entrada: 'General',
        precio: 10000,
        cantidad: 1,
      });
    }

    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
    alert('¡Agregado al carrito con éxito!');
  }
}
