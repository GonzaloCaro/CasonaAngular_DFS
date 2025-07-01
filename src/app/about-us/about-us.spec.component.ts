import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutUsComponent } from './about-us.component';
import { By } from '@angular/platform-browser';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutUsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main title "Staff"', () => {
    const titleElement = fixture.debugElement.query(By.css('.us-title'));
    expect(titleElement.nativeElement.textContent).toContain('Staff');
  });

  it('should render three staff cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.card'));
    expect(cards.length).toBe(3);
  });

  it('should render correct staff member names and positions', () => {
    const cards = fixture.debugElement.queryAll(By.css('.card'));

    // Verificar primer miembro del staff
    const firstCardTitle = cards[0].query(By.css('.card-title'));
    const firstCardText = cards[0].query(By.css('.card-text'));
    expect(firstCardTitle.nativeElement.textContent).toBe('Kimberly');
    expect(firstCardText.nativeElement.textContent).toBe('Directora Ejecutiva');

    // Verificar segundo miembro del staff
    const secondCardTitle = cards[1].query(By.css('.card-title'));
    const secondCardText = cards[1].query(By.css('.card-text'));
    expect(secondCardTitle.nativeElement.textContent).toBe('Scatha');
    expect(secondCardText.nativeElement.textContent).toBe('Directora Creativa');

    // Verificar tercer miembro del staff
    const thirdCardTitle = cards[2].query(By.css('.card-title'));
    const thirdCardText = cards[2].query(By.css('.card-text'));
    expect(thirdCardTitle.nativeElement.textContent).toBe('Andreotty');
    expect(thirdCardText.nativeElement.textContent).toBe(
      'Director de Operaciones'
    );
  });

  it('should have proper CSS classes applied', () => {
    const container = fixture.debugElement.query(By.css('.about_us-container'));
    const usContainer = fixture.debugElement.query(By.css('.us_container'));
    const cardsContainer = fixture.debugElement.query(
      By.css('.cards-container')
    );

    expect(container).toBeTruthy();
    expect(usContainer).toBeTruthy();
    expect(cardsContainer).toBeTruthy();
  });

  it('should have text-4xl class on the title', () => {
    const titleElement = fixture.debugElement.query(By.css('.us-title'));
    expect(
      titleElement.nativeElement.classList.contains('text-4xl')
    ).toBeTrue();
  });
});
