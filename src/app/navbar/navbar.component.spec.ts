import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Component } from '@angular/core';

// Componente stub para rutas
@Component({ template: '' })
class StubComponent {}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let sesionSubject: Subject<any>;

  beforeEach(async () => {
    sesionSubject = new Subject<any>();

    const authServiceSpy = jasmine.createSpyObj(
      'AuthService',
      ['cerrarSesion'],
      {
        sesion$: sesionSubject.asObservable(),
      }
    );

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent, StubComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: StubComponent },
          { path: 'registro', component: StubComponent },
          { path: 'admin', component: StubComponent },
          { path: 'perfil', component: StubComponent },
          { path: 'carrito', component: StubComponent },
          { path: '', component: StubComponent },
        ]),
        NgbDropdownModule,
      ],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(router, 'navigate');
  });

  afterEach(() => {
    sesionSubject.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty session', () => {
    expect(component.sesion).toBeNull();
  });

  it('should show login and register buttons when not logged in', () => {
    fixture.detectChanges();

    // Abrir el dropdown de perfil
    const dropdownToggle = fixture.debugElement.query(
      By.css('[ngbDropdownToggle]')
    );
    dropdownToggle.nativeElement.click();
    fixture.detectChanges();

    const dropdownItems = fixture.debugElement.queryAll(
      By.css('.dropdown-item')
    );

    const loginButton = dropdownItems.find((item) =>
      item.nativeElement.textContent.includes('Iniciar sesión')
    );
    const registerButton = dropdownItems.find((item) =>
      item.nativeElement.textContent.includes('Registro')
    );

    expect(loginButton).toBeTruthy();
    expect(registerButton).toBeTruthy();
  });

  it('should show profile and logout buttons when logged in', fakeAsync(() => {
    // Mock logged in user
    const mockSession = { logueado: true, usuario: 'test', tipo: 'usuario' };
    (localStorage.getItem as jasmine.Spy)
      .withArgs('sesion')
      .and.returnValue(JSON.stringify(mockSession));
    sesionSubject.next(mockSession);

    fixture.detectChanges();
    tick();

    // Abrir el dropdown de perfil
    const dropdownToggle = fixture.debugElement.query(
      By.css('[ngbDropdownToggle]')
    );
    dropdownToggle.nativeElement.click();
    fixture.detectChanges();

    const dropdownItems = fixture.debugElement.queryAll(
      By.css('.dropdown-item')
    );
    const profileButton = dropdownItems.find((item) =>
      item.nativeElement.textContent.includes('Mi Perfil')
    );
    const cartButton = dropdownItems.find((item) =>
      item.nativeElement.textContent.includes('Carrito')
    );
    const logoutButton = dropdownItems.find((item) =>
      item.nativeElement.textContent.includes('Cerrar sesión')
    );

    expect(profileButton).toBeTruthy();
    expect(cartButton).toBeTruthy();
    expect(logoutButton).toBeTruthy();
  }));

  it('should show admin panel button when user is admin', fakeAsync(() => {
    // Mock admin user
    const mockSession = { logueado: true, usuario: 'admin', tipo: 'admin' };
    (localStorage.getItem as jasmine.Spy)
      .withArgs('sesion')
      .and.returnValue(JSON.stringify(mockSession));
    sesionSubject.next(mockSession);

    fixture.detectChanges();
    tick();

    // Abrir el dropdown de perfil
    const dropdownToggle = fixture.debugElement.query(
      By.css('[ngbDropdownToggle]')
    );
    dropdownToggle.nativeElement.click();
    fixture.detectChanges();

    const adminButton = fixture.debugElement.query(By.css('a[href="/admin"]'));
    expect(adminButton).toBeTruthy();
  }));

  it('should have main navigation links', fakeAsync(() => {
    fixture.detectChanges();

    // Abrir el dropdown de navegación
    const navDropdownToggle = fixture.debugElement.query(
      By.css('#dropdownNav')
    );
    navDropdownToggle.nativeElement.click();
    fixture.detectChanges();
    tick();

    const dropdownButtons = fixture.debugElement.queryAll(
      By.css('.dropdown-item')
    );

    const expectedLinks = [
      'Inicio',
      'Proximos Eventos',
      'Eventos Pasados',
      'Nosotros',
      'Contacto',
    ];

    // Solo verificar los primeros 5 items que son los de navegación
    for (let i = 0; i < 5; i++) {
      expect(dropdownButtons[i].nativeElement.textContent.trim()).toBe(
        expectedLinks[i]
      );
    }
  }));
});
