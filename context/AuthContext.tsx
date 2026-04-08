"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { 
  getAuthUser, setAuthUser, clearAuthUser, 
  getRestaurantsByEmail, saveRestaurantsForUser,
  getUserByEmail, saveUser, type AuthUser
} from "@/lib/storage";
import { mockAdmin, mockRestaurants, type Restaurant } from "@/data/mockData";

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [restaurants, setRestaurantsState] = useState<Restaurant[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const stored = getAuthUser();
    if (stored) {
      setUser(stored);
      setIsAdmin(stored.email === mockAdmin.email);
      if (stored.email === mockAdmin.email) {
        setRestaurantsState(mockRestaurants);
      } else {
        setRestaurantsState(getRestaurantsByEmail(stored.email));
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === mockAdmin.email && password === mockAdmin.password) {
      const userData = { email: mockAdmin.email, name: "Admin", plan: 'free' as const };
      setUser(userData);
      setAuthUser(userData);
      setIsAdmin(true);
      setRestaurantsState(mockRestaurants);
      return true;
    }
    
    const storedUser = getUserByEmail(email);
    if (storedUser && storedUser.password === password) {
      const userData = { email: storedUser.email, name: storedUser.name, plan: storedUser.plan };
      setUser(userData);
      setAuthUser(userData);
      setIsAdmin(false);
      setRestaurantsState(getRestaurantsByEmail(email));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setRestaurantsState([]);
    setIsAdmin(false);
    clearAuthUser();
  };

  const register = (name: string, email: string, password: string): boolean => {
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return false;
    }
    
    saveUser({
      email,
      name,
      password,
      plan: 'free',
      createdAt: new Date().toISOString(),
    });
    
    const userData = { email, name, plan: 'free' as const };
    setUser(userData);
    setAuthUser(userData);
    setIsAdmin(false);
    setRestaurantsState([]);
    return true;
  };

  const setRestaurants = (newRestaurants: Restaurant[]) => {
    setRestaurantsState(newRestaurants);
    if (user) {
      if (user.email === mockAdmin.email) {
        return;
      }
      saveRestaurantsForUser(user.email, newRestaurants);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, restaurants, setRestaurants, isAdmin }}>
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
