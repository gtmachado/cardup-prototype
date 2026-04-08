import { mockRestaurants, type Restaurant } from "@/data/mockData";

const STORAGE_KEY = "cardup_restaurants";
const AUTH_KEY = "cardup_auth";
const USERS_KEY = "cardup_users";

export interface AuthUser {
  email: string;
  name: string;
}

export interface StoredUser {
  email: string;
  name: string;
  password: string;
  plan: 'free' | 'up' | 'gente-grande' | 'gente-grande-franquias';
  createdAt: string;
}

export function getAllUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(USERS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveUser(user: StoredUser) {
  if (typeof window === "undefined") return;
  const users = getAllUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getUserByEmail(email: string): StoredUser | undefined {
  return getAllUsers().find(u => u.email === email);
}

export function updateUser(email: string, updates: Partial<StoredUser>) {
  if (typeof window === "undefined") return;
  const users = getAllUsers();
  const index = users.findIndex(u => u.email === email);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}

export function getRestaurantsByEmail(email: string): Restaurant[] {
  if (typeof window === "undefined") {
    return email === "admin@cardup.com" ? mockRestaurants : [];
  }
  const stored = localStorage.getItem(`${STORAGE_KEY}_${email}`);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveRestaurantsForUser(email: string, restaurants: Restaurant[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${STORAGE_KEY}_${email}`, JSON.stringify(restaurants));
}

export function getRestaurants(): Restaurant[] {
  if (typeof window === "undefined") {
    return mockRestaurants;
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return mockRestaurants;
    }
  }
  return mockRestaurants;
}

export function saveRestaurants(restaurants: Restaurant[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
}

export function saveRestaurantsForCurrentUser(email: string, restaurants: Restaurant[]) {
  saveRestaurantsForUser(email, restaurants);
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return getRestaurants().find((r) => r.id === id);
}

export function getRestaurantByIdForUser(id: string, email: string): Restaurant | undefined {
  return getRestaurantsByEmail(email).find((r) => r.id === id);
}

export function getRestaurantBySlug(slug: string): Restaurant | undefined {
  return getRestaurants().find((r) => r.slug === slug);
}

export function getRestaurantBySlugForUser(slug: string, email: string): Restaurant | undefined {
  return getRestaurantsByEmail(email).find((r) => r.slug === slug);
}

export function updateRestaurant(updated: Restaurant, email?: string) {
  if (email) {
    const restaurants = getRestaurantsByEmail(email);
    const index = restaurants.findIndex((r) => r.id === updated.id);
    if (index !== -1) {
      restaurants[index] = updated;
      saveRestaurantsForUser(email, restaurants);
    }
  } else {
    const restaurants = getRestaurants();
    const index = restaurants.findIndex((r) => r.id === updated.id);
    if (index !== -1) {
      restaurants[index] = updated;
      saveRestaurants(restaurants);
    }
  }
}

export function addRestaurant(restaurant: Restaurant, email?: string) {
  if (email) {
    const restaurants = getRestaurantsByEmail(email);
    restaurants.push(restaurant);
    saveRestaurantsForUser(email, restaurants);
  } else {
    const restaurants = getRestaurants();
    restaurants.push(restaurant);
    saveRestaurants(restaurants);
  }
}

export function deleteRestaurant(id: string, email?: string) {
  if (email) {
    const restaurants = getRestaurantsByEmail(email).filter((r) => r.id !== id);
    saveRestaurantsForUser(email, restaurants);
  } else {
    const restaurants = getRestaurants().filter((r) => r.id !== id);
    saveRestaurants(restaurants);
  }
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(AUTH_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

export function setAuthUser(user: AuthUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearAuthUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}
