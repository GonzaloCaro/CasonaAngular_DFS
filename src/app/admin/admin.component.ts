import { Component, OnInit } from '@angular/core';
import { exposFuturas } from 'src/assets/data/expos';
interface expos {
  id: string;
  src: string;
  title: string;
  date: string;
  description: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  usuarios: any[] = [];
  inicializado = false;

  mostrarUsuarios = true; // el panel que estará visible por defecto

  eventos: expos[] = [];

  ngOnInit(): void {
    const usuarios = localStorage.getItem('usuarios');
    if (usuarios) {
      this.usuarios = JSON.parse(usuarios);
    }

    const data = localStorage.getItem('eventos');
    if (data) {
      this.eventos = JSON.parse(data);
    }
    this.inicializado = true;
  }

  eliminarEvento(id: string): void {
    this.eventos = this.eventos.filter((e) => e.id !== id);
    localStorage.setItem('eventos', JSON.stringify(this.eventos));
  }

  mostrarPanel(panel: 'usuarios' | 'eventos') {
    this.mostrarUsuarios = panel === 'usuarios';
  }

  eliminarUsuario(correo: string): void {
    this.usuarios = this.usuarios.filter((u) => u.email !== correo);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  editarEvento(id: number) {
    // Lógica para editar evento
    console.log('Editar evento:', id);
  }
}
