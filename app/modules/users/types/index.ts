// Users module types
import type { ID } from '@core/types';

export interface User {
  id: ID;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'admin' | 'user' | 'guest';

export interface CreateUserPayload {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserPayload {
  email?: string;
  name?: string;
  avatar?: string;
  role?: UserRole;
}
