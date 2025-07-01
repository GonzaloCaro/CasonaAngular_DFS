import { Component, OnInit } from '@angular/core';

/**
 * Interface que define la estructura de una entrada en el carrito
 */
interface EntradaCarrito {
  /** Nombre del evento */
  nombre: string;
  /** Fecha del evento */
  fecha: string;
  /** Descripción del evento */
  descripcion: string;
  /** URL de la imagen del evento */
  imagen: string;
  /** Tipo de entrada (General, VIP o Premium) */
  tipo_entrada: 'General' | 'VIP' | 'Premium';
  /** Precio de la entrada */
  precio: number;
  /** Cantidad de entradas */
  cantidad: number;
}

/**
 * Componente que gestiona el carrito de compras de entradas
 * Permite agregar, modificar y eliminar entradas, así como realizar la compra
 *
 * @example
 * <app-carrito></app-carrito>
 */
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  /**
   * Lista de entradas en el carrito
   * @type {EntradaCarrito[]}
   */
  carrito: EntradaCarrito[] = [];

  /**
   * Total a pagar por las entradas en el carrito
   * @type {number}
   */
  total = 0;

  /**
   * Clave única del carrito en localStorage (basada en el email del usuario)
   * @type {string}
   */
  claveCarrito = '';

  /**
   * Tipos de entrada disponibles con sus precios
   * @type {{nombre: string, precio: number}[]}
   */
  tiposEntrada = [
    { nombre: 'General', precio: 10000 },
    { nombre: 'VIP', precio: 15000 },
    { nombre: 'Premium', precio: 20000 },
  ];

  /**
   * Método del ciclo de vida OnInit
   * Inicializa el carrito al cargar el componente
   */
  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (sesion?.logueado) {
      this.claveCarrito = 'carrito_' + sesion.email;
      this.cargarCarrito();
    }
  }

  /**
   * Carga el carrito desde localStorage
   * @returns {void}
   */
  cargarCarrito(): void {
    const carritoGuardado = localStorage.getItem(this.claveCarrito);
    this.carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    // Limita a un solo evento en el carrito
    if (this.carrito.length > 1) {
      this.carrito = [this.carrito[0]];
      localStorage.setItem(this.claveCarrito, JSON.stringify(this.carrito));
    }

    this.calcularTotal();
  }

  /**
   * Calcula el total a pagar sumando todas las entradas del carrito
   * @returns {void}
   */
  calcularTotal(): void {
    this.total = this.carrito.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );
  }

  /**
   * Cambia el tipo de entrada y actualiza el precio correspondiente
   * @param {'General' | 'VIP' | 'Premium'} nuevoTipo - Nuevo tipo de entrada seleccionado
   * @returns {void}
   */
  cambiarTipoEntrada(nuevoTipo: 'General' | 'VIP' | 'Premium'): void {
    if (this.carrito.length > 0) {
      this.carrito[0].tipo_entrada = nuevoTipo;
      const tipoSeleccionado = this.tiposEntrada.find(
        (t) => t.nombre === nuevoTipo
      );
      if (tipoSeleccionado) {
        this.carrito[0].precio = tipoSeleccionado.precio;
      }
      localStorage.setItem(this.claveCarrito, JSON.stringify(this.carrito));
      this.calcularTotal();
    }
  }

  /**
   * Vacía completamente el carrito
   * @returns {void}
   */
  vaciarCarrito(): void {
    localStorage.removeItem(this.claveCarrito);
    this.carrito = [];
    this.total = 0;
  }

  /**
   * Procesa la compra de las entradas en el carrito
   * @returns {void}
   * @throws {Alert} Muestra alerta si el carrito está vacío
   */
  comprar(): void {
    if (this.carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    alert('¡Compra realizada con éxito!');
    this.vaciarCarrito();
  }

  /**
   * Actualiza la cantidad de entradas con un valor de cambio (+1 o -1)
   * @param {number} cambio - Valor a sumar/restar a la cantidad actual (1 o -1)
   * @returns {void}
   */
  actualizarCantidad(cambio: number): void {
    if (this.carrito.length > 0) {
      const nuevaCantidad = this.carrito[0].cantidad + cambio;
      if (nuevaCantidad >= 1 && nuevaCantidad <= 10) {
        this.carrito[0].cantidad = nuevaCantidad;
        localStorage.setItem(this.claveCarrito, JSON.stringify(this.carrito));
        this.calcularTotal();
      }
    }
  }
}
