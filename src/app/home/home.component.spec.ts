import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

// Stub simplificado para CardLoaderComponent
@Component({
  selector: 'app-card-loader',
  template: '<div>CardLoader Stub</div>',
})
class MockCardLoaderComponent {}

// Stub simplificado para CarouselImagesComponent
@Component({
  selector: 'app-carousel-images',
  template: '<div>CarouselImages Stub</div>',
})
class MockCarouselImagesComponent {}

// Stub para AboutUsComponent
@Component({
  selector: 'app-about-us',
  template: '<div>AboutUs Stub</div>',
})
class MockAboutUsComponent {}

// Stub para ContactUsComponent
@Component({
  selector: 'app-contact-us',
  template: '<div>ContactUs Stub</div>',
})
class MockContactUsComponent {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockCardLoaderComponent,
        MockCarouselImagesComponent,
        MockAboutUsComponent,
        MockContactUsComponent,
      ],
      imports: [NgbTooltipModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the welcome title', () => {
    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement.textContent).toContain('Bienvenido a Casona Encantada');
  });

  it('should render all child components', () => {
    expect(fixture.nativeElement.querySelector('app-card-loader')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('app-carousel-images')
    ).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-about-us')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-contact-us')).toBeTruthy();
  });

  it('should have a back to top button with tooltip', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.getAttribute('ngbTooltip')).toBe('Volver arriba');
    expect(button.getAttribute('placement')).toBe('left');
    expect(button.querySelector('i')).toBeTruthy();
  });

  it('should have a footer with copyright text', () => {
    const footer = fixture.nativeElement.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer.textContent).toContain(
      '© Casona Encantada - Todos los derechos reservados.'
    );
  });

});
