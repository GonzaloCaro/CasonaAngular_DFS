import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ContactUsComponent } from './contact-us.component';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactUsComponent],
      imports: [FormsModule], // Importamos FormsModule por si acaso se añaden formularios reactivos después
    }).compileComponents();

    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the contact form', () => {
    const formElement = fixture.nativeElement.querySelector('form');
    expect(formElement).toBeTruthy();
  });

  it('should display the correct title and description', () => {
    const titleElement = fixture.nativeElement.querySelector('.form-label');
    const descriptionElements = fixture.nativeElement.querySelectorAll('p');

    expect(titleElement.textContent).toContain(
      '¿Tienes una idea de evento y necesitas un espacio donde hacerlo?'
    );
    expect(descriptionElements[0].textContent).toContain(
      'Casona encantada puede ser el lugar'
    );
    expect(descriptionElements[1].textContent).toContain('Contáctanos');
  });

  it('should have an email input field', () => {
    const emailInput = fixture.nativeElement.querySelector('#email-contact');
    expect(emailInput).toBeTruthy();
    expect(emailInput.getAttribute('type')).toBe('email');
  });

  it('should have a subject input field', () => {
    const subjectInput = fixture.nativeElement.querySelector('#subject-input');
    expect(subjectInput).toBeTruthy();
    expect(subjectInput.getAttribute('type')).toBe('text');
  });

  it('should have a description textarea', () => {
    const textarea = fixture.nativeElement.querySelector('#textarea-contact');
    expect(textarea).toBeTruthy();
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
  });

  it('should have a submit button', () => {
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    expect(submitButton).toBeTruthy();
    expect(submitButton.textContent).toContain('Enviar');
  });

  it('should have proper labels for all form fields', () => {
    const labels = fixture.nativeElement.querySelectorAll(
      '.label-input, .label-textarea'
    );

    expect(labels[0].textContent).toContain('Email:');
    expect(labels[1].textContent).toContain('Asunto');
    expect(labels[2].textContent).toContain('Descripción');
  });
});
