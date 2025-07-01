import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardLoaderComponent } from './card-loader.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardLoaderComponent', () => {
  let component: CardLoaderComponent;
  let fixture: ComponentFixture<CardLoaderComponent>;

  // Mock de datos
  const mockExpos = [
    {
      id: '1',
      src: 'image1.jpg',
      title: 'Evento 1',
      date: '2023-12-01',
      description: 'Descripción 1',
    },
    {
      id: '2',
      src: 'image2.jpg',
      title: 'Evento 2',
      date: '2023-12-02',
      description: 'Descripción 2',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CardLoaderComponent],
    });

    fixture = TestBed.createComponent(CardLoaderComponent);
    component = fixture.componentInstance;

    // Limpiar todos los spies antes de cada test
    spyOn(localStorage, 'setItem').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load eventos from localStorage on init', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) =>
      key === 'eventos' ? JSON.stringify(mockExpos) : null
    );

    component.ngOnInit();
    expect(component.exposFuturas.length).toBe(2);
    expect(component.exposFuturas[0].title).toBe('Evento 1');
  });

  it('should load default eventos if localStorage is empty', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.ngOnInit();
    expect(component.exposFuturas.length).toBeGreaterThan(0);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should show alert when trying to add to cart without session', () => {
    spyOn(window, 'alert');
    component.agregarAlCarrito(mockExpos[0]);
    expect(window.alert).toHaveBeenCalledWith(
      'Debes iniciar sesión como usuario para agregar al carrito.'
    );
  });

  it('should add new item to cart when user is logged in', () => {
    const mockSesion = {
      email: 'test@test.com',
      tipo: 'usuario',
      logueado: true,
    };

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'sesion') return JSON.stringify(mockSesion);
      if (key === 'carrito_test@test.com') return null;
      return null;
    });

    spyOn(window, 'alert');

    component.sesion = mockSesion;
    component.agregarAlCarrito(mockExpos[0]);

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      '¡Agregado al carrito con éxito!'
    );
  });

  it('should increment quantity if item already in cart', () => {
    const mockSesion = {
      email: 'test@test.com',
      tipo: 'usuario',
      logueado: true,
    };

    const mockCarrito = [
      {
        nombre: 'Evento 1',
        cantidad: 1,
        precio: 10000,
      },
    ];

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'sesion') return JSON.stringify(mockSesion);
      if (key === 'carrito_test@test.com') return JSON.stringify(mockCarrito);
      return null;
    });

    component.sesion = mockSesion;
    component.agregarAlCarrito(mockExpos[0]);

    const expectedCarrito = [
      {
        ...mockCarrito[0],
        cantidad: 2,
      },
    ];

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'carrito_test@test.com',
      JSON.stringify(expectedCarrito)
    );
  });

  it('should not add to cart if user is not "usuario"', () => {
    const mockSesion = {
      email: 'admin@test.com',
      tipo: 'admin',
      logueado: true,
    };

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockSesion));
    spyOn(window, 'alert');

    component.sesion = mockSesion;
    component.agregarAlCarrito(mockExpos[0]);

    expect(window.alert).toHaveBeenCalledWith(
      'Debes iniciar sesión como usuario para agregar al carrito.'
    );
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
