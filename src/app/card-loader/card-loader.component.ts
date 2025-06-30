import { Component, OnInit } from '@angular/core';
import { exposFuturas } from '../../assets/data/expos';
import { ActivatedRoute } from '@angular/router';

interface expos {
  id: string;
  src: string;
  title: string;
  date: string;
  description: string;
}

@Component({
  selector: 'app-card-loader',
  templateUrl: './card-loader.component.html',
  styleUrls: ['./card-loader.component.css'],
})
export class CardLoaderComponent implements OnInit {
  exposFuturas: expos[] = [];

  constructor(private route: ActivatedRoute) {}

  sesion: any = null;

  ngOnInit(): void {
    localStorage.setItem('eventos', JSON.stringify(exposFuturas))
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;

    const eventosStr = localStorage.getItem('eventos');
    if (eventosStr) {
      this.exposFuturas = JSON.parse(eventosStr);
    } else {
      localStorage.setItem('eventos', JSON.stringify(this.exposFuturas));
    }
  }

  agregarAlCarrito(expo: expos) {
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
    console.log(claveCarrito);
    if (index >= 0) {
      carrito[index].cantidad++;
    } else {
      console.log('agregando entrada', expo);
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
