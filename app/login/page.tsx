"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/auth";
import { api } from "../services/api";
import { redirect, useRouter } from "next/navigation";

const cardClasses =
  "rounded-2xl border border-[#e5e7eb] bg-white px-6 py-6 shadow-sm dark:border-[#36414a] dark:bg-[#1b2837]";

export default function LoginPage() {
  const router = useRouter();
  const { loading, signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn(event: React.FormEvent) {
    event.preventDefault();

    try {
      await signIn(email, password);
      router.push("/");
    } catch (error) {
      console.log("Error during sign-in:", error);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f7f8] flex items-center justify-center px-4 font-['Public Sans',_sans-serif] text-[#111418] dark:bg-[#101922] dark:text-[#f0f2f4]">
      <div className="w-full max-w-md">
        <section className={cardClasses}>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Acesse sua conta</h1>
            <p className="text-sm text-[#617589]">
              Junte-se à nossa comunidade para fazer a diferença
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                className="h-12 w-full rounded-lg border border-[#d6dce5] bg-white px-4 text-base text-[#111418] placeholder:text-[#90a4b7] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4]"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <input
                className="h-12 w-full rounded-lg border border-[#d6dce5] bg-white px-4 text-base text-[#111418] placeholder:text-[#90a4b7] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4]"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-4 h-12 w-full rounded-lg bg-[#1173d4] text-base font-semibold text-white hover:bg-[#0f65bb] disabled:opacity-60"
            >
              {loading ? "Entrando" : "Entrar"}
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
