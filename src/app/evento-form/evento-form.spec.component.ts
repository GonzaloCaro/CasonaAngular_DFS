import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventoFormComponent } from './evento-form.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('EventoFormComponent', () => {
  let component: EventoFormComponent;
  let fixture: ComponentFixture<EventoFormComponent>;
  let activeModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventoFormComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [NgbActiveModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EventoFormComponent);
    component = fixture.componentInstance;
    activeModal = TestBed.inject(NgbActiveModal);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values when no input', () => {
    fixture.detectChanges();
    expect(component.eventoForm.value).toEqual({
      title: '',
      date: '',
      description: '',
      src: '',
    });
  });

  it('should initialize form with evento data when provided', () => {
    component.evento = {
      id: '1',
      title: 'Test Event',
      date: '2023-12-31',
      description: 'Test Description',
      src: 'test.jpg',
    };
    fixture.detectChanges();

    expect(component.eventoForm.value).toEqual({
      title: 'Test Event',
      date: '2023-12-31',
      description: 'Test Description',
      src: 'test.jpg',
    });
  });

  it('should validate title as required', () => {
    fixture.detectChanges();
    const titleControl = component.eventoForm.get('title');
    titleControl?.setValue('');
    expect(titleControl?.valid).toBeFalsy();
    expect(titleControl?.errors?.['required']).toBeTruthy();
  });

  it('should validate title min length', () => {
    fixture.detectChanges();
    const titleControl = component.eventoForm.get('title');
    titleControl?.setValue('ab');
    expect(titleControl?.valid).toBeFalsy();
    expect(titleControl?.errors?.['minlength']).toBeTruthy();
  });

  it('should validate date as required', () => {
    fixture.detectChanges();
    const dateControl = component.eventoForm.get('date');
    dateControl?.setValue('');
    expect(dateControl?.valid).toBeFalsy();
    expect(dateControl?.errors?.['required']).toBeTruthy();
  });

  it('should validate description as required', () => {
    fixture.detectChanges();
    const descriptionControl = component.eventoForm.get('description');
    descriptionControl?.setValue('');
    expect(descriptionControl?.valid).toBeFalsy();
    expect(descriptionControl?.errors?.['required']).toBeTruthy();
  });

  it('should not submit invalid form', () => {
    spyOn(activeModal, 'close');
    component.submitted = true;
    component.guardar();
    expect(activeModal.close).not.toHaveBeenCalled();
  });

  it('should submit valid form', () => {
    spyOn(activeModal, 'close');
    component.eventoForm.setValue({
      title: 'Valid Event',
      date: '2023-12-31',
      description: 'Valid Description',
      src: 'valid.jpg',
    });
    component.guardar();
    expect(activeModal.close).toHaveBeenCalled();
  });

  it('should cancel modal', () => {
    spyOn(activeModal, 'dismiss');
    component.cancelar();
    expect(activeModal.dismiss).toHaveBeenCalled();
  });

  it('should show error messages when submitted with invalid form', () => {
    component.submitted = true;
    fixture.detectChanges();

    const errorMessages = fixture.debugElement.queryAll(
      By.css('.text-red-400')
    );
    expect(errorMessages.length).toBe(3); // Para los 3 campos requeridos
  });
});
