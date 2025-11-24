"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { TopicsFilterBar } from "@/components/topics-filter-bar";
import { TopicCard } from "@/components/topic-card";
import type { Topic, TopicsFilters } from "@/lib/topics";
import { fetchTopics, voteTopic, addComment } from "@/lib/topics-service";
import { api } from "./services/api";
import { SiteHeader } from "@/components/site-header";

const initialFilters: TopicsFilters = {
  category: "todos",
  state: "",
  city: "",
  search: "",
};

const currentUser = {
  id: "anon-user",
  name: "Cidadão visitante",
};

interface Problem {
  id: string;
  location: string;
  recurrence: string;
  status: string;
}

export default function HomePage() {
  const [problems, setProblems] = useState<{ problems: Problem[] }>({
    problems: [],
  });

  const [topics, setTopics] = useState<Topic[]>([]);
  const [filters, setFilters] = useState<TopicsFilters>(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userVotes, setUserVotes] = useState<
    Record<string, "support" | "reject">
  >({});
  const [expandedExamples, setExpandedExamples] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    let isMounted = true;
    fetchTopics()
      .then((data) => {
        if (!isMounted) return;
        setTopics(data);
        if (data.length) {
          setFilters((prev) =>
            prev.state ? prev : { ...prev, state: data[0].location.state }
          );
        }
      })
      .catch(() => setError("Não foi possível carregar os tópicos."))
      .finally(() => setLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(topics.map((topic) => topic.category))),
    [topics]
  );

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => {
      if (filters.category !== "todos" && topic.category !== filters.category)
        return false;
      if (filters.state && topic.location.state !== filters.state) return false;
      if (filters.city) {
        const cityValue = (topic.location.city ?? "").toLowerCase();
        if (!cityValue.includes(filters.city.toLowerCase())) return false;
      }
      if (filters.search) {
        const term = filters.search.toLowerCase();
        const haystack = `${topic.title} ${topic.summary} ${topic.tags.join(
          " "
        )}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [topics, filters]);

  const handleVote = useCallback(
    async (topicId: string, type: "support" | "reject") => {
      if (userVotes[topicId]) return;
      setUserVotes((prev) => ({ ...prev, [topicId]: type }));
      setTopics((prev) =>
        prev.map((topic) => {
          if (topic.id !== topicId) return topic;
          return type === "support"
            ? { ...topic, supportCount: topic.supportCount + 1 }
            : { ...topic, rejectCount: topic.rejectCount + 1 };
        })
      );
      try {
        await voteTopic(topicId, type);
      } catch (err) {
        console.error(err);
        setError("Não foi possível registrar seu voto.");
      }
    },
    [userVotes]
  );

  const handleAddComment = useCallback(
    async (topicId: string, text: string) => {
      try {
        const newComment = await addComment(topicId, {
          author: { id: currentUser.id, name: currentUser.name },
          text,
        });
        setTopics((prev) =>
          prev.map((topic) => {
            if (topic.id !== topicId) return topic;
            return { ...topic, comments: [...topic.comments, newComment] };
          })
        );
      } catch (err) {
        console.error(err);
        setError("Não foi possível enviar o comentário.");
      }
    },
    []
  );

  const handleFilterChange = useCallback(
    (key: keyof TopicsFilters, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleExamples = (topicId: string) => {
    setExpandedExamples((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  useEffect(() => {
    async function getProblems() {
      try {
        const response = await api.get("/problem");
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getProblems();
  }, []);

  console.log(problems);

  return (
    <>
      <SiteHeader />
      <div className="min-h-screen bg-[#f6f7f8] font-['Public Sans',_sans-serif] text-[#111418] dark:bg-[#101922] dark:text-[#f0f2f4]">
        <div className="flex justify-center px-4 pb-16 pt-6 sm:px-8 md:px-16 lg:px-24 xl:px-40">
          <div className="flex w-full max-w-[960px] flex-col">
            <main className="mt-6 flex flex-col gap-6">
              <HeroSection title={buildHeroTitle(filters)} />
              <TopicsFilterBar
                filters={filters}
                categories={categories}
                onChange={handleFilterChange}
              />
              {error && (
                <p className="px-4 text-sm font-semibold text-red-600">
                  {error}
                </p>
              )}
              {loading ? (
                <section className="grid gap-4 p-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-48 animate-pulse rounded-xl bg-white/60 dark:bg-white/5"
                    />
                  ))}
                </section>
              ) : (
                <section className="grid grid-cols-1 gap-6 p-4">
                  {filteredTopics.map((topic) => (
                    <TopicCard
                      key={topic.id}
                      topic={topic}
                      userVote={userVotes[topic.id]}
                      showExamples={Boolean(expandedExamples[topic.id])}
                      onToggleExamples={toggleExamples}
                      onVote={handleVote}
                      onAddComment={handleAddComment}
                      currentUserName={currentUser.name}
                    />
                  ))}
                  {filteredTopics.length === 0 && !loading && (
                    <div className="rounded-xl border border-dashed border-[#d5d9de] bg-white px-8 py-10 text-center text-[#617589] dark:border-[#36414a] dark:bg-[#1b2837]">
                      Nenhum tópico encontrado para os filtros atuais.
                    </div>
                  )}
                </section>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

function buildHeroTitle(filters: TopicsFilters) {
  if (filters.city) return `Top Problemas ${filters.city}`;
  if (filters.state) return `Top Problemas ${filters.state}`;
  return "Top Problemas Itapipoca";
}

function HeroSection({ title }: { title: string }) {
  return (
    <section className="flex flex-wrap items-start justify-between gap-4 p-4">
      <div className="min-w-72 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#90a4b7]">
          Ranking Cívico
        </p>
        <h1 className="text-4xl font-black tracking-[-0.033em] text-[#111418] dark:text-[#f0f2f4]">
          {title}
        </h1>
        <p className="text-base text-[#617589] dark:text-[#90a4b7]">
          Tópicos gerados por IA a partir de reclamações de cidadãos. Seu voto
          ajuda a definir prioridades.
        </p>
      </div>
      <Link
        href="/reclamacao"
        className="flex items-center justify-center gap-2 rounded-lg bg-[#1173d4] px-6 py-2.5 text-base font-bold text-white hover:bg-[#0f65bb]"
      >
        <PlusCircle className="size-5" />
        Nova Reclamação
      </Link>
    </section>
  );
}
