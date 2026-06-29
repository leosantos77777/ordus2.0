export interface IAuthRepository {
  isAdminAuthenticated(): boolean;
  loginAdmin(username: string, password: string): boolean;
  logoutAdmin(): void;
  isUserAuthenticated(): boolean;
  login(username: string, password: string): boolean;
  logout(): void;
}

export class LocalAuthRepository implements IAuthRepository {
  private ADMIN_SESSION_KEY = 'ordus_admin_session';
  private USER_SESSION_KEY = 'ordus_user_session';

  isAdminAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(this.ADMIN_SESSION_KEY) === 'true';
  }

  loginAdmin(username: string, password: string): boolean {
    if (username.trim() === 'admin' && password === '123') {
      localStorage.setItem(this.ADMIN_SESSION_KEY, 'true');
      return true;
    }
    return false;
  }

  logoutAdmin(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.ADMIN_SESSION_KEY);
    }
  }

  isUserAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(this.USER_SESSION_KEY) === 'true';
  }

  login(username: string, password: string): boolean {
    if ((username.trim() === 'cliente' || username.trim() === 'cliente@ordus.com.br') && password === '123') {
      localStorage.setItem(this.USER_SESSION_KEY, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.USER_SESSION_KEY);
    }
  }
}

export const authRepository: IAuthRepository = new LocalAuthRepository();

