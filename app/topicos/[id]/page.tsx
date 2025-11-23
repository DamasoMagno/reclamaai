"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Topic } from "@/lib/topics"
import { fetchTopicById } from "@/lib/topics-service"
import { formatLocation, formatNumber, formatRelativeDay } from "@/lib/topics"

const CONTAINER = "mx-auto max-w-[1080px] px-4 sm:px-8 lg:px-12"

export default function TopicDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [topic, setTopic] = React.useState<Topic | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!params?.id) return
    setLoading(true)
    fetchTopicById(params.id as string)
      .then((data) => {
        setTopic(data)
        if (!data) {
          setError("Tópico não encontrado.")
        }
      })
      .catch(() => setError("Erro ao carregar o tópico."))
      .finally(() => setLoading(false))
  }, [params?.id])

  const handleShare = React.useCallback(() => {
    if (!topic) return
    const sharePayload = {
      title: topic.title,
      text: topic.summary,
      url: typeof window !== "undefined" ? window.location.href : "",
    }
    if (navigator.share) {
      navigator.share(sharePayload).catch(() => undefined)
    } else if (navigator.clipboard && sharePayload.url) {
      navigator.clipboard.writeText(sharePayload.url).catch(() => undefined)
    }
  }, [topic])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f7f8] py-10">
        <div className={`${CONTAINER} space-y-6`}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-32 animate-pulse rounded-2xl bg-white/60 dark:bg-white/5" />
          ))}
        </div>
      </div>
    )
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-[#f6f7f8] py-10">
        <div className={`${CONTAINER} space-y-4`}>
          <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm font-semibold text-[#1173d4] hover:opacity-80">
            <ArrowLeft className="size-4" />
            Voltar
          </button>
          <div className="rounded-2xl bg-white p-8 text-center text-[#111418] shadow-sm">
            {error ?? "Não encontramos esse tópico."}
          </div>
        </div>
      </div>
    )
  }

  const lastUpdate = new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(topic.lastComplaintAt))

  return (
    <div className="min-h-screen bg-[#f6f7f8] py-10 text-[#111418] dark:bg-[#101922] dark:text-[#f0f2f4]">
      <div className={`${CONTAINER} flex flex-col gap-6 lg:flex-row`}>
        <section className="flex-1 space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#1b2837]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[#617589] dark:text-[#90a4b7]">
                  Localização: {formatLocation(topic.location)} | Status: {topic.status} | Atualizado em: {lastUpdate}
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight">{topic.title}</h1>
              </div>
              <Button variant="outline" className="rounded-full border-[#1173d4] text-[#1173d4]" onClick={handleShare}>
                <Share2 className="mr-2 size-4" />
                Compartilhar Causa
              </Button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <DetailStat label="Categoria" value={topic.category} />
              <DetailStat label="Pessoas Afetadas" value={formatNumber(topic.peopleAffected)} />
              <DetailStat label="Impacto Social" value={topic.socialImpact} highlight />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#1b2837]">
            <h2 className="text-xl font-bold">Descrição Detalhada do Problema</h2>
            <div className="mt-3 space-y-4 text-base text-[#4d5c6c] dark:text-[#cfd5db]">
              {topic.detailedDescription.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#1b2837]">
            <h2 className="text-xl font-bold">Inteligência Cívica: Análise da IA</h2>
            <p className="mt-3 text-[#617589] dark:text-[#90a4b7]">Em breve exibiremos insights da IA para este problema.</p>
            <div className="mt-4 rounded-2xl border border-dashed border-[#d5d9de] p-4 text-sm text-[#90a4b7] dark:border-[#36414a]">
              Dashboard em construção — aguardando integração com a análise automatizada.
            </div>
          </div>

          {topic.impactMetric && (
            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#1b2837]">
              <h3 className="text-sm font-semibold text-[#111418] dark:text-[#f0f2f4]">{topic.impactMetric.label}</h3>
              <p className="text-sm text-[#617589] dark:text-[#90a4b7]">{topic.impactMetric.description}</p>
              <div className="mt-3 h-3 rounded-full bg-[#e1e6ed] dark:bg-[#243244]">
                <div className="h-full rounded-full bg-[#1173d4]" style={{ width: `${Math.round(topic.impactMetric.value * 100)}%` }} />
              </div>
              <p className="mt-1 text-sm font-semibold text-[#1173d4]">{Math.round(topic.impactMetric.value * 100)}%</p>
            </div>
          )}
        </section>

        <aside className="w-full max-w-sm space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#1b2837]">
            <h3 className="text-lg font-bold">Próximos Passos</h3>
            <p className="text-sm text-[#617589] dark:text-[#90a4b7]">Transforme sua reclamação em ação coletiva.</p>
            <div className="mt-4 space-y-3">
              <Button className="w-full rounded-full bg-[#1173d4] text-white hover:bg-[#0f65bb]">Criar abaixo-assinado online</Button>
              <Button variant="outline" className="w-full rounded-full border-[#1173d4] text-[#1173d4]">
                Organizar grupo local
              </Button>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#1b2837]">
            <h3 className="text-lg font-bold">Contate as Autoridades</h3>
            <div className="mt-4 space-y-4">
              {(topic.contacts ?? []).map((contact) => (
                <div key={contact.title} className="rounded-2xl border border-[#e5e7eb] p-4 dark:border-[#36414a]">
                  <p className="text-base font-semibold">{contact.title}</p>
                  <div className="mt-2 space-y-1 text-sm text-[#617589] dark:text-[#90a4b7]">
                    {contact.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-full text-sm">
                      E-mail
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-full text-sm">
                      Ligar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 text-sm text-[#617589] shadow-sm dark:bg-[#1b2837] dark:text-[#90a4b7]">
            Última atualização enviada por cidadãos {formatRelativeDay(topic.lastComplaintAt)}.
          </div>
        </aside>
      </div>
    </div>
  )
}

function DetailStat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border px-4 py-3 ${highlight ? "border-[#f7d3d3] bg-[#fff5f5] text-[#d32f2f]" : "border-[#e5e7eb] bg-[#f9fafb] text-[#111418]"}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#90a4b7]">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  )
}
