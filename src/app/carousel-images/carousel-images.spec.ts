import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselImages } from './carousel-images.component';

describe('CarouselImages', () => {
  let component: CarouselImages;
  let fixture: ComponentFixture<CarouselImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselImages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselImages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
