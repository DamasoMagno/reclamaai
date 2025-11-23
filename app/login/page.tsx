"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const cardClasses =
  "rounded-2xl border border-[#e5e7eb] bg-white px-6 py-6 shadow-sm dark:border-[#36414a] dark:bg-[#1b2837]"

export default function LoginPage() {
  const [mode, setMode] = React.useState<"login" | "register">("login")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [name, setName] = React.useState("")
  const [city, setCity] = React.useState("")
  const [feedback, setFeedback] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setFeedback(mode === "login" ? "Login efetuado (mock)." : "Cadastro criado (mock).")
      if (mode === "register") {
        setName("")
        setCity("")
      }
      setEmail("")
      setPassword("")
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[#f6f7f8] pt-10 pb-16 font-['Public Sans',_sans-serif] text-[#111418] dark:bg-[#101922] dark:text-[#f0f2f4]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e5e7eb] bg-white px-6 py-5 shadow-sm dark:border-[#36414a] dark:bg-[#1b2837]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#90a4b7]">Acesso Seguro</p>
            <h1 className="text-3xl font-black tracking-[-0.03em] text-[#111418] dark:text-white">
              Entre ou crie sua conta no ReclameAI!
            </h1>
            <p className="text-base text-[#617589] dark:text-[#90a4b7]">
              Centralizamos suas reclamações, votos e alertas. Use os dados para acompanhar a atuação das autoridades.
            </p>
          </div>
          <div className="text-sm text-[#617589] dark:text-[#90a4b7]">
            <p>Não se preocupe, seus dados estão protegidos e usamos criptografia em todo o fluxo.</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <section className={cardClasses}>
            <div className="flex gap-3 rounded-full bg-[#f6f7f8] p-1 dark:bg-[#101922]">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${
                  mode === "login" ? "bg-white shadow-sm" : "text-[#617589]"
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${
                  mode === "register" ? "bg-white shadow-sm" : "text-[#617589]"
                }`}
              >
                Criar conta
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {mode === "register" && (
                <label className="flex flex-col gap-2 text-sm font-semibold">
                  Nome completo
                  <input
                    className="h-11 rounded-lg border border-[#d6dce5] bg-white px-4 text-base text-[#111418] placeholder:text-[#90a4b7] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4]"
                    placeholder="Como deseja ser identificado"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </label>
              )}

              <label className="flex flex-col gap-2 text-sm font-semibold">
                E-mail
                <input
                  className="h-11 rounded-lg border border-[#d6dce5] bg-white px-4 text-base text-[#111418] placeholder:text-[#90a4b7] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4]"
                  type="email"
                  placeholder="voce@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>

              {mode === "register" && (
                <label className="flex flex-col gap-2 text-sm font-semibold">
                  Cidade
                  <input
                    className="h-11 rounded-lg border border-[#d6dce5] bg-white px-4 text-base text-[#111418] placeholder:text-[#90a4b7] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4]"
                    placeholder="Ex.: Itapipoca - CE"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                </label>
              )}

              <label className="flex flex-col gap-2 text-sm font-semibold">
                Senha
                <input
                  className="h-11 rounded-lg border border-[#d6dce5] bg-white px-4 text-base text-[#111418] placeholder:text-[#90a4b7] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4]"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#617589]">
                {mode === "login" ? (
                  <Link href="#" className="text-[#1173d4] hover:underline">
                    Esqueci minha senha
                  </Link>
                ) : (
                  <p>Usaremos seu e-mail para notificações das suas causas.</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="mt-2 h-11 w-full rounded-lg bg-[#1173d4] text-base font-semibold text-white hover:bg-[#0f65bb] disabled:opacity-60"
              >
                {loading ? "Processando..." : mode === "login" ? "Entrar" : "Criar conta"}
              </Button>
            </form>

            {feedback && <p className="mt-4 text-sm font-medium text-green-600">{feedback}</p>}
          </section>

          <section className={cardClasses}>
            <h2 className="text-xl font-bold text-[#111418] dark:text-white">Por que criar uma conta?</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#617589] dark:text-[#cfd5db]">
              <li>• Acompanhe suas reclamações em tempo real e receba notificações.</li>
              <li>• Vote nos tópicos mais urgentes e participe de abaixo-assinados.</li>
              <li>• Salve contatos das autoridades e organize grupos locais.</li>
            </ul>
            <div className="mt-8 rounded-2xl border border-dashed border-[#d6dce5] bg-[#f6f7f8] px-4 py-5 text-sm text-[#617589] dark:border-[#36414a] dark:bg-[#111c2a]">
              <p className="font-semibold text-[#111418] dark:text-white">Dúvidas sobre privacidade?</p>
              <p>Nossos servidores ficam no Brasil e todo acesso é registrado. Consulte nossa política para mais detalhes.</p>
              <Button variant="outline" className="mt-4 w-full rounded-lg border-[#1173d4] text-[#1173d4]">
                Ler políticas
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
