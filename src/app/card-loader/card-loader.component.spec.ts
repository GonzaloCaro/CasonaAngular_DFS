import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardLoaderComponent } from './card-loader.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardLoaderComponent', () => {
  let component: CardLoaderComponent;
  let fixture: ComponentFixture<CardLoaderComponent>;
  let httpMock: HttpTestingController;

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
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [CardLoaderComponent],
    });

    fixture = TestBed.createComponent(CardLoaderComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(localStorage, 'setItem').and.callFake(() => {});
    spyOn(window, 'alert').and.callFake(() => {});
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load eventos from HTTP and store in localStorage', () => {
    component.ngOnInit();

    const req = httpMock.expectOne(
      'https://gonzalocaro.github.io/expos/exposiciones.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ exposFuturas: mockExpos });

    expect(component.exposFuturas.length).toBe(2);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should show alert when trying to add to cart without session', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

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
        fecha: '2023-12-01',
        descripcion: 'Descripción 1',
        imagen: 'image1.jpg',
        tipo_entrada: 'General',
        precio: 10000,
        cantidad: 1,
      },
    ];

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'sesion') return JSON.stringify(mockSesion);
      if (key === 'carrito_test@test.com') return JSON.stringify(mockCarrito);
      return null;
    });

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

    component.agregarAlCarrito(mockExpos[0]);

    expect(window.alert).toHaveBeenCalledWith(
      'Debes iniciar sesión como usuario para agregar al carrito.'
    );
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
