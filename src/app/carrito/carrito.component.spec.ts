import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CarritoComponent } from './carrito.component';

describe('CarritoComponent', () => {
  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarritoComponent],
      imports: [FormsModule, NgbTooltipModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;

    // Mock localStorage
    let store: { [key: string]: string } = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return store[key] || '';
    });
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): void => {
        store[key] = value;
      }
    );
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete store[key];
    });

    fixture.detectChanges();
  });

  afterEach(() => {
    // Clear localStorage mock
    (localStorage as any).clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty cart when no session', () => {
    expect(component.carrito.length).toBe(0);
    expect(component.total).toBe(0);
  });

  it('should load cart from localStorage when session exists', () => {
    // Mock session
    const mockSession = { logueado: true, email: 'test@example.com' };
    localStorage.setItem('sesion', JSON.stringify(mockSession));

    // Mock cart data
    const mockCarrito = [
      {
        nombre: 'Evento Test',
        fecha: '2023-01-01',
        descripcion: 'Descripción Test',
        imagen: 'test.jpg',
        tipo_entrada: 'General',
        precio: 10000,
        cantidad: 2,
      },
    ];
    localStorage.setItem(
      'carrito_test@example.com',
      JSON.stringify(mockCarrito)
    );

    // Recreate component to trigger ngOnInit
    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.carrito.length).toBe(1);
    expect(component.carrito[0].nombre).toBe('Evento Test');
    expect(component.total).toBe(20000); // 10000 * 2
  });

  it('should keep only first item if cart has more than one item', () => {
    const mockSession = { logueado: true, email: 'test@example.com' };
    localStorage.setItem('sesion', JSON.stringify(mockSession));

    const mockCarrito = [
      {
        nombre: 'Evento 1',
        fecha: '',
        descripcion: '',
        imagen: '',
        tipo_entrada: 'General',
        precio: 10000,
        cantidad: 1,
      },
      {
        nombre: 'Evento 2',
        fecha: '',
        descripcion: '',
        imagen: '',
        tipo_entrada: 'General',
        precio: 10000,
        cantidad: 1,
      },
    ];
    localStorage.setItem(
      'carrito_test@example.com',
      JSON.stringify(mockCarrito)
    );

    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.carrito.length).toBe(1);
    expect(component.carrito[0].nombre).toBe('Evento 1');
  });

  it('should calculate total correctly', () => {
    component.carrito = [
      {
        nombre: 'Evento Test',
        fecha: '2023-01-01',
        descripcion: 'Descripción Test',
        imagen: 'test.jpg',
        tipo_entrada: 'General',
        precio: 10000,
        cantidad: 3,
      },
    ];

    component.calcularTotal();
    expect(component.total).toBe(30000);
  });

  it('should update ticket type and price', () => {
    component.carrito = [
      {
        nombre: 'Evento Test',
        fecha: '2023-01-01',
        descripcion: 'Descripción Test',
        imagen: 'test.jpg',
        tipo_entrada: 'General',
        precio: 10000,
        cantidad: 1,
      },
    ];

    component.cambiarTipoEntrada('VIP');
    expect(component.carrito[0].tipo_entrada).toBe('VIP');
    expect(component.carrito[0].precio).toBe(15000);
    expect(component.total).toBe(15000);
  });

  it('should update quantity within limits', () => {
    component.carrito = [
      {
        nombre: 'Evento Test',
        fecha: '2023-01-01',
        descripcion: 'Descripción Test',
        imagen: 'test.jpg',
        tipo_entrada: 'General',
        precio: 10000,
        cantidad: 2,
      },
    ];

    // Increase quantity
    component.actualizarCantidad(1);
    expect(component.carrito[0].cantidad).toBe(3);
    expect(component.total).toBe(30000);

    // Decrease quantity
    component.actualizarCantidad(-1);
    expect(component.carrito[0].cantidad).toBe(2);
    expect(component.total).toBe(20000);

    // Test minimum limit
    component.carrito[0].cantidad = 1;
    component.actualizarCantidad(-1);
    expect(component.carrito[0].cantidad).toBe(1); // Shouldn't go below 1

    // Test maximum limit
    component.carrito[0].cantidad = 10;
    component.actualizarCantidad(1);
    expect(component.carrito[0].cantidad).toBe(10); // Shouldn't go above 10
  });

  it('should empty cart', () => {
    component.carrito = [
      {
        nombre: 'Evento Test',
        fecha: '2023-01-01',
        descripcion: 'Descripción Test',
        imagen: 'test.jpg',
        tipo_entrada: 'General',
        precio: 10000,
        cantidad: 2,
      },
    ];
    component.claveCarrito = 'carrito_test@example.com';

    component.vaciarCarrito();
    expect(component.carrito.length).toBe(0);
    expect(component.total).toBe(0);
    expect(localStorage.removeItem).toHaveBeenCalledWith(
      'carrito_test@example.com'
    );
  });

  it('should handle purchase', () => {
    spyOn(window, 'alert');
    component.carrito = [
      {
        nombre: 'Evento Test',
        fecha: '2023-01-01',
        descripcion: 'Descripción Test',
        imagen: 'test.jpg',
        tipo_entrada: 'General',
        precio: 10000,
        cantidad: 2,
      },
    ];
    component.claveCarrito = 'carrito_test@example.com';

    // Test successful purchase
    component.comprar();
    expect(window.alert).toHaveBeenCalledWith('¡Compra realizada con éxito!');
    expect(component.carrito.length).toBe(0);

    // Test empty cart
    component.comprar();
    expect(window.alert).toHaveBeenCalledWith('Tu carrito está vacío.');
  });

  it('should render empty cart message when cart is empty', () => {
    component.carrito = [];
    fixture.detectChanges();

    const emptyCartElement =
      fixture.nativeElement.querySelector('.text-center');
    expect(emptyCartElement).toBeTruthy();
    expect(emptyCartElement.textContent).toContain('Tu carrito está vacío');
  });
});
