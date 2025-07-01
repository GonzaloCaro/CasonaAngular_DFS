import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselImagesComponent } from './carousel-images.component';
import { By } from '@angular/platform-browser';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

// Mock del componente NgbCarousel
class MockNgbCarousel {
  pause() {}
  cycle() {}
}

describe('CarouselImagesComponent', () => {
  let component: CarouselImagesComponent;
  let fixture: ComponentFixture<CarouselImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselImagesComponent],
      imports: [NgbCarouselModule],
      providers: [{ provide: NgbCarousel, useClass: MockNgbCarousel }],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial configuration', () => {
    expect(component.pauseOnHover).toBeTrue();
    expect(component.pauseOnFocus).toBeTrue();
    expect(component.unpauseOnArrow).toBeFalse();
    expect(component.pauseOnIndicator).toBeFalse();
  });

  // Pruebas que no requieren renderizado del carrusel
  it('should have correct exposPasadas data', () => {
    expect(component.exposPasadas.length).toBe(3);
    expect(component.exposPasadas[0].title).toBe('Dia de los Patrimonios');
  });
});
