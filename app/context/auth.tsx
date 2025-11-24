"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      setToken(storedToken);
    }
  }, []);

  async function signIn(email: string, password: string) {
    try {
      setLoading(true);
      const response = await api.post("/user/auth", {
        email,
        password,
      });

      const data = response.data;

      api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      localStorage.setItem("authToken", data.token);

      setUser(data.user);
      setToken(data.token);
    } catch (error) {
      console.error("Error during sign-in:", error);
    } finally {
      setLoading(false);
    }
  }

  async function register(name: string, email: string, password: string) {
    try {
      setLoading(true);
      const response = await api.post("/user/register", {
        name,
        email,
        password,
      });

      const data = response.data;
      setUser(data.user);
    } catch (error) {
      console.error("Error during sign-in:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        token,
        signIn,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
