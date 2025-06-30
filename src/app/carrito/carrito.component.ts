import { Component, OnInit } from '@angular/core';

interface EntradaCarrito {
  nombre: string;
  fecha: string;
  descripcion: string;
  imagen: string;
  tipo_entrada: 'General' | 'VIP' | 'Premium';
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  carrito: EntradaCarrito[] = [];
  total = 0;
  claveCarrito = '';
  tiposEntrada = [
    { nombre: 'General', precio: 10000 },
    { nombre: 'VIP', precio: 15000 },
    { nombre: 'Premium', precio: 20000 },
  ];

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (sesion?.logueado) {
      this.claveCarrito = 'carrito_' + sesion.email;
      this.cargarCarrito();
      console.log(this.carrito)
    }
  }

  cargarCarrito() {
    const carritoGuardado = localStorage.getItem(this.claveCarrito);
    this.carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    // Asegurar que solo haya un evento en el carrito
    if (this.carrito.length > 1) {
      this.carrito = [this.carrito[0]]; // Conserva solo el primer evento
      localStorage.setItem(this.claveCarrito, JSON.stringify(this.carrito));
    }

    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.carrito.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );
  }

  cambiarTipoEntrada(nuevoTipo: 'General' | 'VIP' | 'Premium') {
    if (this.carrito.length > 0) {
      this.carrito[0].tipo_entrada = nuevoTipo;
      // Actualizar precio según el tipo de entrada
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

  vaciarCarrito() {
    localStorage.removeItem(this.claveCarrito);
    this.carrito = [];
    this.total = 0;
  }

  comprar() {
    if (this.carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    alert('¡Compra realizada con éxito!');
    this.vaciarCarrito();
  }

  actualizarCantidad(cambio: number) {
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
