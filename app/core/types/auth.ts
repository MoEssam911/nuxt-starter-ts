export interface IAuthUser {
  id: string;
  email: string;
  name?: string;
  // allow projects to extend with custom fields (role, permissions, etc.)
  [key: string]: any;
}

export interface IAuthState {
  user: IAuthUser | null;
  token: string | null;
  isAuthenticated?: boolean; // computed in store
  sessionExpiresAt?: number;
}

export interface Permission<R = string, A = string> {
  resource: R;
  action: A;
}
