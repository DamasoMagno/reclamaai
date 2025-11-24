"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "../context/auth";
import { api } from "../services/api";

export default function Home() {
  const { loading, register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault();

    try {
      await register(name, email, password);
    } catch (error) {
      console.log("Error during sign-in:", error);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 w-[50%] mx-auto mt-20"
      >
        <div className="w-full">
          <Label>Nome</Label>
          <input
            className="border border-gray-200 w-full"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Label>Email</Label>
          <input
            type="email"
            className="border border-gray-200 w-full"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label>Senha</Label>
          <input
            type="password"
            className="border border-gray-200 w-full"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
    </div>
  );
}
