/**
 * USER TYPE DEFINITIONS
 * =====================
 */

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    city: string;
  };
  company: {
    name: string;
  };
}

export interface UsersState {
  users: User[];
  loading: boolean;
  loadingById: boolean;
  error: string | null;
  selectedUserId: number | null;
  previewUser: User | null;
}
