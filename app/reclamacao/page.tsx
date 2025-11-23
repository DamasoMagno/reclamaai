"use client"

import * as React from "react"
import Link from "next/link"
import { Mic, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const CONTAINER = "mx-auto w-full max-w-4xl px-4"

const affectedOptions = ["Só a mim", "Outras pessoas", "Ambos"]
const impactOptions = ["Impacto financeiro", "Risco à saúde", "Inconveniência"]
const actionOptions = ["Fiscalização", "Manutenção", "Nova implementação"]

type AssistantSelections = {
  affected: string
  impact: string[]
  action: string[]
}

export default function ComplaintPage() {
  const [description, setDescription] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [neighborhood, setNeighborhood] = React.useState("")
  const [zip, setZip] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "sending" | "success">("idle")
  const [assistantSelections, setAssistantSelections] = React.useState<AssistantSelections>({
    affected: "Só a mim",
    impact: [],
    action: [],
  })

  const handleToggle = (key: keyof Omit<AssistantSelections, "affected">, value: string) => {
    setAssistantSelections((prev) => {
      const list = prev[key]
      const exists = list.includes(value)
      return {
        ...prev,
        [key]: exists ? list.filter((entry) => entry !== value) : [...list, value],
      }
    })
  }

  const handleAffectedChange = (value: string) => {
    setAssistantSelections((prev) => ({ ...prev, affected: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setStatus("sending")
    setTimeout(() => {
      setStatus("success")
      setDescription("")
      setAddress("")
      setNeighborhood("")
      setZip("")
    }, 1000)
  }

  const isSubmitDisabled = description.trim().length < 20 || status === "sending"

  return (
    <div className="min-h-screen bg-[#f6f7f8] pt-6 pb-14 font-['Public Sans',_sans-serif] text-[#111418] dark:bg-[#101922] dark:text-[#f0f2f4]">
      <div className={`${CONTAINER} space-y-6`}>
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e5e7eb] bg-white px-6 py-5 shadow-sm dark:border-[#36414a] dark:bg-[#1b2837]">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#90a4b7]">Registrar Reclamação</p>
            <h1 className="text-4xl font-black tracking-[-0.03em] text-[#111418] dark:text-white">Relate um problema em sua comunidade</h1>
            <p className="text-base text-[#617589] dark:text-[#90a4b7]">
              Use o campo abaixo para descrever o problema ou grave um áudio. Nossa IA fará algumas perguntas para ajudar a completar sua reclamação.
            </p>
          </div>
          <Button asChild className="rounded-lg bg-[#1173d4] px-6 text-sm font-bold text-white hover:bg-[#0f65bb]">
            <Link href="/">Voltar para Top Problemas</Link>
          </Button>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-[#1b2837] lg:flex-row">
          <section className="flex flex-1 flex-col gap-5">
            <label className="flex flex-col gap-2 text-base font-semibold text-[#111418] dark:text-white">
              Descreva o problema
              <textarea
                className="min-h-[220px] rounded-xl border border-[#d6dce5] bg-white px-4 py-3 text-base text-[#111418] placeholder:text-[#8a98ac] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4]"
                placeholder="Descreva o problema que você está enfrentando. Seja o mais detalhado possível."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Endereço">
                <input
                  className="h-12 rounded-lg border border-[#d6dce5] bg-white px-4 text-base text-[#111418] placeholder:text-[#8a98ac] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4]"
                  placeholder="Rua, Av., etc."
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </Field>
              <Field label="Bairro">
                <input
                  className="h-12 rounded-lg border border-[#d6dce5] bg-white px-4 text-base text-[#111418] placeholder:text-[#8a98ac] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4]"
                  placeholder="Seu bairro"
                  value={neighborhood}
                  onChange={(event) => setNeighborhood(event.target.value)}
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="CEP">
                <input
                  className="h-12 rounded-lg border border-[#d6dce5] bg-white px-4 text-base text-[#111418] placeholder:text-[#8a98ac] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4]"
                  placeholder="00000-000"
                  value={zip}
                  onChange={(event) => setZip(event.target.value)}
                />
              </Field>
            </div>

            <div className="flex flex-wrap items-center gap-4 rounded-xl border border-dashed border-[#cad1de] bg-[#f8fafc] px-4 py-3 text-sm text-[#617589] dark:border-[#36414a] dark:bg-[#111c2a]">
              <p className="flex-1">Prefere falar? Clique no microfone para gravar sua reclamação.</p>
              <Button type="button" variant="outline" className="h-12 w-12 rounded-full border-[#1173d4] text-[#1173d4]">
                <Mic className="size-5" />
              </Button>
            </div>

            <Button
              type="submit"
              disabled={isSubmitDisabled}
              className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#1173d4] text-base font-bold text-white hover:bg-[#0f65bb] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  Enviando...
                  <Send className="size-4 animate-pulse" />
                </>
              ) : (
                <>
                  ReclameAI!
                  <Send className="size-4" />
                </>
              )}
            </Button>
            {status === "success" && (
              <p className="text-sm font-medium text-green-600">Reclamação enviada! Nossa IA vai analisar e agrupar casos semelhantes.</p>
            )}
            <p className="text-xs text-[#8a98ac]">Seus dados estão protegidos. Suas informações serão usadas apenas para processar sua reclamação.</p>
          </section>

          <aside className="w-full rounded-2xl border border-[#e3e8ef] bg-[#f9fafb] p-5 dark:border-[#36414a] dark:bg-[#15202b] lg:w-2/5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#111418] dark:text-[#f0f2f4]">
              <Sparkles className="size-4 text-[#1173d4]" />
              Assistente IA
            </div>
            <div className="mt-4 space-y-5">
              <AssistantBlock title="Esse problema afeta você ou outras pessoas?">
                <div className="flex flex-wrap gap-2">
                  {affectedOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                        assistantSelections.affected === option ? "bg-[#1173d4] text-white" : "bg-white text-[#111418]"
                      }`}
                      onClick={() => handleAffectedChange(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </AssistantBlock>
              <AssistantBlock title="Como esse problema afeta sua vida?">
                <div className="flex flex-wrap gap-2">
                  {impactOptions.map((option) => {
                    const active = assistantSelections.impact.includes(option)
                    return (
                      <button
                        key={option}
                        type="button"
                        className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                          active ? "bg-[#1173d4] text-white" : "bg-white text-[#111418]"
                        }`}
                        onClick={() => handleToggle("impact", option)}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </AssistantBlock>
              <AssistantBlock title="O que poderia ser feito?">
                <div className="flex flex-wrap gap-2">
                  {actionOptions.map((option) => {
                    const active = assistantSelections.action.includes(option)
                    return (
                      <button
                        key={option}
                        type="button"
                        className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                          active ? "bg-[#1173d4] text-white" : "bg-white text-[#111418]"
                        }`}
                        onClick={() => handleToggle("action", option)}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </AssistantBlock>
            </div>
          </aside>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2 text-base font-semibold text-[#111418] dark:text-[#f0f2f4]">
      {label}
      {children}
    </label>
  )
}

function AssistantBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-[#617589] dark:text-[#cfd5db]">{title}</p>
      {children}
    </div>
  )
}
