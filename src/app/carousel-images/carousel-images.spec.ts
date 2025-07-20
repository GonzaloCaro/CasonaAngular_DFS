import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselImagesComponent } from './carousel-images.component';
import { NgbCarouselModule, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

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
      imports: [
        NgbCarouselModule,
        HttpClientTestingModule, // Importante: mock de HttpClient
      ],
      providers: [{ provide: NgbCarousel, useClass: MockNgbCarousel }],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselImagesComponent);
    component = fixture.componentInstance;

    // Simula 3 exposiciones pasadas
    component.exposPasadas = [
      {
        title: 'Exposición 1',
        src: 'img1.jpg',
        description: '',
      },
      { title: 'Exposición 2', src: 'img2.jpg', description: '' },
      { title: 'Exposición 3', src: 'img3.jpg', description: '' },
    ];

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
});
