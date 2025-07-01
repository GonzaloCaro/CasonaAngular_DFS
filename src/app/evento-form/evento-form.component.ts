import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

/**
 * Interface para los controles del formulario de evento
 * @property {AbstractControl} title - Control para el título del evento
 * @property {AbstractControl} date - Control para la fecha del evento
 * @property {AbstractControl} description - Control para la descripción del evento
 * @property {AbstractControl} src - Control para la URL de la imagen del evento
 */
interface EventoFormControls {
  [key: string]: AbstractControl;
  title: AbstractControl;
  date: AbstractControl;
  description: AbstractControl;
  src: AbstractControl;
}

/**
 * Componente de formulario para crear/editar eventos
 *
 * Este componente muestra un formulario modal para crear nuevos eventos o editar
 * eventos existentes. Utiliza Reactive Forms para la validación de datos.
 *
 * @example
 * <!-- Uso para crear nuevo evento -->
 * <button (click)="openEventoForm()">Nuevo Evento</button>
 *
 * @example
 * <!-- Uso para editar evento existente -->
 * <button (click)="openEventoForm(eventoExistente)">Editar Evento</button>
 */
@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css'],
})
export class EventoFormComponent implements OnInit {
  /**
   * Datos del evento a editar (opcional)
   * @default {id: '', title: '', date: '', description: '', src: ''}
   */
  @Input() evento: any = {
    id: '',
    title: '',
    date: '',
    description: '',
    src: '',
  };

  /**
   * Modo de operación del formulario (edición/creación)
   * @default false
   */
  @Input() modoEdicion: boolean = false;

  /**
   * FormGroup para el formulario de evento
   */
  eventoForm!: FormGroup;

  /**
   * Indica si se ha intentado enviar el formulario
   * @default false
   */
  submitted = false;

  /**
   * Constructor del componente
   * @param activeModal Servicio para manejar el modal de ng-bootstrap
   * @param fb Servicio para construir formularios reactivos
   */
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  /**
   * Inicializa el componente y configura el formulario
   */
  ngOnInit(): void {
    this.eventoForm = this.fb.group({
      title: [
        this.evento.title,
        [Validators.required, Validators.minLength(3)],
      ],
      date: [this.evento.date, Validators.required],
      description: [this.evento.description, Validators.required],
      src: [this.evento.src],
    });
  }

  /**
   * Getter para acceder fácilmente a los controles del formulario
   * @returns {EventoFormControls} Controles del formulario
   */
  get f(): EventoFormControls {
    return this.eventoForm.controls as EventoFormControls;
  }

  /**
   * Maneja el envío del formulario
   * Valida los datos y cierra el modal con los datos actualizados del evento
   */
  guardar(): void {
    this.submitted = true;

    if (this.eventoForm.invalid) {
      return;
    }

    const updatedEvento = {
      ...this.evento,
      title: this.eventoForm.value.title,
      date: this.eventoForm.value.date,
      description: this.eventoForm.value.description,
      src: this.eventoForm.value.src,
    };

    this.activeModal.close(updatedEvento);
  }

  /**
   * Cancela la operación y cierra el modal sin guardar cambios
   */
  cancelar(): void {
    this.activeModal.dismiss();
  }
}
