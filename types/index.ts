export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
}

export interface MenuSection {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  email: string;
  logo: string;
  banner: string;
  active: boolean;
  sections: MenuSection[];
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  restaurantId?: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

export interface MenuItemFormData {
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
}

export interface MenuSectionFormData {
  name: string;
}

export interface RestaurantFormData {
  name: string;
  email: string;
  logo?: string;
  banner?: string;
}

export interface QRCodeData {
  restaurantSlug: string;
  menuUrl: string;
  createdAt: string;
}
