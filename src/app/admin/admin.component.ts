import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventoFormComponent } from '../evento-form/evento-form.component';

/**
 * Interface que define la estructura de un evento/exposición
 */
interface expos {
  /** ID único del evento */
  id: string;
  /** URL de la imagen del evento */
  src: string;
  /** Título del evento */
  title: string;
  /** Fecha del evento en formato string */
  date: string;
  /** Descripción detallada del evento */
  description: string;
}

/**
 * Componente de administración que permite gestionar usuarios y eventos
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  /** Lista de usuarios registrados en el sistema */
  usuarios: any[] = [];

  /** Flag que indica si los datos han sido cargados */
  inicializado = false;

  /** Controla qué panel se muestra (usuarios o eventos) */
  mostrarUsuarios = true;

  /** Lista de eventos/exposiciones en el sistema */
  eventos: expos[] = [];

  /**
   * Constructor del componente
   * @param modalService Servicio para manejar modales de NgbModal
   */
  constructor(private modalService: NgbModal) {}

  /**
   * Método del ciclo de vida OnInit
   * Se ejecuta al inicializar el componente
   */
  ngOnInit(): void {
    this.cargarDatos();
  }

  /**
   * Carga los datos iniciales de usuarios y eventos desde localStorage
   * @returns void
   */
  cargarDatos(): void {
    const usuarios = localStorage.getItem('usuarios');
    this.usuarios = usuarios ? JSON.parse(usuarios) : [];

    const eventos = localStorage.getItem('eventos');
    this.eventos = eventos ? JSON.parse(eventos) : [];
    this.inicializado = true;
  }

  /**
   * Cambia entre los paneles de usuarios y eventos
   * @param panel Tipo de panel a mostrar ('usuarios' o 'eventos')
   * @returns void
   */
  mostrarPanel(panel: 'usuarios' | 'eventos'): void {
    this.mostrarUsuarios = panel === 'usuarios';
  }

  /**
   * Elimina un usuario del sistema
   * @param correo Email del usuario a eliminar
   * @returns void
   */
  eliminarUsuario(correo: string): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarios = this.usuarios.filter((u) => u.email !== correo);
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
  }

  /**
   * Elimina un evento del sistema
   * @param id ID del evento a eliminar
   * @returns void
   */
  eliminarEvento(id: string): void {
    if (confirm('¿Estás seguro de eliminar este evento?')) {
      this.eventos = this.eventos.filter((e) => e.id !== id);
      this.actualizarEventos();
    }
  }

  /**
   * Abre el modal para editar un evento existente
   * @param evento Objeto del evento a editar
   * @returns void
   */
  editarEvento(evento: expos): void {
    const modalRef = this.modalService.open(EventoFormComponent);
    modalRef.componentInstance.evento = { ...evento };
    modalRef.componentInstance.modoEdicion = true;

    modalRef.result
      .then((result) => {
        if (result) {
          const index = this.eventos.findIndex((e) => e.id === evento.id);
          if (index !== -1) {
            this.eventos[index] = result;
            this.actualizarEventos();
          }
        }
      })
      .catch(() => {});
  }

  /**
   * Abre el modal para agregar un nuevo evento
   * @returns void
   */
  agregarNuevoEvento(): void {
    const modalRef = this.modalService.open(EventoFormComponent);
    modalRef.componentInstance.modoEdicion = false;

    modalRef.result
      .then((result) => {
        if (result) {
          this.eventos.push(result);
          this.actualizarEventos();
        }
      })
      .catch(() => {});
  }

  /**
   * Actualiza los eventos en localStorage
   * @private
   * @returns void
   */
  private actualizarEventos(): void {
    localStorage.setItem('eventos', JSON.stringify(this.eventos));
    // Actualizar también en el card-loader si es necesario
    localStorage.setItem('eventos', JSON.stringify(this.eventos));
  }

  /**
   * Genera un ID único para nuevos eventos
   * @returns string - ID único generado
   */
  generarIdUnico(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
