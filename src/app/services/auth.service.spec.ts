import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);

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
  });

  afterEach(() => {
    // Limpiar localStorage mock
    (localStorage as any).clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with admin user if no users exist', () => {
    // Forzamos localStorage vacío
    (localStorage.getItem as jasmine.Spy).and.returnValue(null);

    // Creamos nueva instancia para que ejecute el constructor
    service = new AuthService();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'usuarios',
      JSON.stringify([
        {
          nombre: 'Admin',
          email: 'admin@casona.cl',
          password: 'admin',
          tipo: 'admin',
        },
      ])
    );
  });

  it('should not add admin user if users already exist', () => {
    const existingUsers = [
      { email: 'test@test.com', password: '123', tipo: 'usuario' },
    ];
    (localStorage.getItem as jasmine.Spy)
      .withArgs('usuarios')
      .and.returnValue(JSON.stringify(existingUsers));

    service = new AuthService();

    expect(localStorage.setItem).not.toHaveBeenCalledWith(
      'usuarios',
      jasmine.any(String)
    );
  });

  describe('getSesion', () => {
    it('should return null when no session exists', () => {
      expect(service.getSesion()).toBeNull();
    });

    it('should return session data when exists', () => {
      const mockSession = { logueado: true, usuario: 'test' };
      (localStorage.getItem as jasmine.Spy)
        .withArgs('sesion')
        .and.returnValue(JSON.stringify(mockSession));

      expect(service.getSesion()).toEqual(mockSession);
    });
  });

  describe('estaLogueado', () => {
    it('should return false when no session exists', () => {
      expect(service.estaLogueado()).toBeFalse();
    });

    it('should return false when session is not logged in', () => {
      const mockSession = { logueado: false };
      (localStorage.getItem as jasmine.Spy)
        .withArgs('sesion')
        .and.returnValue(JSON.stringify(mockSession));

      expect(service.estaLogueado()).toBeFalse();
    });

    it('should return true when session is logged in', () => {
      const mockSession = { logueado: true };
      (localStorage.getItem as jasmine.Spy)
        .withArgs('sesion')
        .and.returnValue(JSON.stringify(mockSession));

      expect(service.estaLogueado()).toBeTrue();
    });
  });

  describe('esAdmin', () => {
    it('should return false when no session exists', () => {
      expect(service.esAdmin()).toBeFalse();
    });

    it('should return false when user is not admin', () => {
      const mockSession = { tipo: 'usuario' };
      (localStorage.getItem as jasmine.Spy)
        .withArgs('sesion')
        .and.returnValue(JSON.stringify(mockSession));

      expect(service.esAdmin()).toBeFalse();
    });

    it('should return true when user is admin', () => {
      const mockSession = { tipo: 'admin' };
      (localStorage.getItem as jasmine.Spy)
        .withArgs('sesion')
        .and.returnValue(JSON.stringify(mockSession));

      expect(service.esAdmin()).toBeTrue();
    });
  });

  describe('cerrarSesion', () => {
    it('should remove session from localStorage', () => {
      service.cerrarSesion();

      expect(localStorage.removeItem).toHaveBeenCalledWith('sesion');
    });
  });

  describe('iniciarSesion', () => {
    it('should save session to localStorage', () => {
      const mockSession = { logueado: true, usuario: 'test' };
      service.iniciarSesion(mockSession);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'sesion',
        JSON.stringify(mockSession)
      );
    });

    it('should emit session data to sesion$', (done) => {
      const mockSession = { logueado: true, usuario: 'test' };

      // Suscribirse al observable para verificar la emisión
      service.sesion$.subscribe((valor) => {
        if (valor && valor.usuario === 'test') {
          expect(valor).toEqual(mockSession);
          done();
        }
      });

      service.iniciarSesion(mockSession);
    });
  });

  describe('addUser', () => {
    beforeEach(() => {
      const existingUsers = [
        { email: 'existing@test.com', password: '123', tipo: 'usuario' },
      ];
      (localStorage.getItem as jasmine.Spy)
        .withArgs('usuarios')
        .and.returnValue(JSON.stringify(existingUsers));
    });

    it('should return false if user already exists', () => {
      const existingUser = {
        email: 'existing@test.com',
        password: '456',
        tipo: 'usuario',
      };

      expect(service.addUser(existingUser)).toBeFalse();
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('should add new user and return true', () => {
      const newUser = {
        email: 'new@test.com',
        password: '789',
        tipo: 'usuario',
      };

      expect(service.addUser(newUser)).toBeTrue();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'usuarios',
        JSON.stringify([
          { email: 'existing@test.com', password: '123', tipo: 'usuario' },
          newUser,
        ])
      );
    });

    it('should handle empty users array', () => {
      (localStorage.getItem as jasmine.Spy)
        .withArgs('usuarios')
        .and.returnValue(null);
      const newUser = {
        email: 'new@test.com',
        password: '789',
        tipo: 'usuario',
      };

      expect(service.addUser(newUser)).toBeTrue();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'usuarios',
        JSON.stringify([newUser])
      );
    });
  });
});
