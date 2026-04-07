"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getAuthUser, setAuthUser, clearAuthUser, getRestaurants, saveRestaurants } from "@/lib/storage";
import { mockAdmin, mockRestaurants, type Restaurant } from "@/data/mockData";

interface AuthContextType {
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [restaurants, setRestaurantsState] = useState<Restaurant[]>(mockRestaurants);

  useEffect(() => {
    const stored = getAuthUser();
    if (stored) {
      setUser(stored);
    }
    const storedRestaurants = getRestaurants();
    if (storedRestaurants.length > 0) {
      setRestaurantsState(storedRestaurants);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === mockAdmin.email && password === mockAdmin.password) {
      const userData = { email: mockAdmin.email, name: "Admin" };
      setUser(userData);
      setAuthUser(userData);
      return true;
    }
    const storedRestaurants = getRestaurants();
    const found = storedRestaurants.find((r) => r.email === email);
    if (found) {
      const userData = { email: found.email, name: found.name };
      setUser(userData);
      setAuthUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    clearAuthUser();
  };

  const register = (name: string, email: string, _password: string): boolean => {
    const newRestaurant: Restaurant = {
      id: String(Date.now()),
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      email,
      logo: mockRestaurants[0].logo,
      banner: mockRestaurants[0].banner,
      active: true,
      sections: [],
    };
    const updated = [...restaurants, newRestaurant];
    setRestaurantsState(updated);
    saveRestaurants(updated);
    const userData = { email, name };
    setUser(userData);
    setAuthUser(userData);
    return true;
  };

  const setRestaurants = (restaurants: Restaurant[]) => {
    setRestaurantsState(restaurants);
    saveRestaurants(restaurants);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, restaurants, setRestaurants }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
