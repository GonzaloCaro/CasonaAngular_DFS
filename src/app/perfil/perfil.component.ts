import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  sesion: any = null;
  usuarios: any[] = [];
  mensaje = '';

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;

    const usuariosStr = localStorage.getItem('usuarios');
    this.usuarios = usuariosStr ? JSON.parse(usuariosStr) : [];

    // Buscar usuario completo y sincronizar
    const usuarioEncontrado = this.usuarios.find(u => u.usuario === this.sesion.usuario);
    if (usuarioEncontrado) {
      this.sesion = { ...usuarioEncontrado };
    }
  }

  guardarCambios() {
    const index = this.usuarios.findIndex(u => u.usuario === this.sesion.usuario);
    if (index !== -1) {
      this.usuarios[index] = { ...this.sesion };
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
      localStorage.setItem('sesion', JSON.stringify(this.sesion));
      this.mensaje = '✅ Cambios guardados correctamente.';
    }
  }
}
