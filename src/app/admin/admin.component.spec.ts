import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventoFormComponent } from '../evento-form/evento-form.component';
import { Component } from '@angular/core';

// Mock del componente EventoForm para pruebas
@Component({
  selector: 'app-evento-form',
  template: '',
})
class MockEventoFormComponent {}

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let modalService: NgbModal;

  const mockUsuarios = [
    { email: 'test@test.com', nombre: 'Test', tipo: 'usuario' },
  ];

  const mockEventos = [
    {
      id: '1',
      title: 'Evento 1',
      date: '2023-01-01',
      description: 'Desc 1',
      src: 'img1.jpg',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AdminComponent,
        MockEventoFormComponent, // Usamos el mock en lugar del componente real
      ],
      providers: [NgbModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load usuarios from localStorage', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) =>
      key === 'usuarios' ? JSON.stringify(mockUsuarios) : null
    );

    component.ngOnInit();
    expect(component.usuarios).toEqual(mockUsuarios);
  });

  it('should load eventos from localStorage', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) =>
      key === 'eventos' ? JSON.stringify(mockEventos) : null
    );

    component.ngOnInit();
    expect(component.eventos).toEqual(mockEventos);
  });

  it('should delete usuario', () => {
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(mockUsuarios)
    );
    spyOn(localStorage, 'setItem');

    component.ngOnInit();
    component.eliminarUsuario('test@test.com');

    expect(component.usuarios.length).toBe(0);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should delete evento', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) =>
      key === 'eventos' ? JSON.stringify(mockEventos) : null
    );
    spyOn(localStorage, 'setItem');
    spyOn(window, 'confirm').and.returnValue(true);

    component.ngOnInit();
    component.eliminarEvento('1');

    expect(component.eventos.length).toBe(0);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should open modal', () => {
    const mockModalRef = {
      componentInstance: {
        evento: null,
        modoEdicion: false,
      },
      result: Promise.resolve({}),
    };

    spyOn(modalService, 'open').and.returnValue(mockModalRef as any);

    component.agregarNuevoEvento();

    expect(modalService.open).toHaveBeenCalled();
  });

  it('should switch between panels', () => {
    component.mostrarPanel('eventos');
    expect(component.mostrarUsuarios).toBeFalse();

    component.mostrarPanel('usuarios');
    expect(component.mostrarUsuarios).toBeTrue();
  });
});
