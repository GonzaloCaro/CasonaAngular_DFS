import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sesionSubject = new BehaviorSubject<any>(this.getSesion());
  sesion$ = this.sesionSubject.asObservable();

  constructor() {
  const usuariosStr = localStorage.getItem('usuarios');
  if (!usuariosStr) {
    const admin = {
      nombre: 'Admin',
      email: 'admin@duoc.cl',
      password: 'admin',
      tipo: 'admin'
    };
    localStorage.setItem('usuarios', JSON.stringify([admin]));
  }
}


  getSesion() {
    const sesion = localStorage.getItem('sesion');
    return sesion ? JSON.parse(sesion) : null;
  }

  estaLogueado(): boolean {
    const sesion = this.getSesion();
    return sesion?.logueado || false;
  }

  esAdmin(): boolean {
    const sesion = this.getSesion();
    return sesion?.tipo === 'admin';
  }

  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    this.sesionSubject.next(null); // 🔁 actualiza para los suscriptores
  }

  iniciarSesion(sesionData: any): void {
    localStorage.setItem('sesion', JSON.stringify(sesionData));
    this.sesionSubject.next(sesionData); // 🔁 notifica cambios
  }

  addUser(user: any): boolean {
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const existe = usuarios.some((u: any) => u.email === user.email);
  if (existe) return false;
  usuarios.push(user);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  return true;
}

}

