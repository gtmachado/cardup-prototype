import { mockRestaurants, type Restaurant } from "@/data/mockData";

const STORAGE_KEY = "cardup_restaurants";
const AUTH_KEY = "cardup_auth";

export interface AuthUser {
  email: string;
  name: string;
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

export function getRestaurantById(id: string): Restaurant | undefined {
  return getRestaurants().find((r) => r.id === id);
}

export function getRestaurantBySlug(slug: string): Restaurant | undefined {
  return getRestaurants().find((r) => r.slug === slug);
}

export function updateRestaurant(updated: Restaurant) {
  const restaurants = getRestaurants();
  const index = restaurants.findIndex((r) => r.id === updated.id);
  if (index !== -1) {
    restaurants[index] = updated;
    saveRestaurants(restaurants);
  }
}

export function addRestaurant(restaurant: Restaurant) {
  const restaurants = getRestaurants();
  restaurants.push(restaurant);
  saveRestaurants(restaurants);
}

export function deleteRestaurant(id: string) {
  const restaurants = getRestaurants().filter((r) => r.id !== id);
  saveRestaurants(restaurants);
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
