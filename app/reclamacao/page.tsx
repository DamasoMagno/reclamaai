"use client";

import { useEffect, useState } from "react";
import { Send, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "../../services/api";
import { useRouter } from "next/navigation";

const CONTAINER = "mx-auto w-full max-w-4xl px-4";

export default function ComplaintPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  const [subcategories, setSubcategories] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);

  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [location, setLocation] = useState("");
  const [impact, setImpact] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting complaint...", subcategory);
      const response = await api.post("/problem", {
        subcategoryId: subcategory,
        location,
        recurrence,
        impact,
      });

      const data = response.data;
      console.log("Problem created with ID:", data);

      await api.post("/comment", {
        problemId: data.problemId,
        content: description,
      });

      setTimeout(() => {
        setStatus("success");
        setCategory("");
        setLocation("");
        setRecurrence("");
        setImpact("");
        setDescription("");
        setLoading(false);
      }, 1000);

      router.replace("/");
    } catch (error) {
      console.log("Error submitting complaint:", error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   async function fetchSubcategories() {
  //     try {
  //       const response = await api.get(`/subcategory`);
  //       setSubcategories(response.data.subcategories);
  //     } catch (error) {
  //       console.log("Error fetching subcategories:", error);
  //     }
  //   }

  //   fetchSubcategories();
  // }, [category]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await api.get(`/category`);
        console.log(response.data);

        const subCategories = response.data.categories
          .map(
            (cat: {
              id: string;
              name: string;
              subcategories: { id: string; name: string }[];
            }) => cat.subcategories
          )
          .flat();

        setSubcategories(subCategories);
        setCategories(response.data.categories);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, [category]);

  // console.log("Subcategories:", subcategories);
  // console.log("Subcategories:", subcategories);

  // const isSubmitDisabled =
  //   !category ||
  //   !location ||
  //   !recurrence ||
  //   description.trim().length < 20 ||
  //   loading;

  return (
    <div className="min-h-screen bg-[#f6f7f8] font-['Public Sans',_sans-serif] text-[#111418] dark:bg-[#101922] dark:text-[#f0f2f4]">
      <div className={`${CONTAINER} py-8 space-y-6`}>
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-[#111418] dark:text-white">
            Registre sua Reclamação
          </h1>
          <p className="text-base text-[#617589] dark:text-[#90a4b7]">
            Preencha os campos obrigatórios abaixo para nos ajudar a resolver o
            problema.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-[#1b2837] space-y-6">
          <Field label="Categoria do Problema *" required>
            <select
              className="h-12 rounded-lg border border-[#d6dce5] bg-white px-4 text-base text-[#111418] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4]"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              {categories?.map((cat: { id: string; name: string }) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
              {/* <option value="">Selecione a categoria</option>
              <option value="infraestrutura">Infraestrutura</option>
              <option value="saneamento">Saneamento</option>
              <option value="seguranca">Segurança</option>
              <option value="saude">Saúde</option>
              <option value="educacao">Educação</option>
              <option value="transporte">Transporte</option>
              <option value="meio-ambiente">Meio Ambiente</option>
              <option value="outros">Outros</option> */}
            </select>
          </Field>

          <Field label="Subcategoria do problema *" required>
            <select
              className="h-12 rounded-lg border border-[#d6dce5] bg-white px-4 text-base text-[#111418] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4]"
              value={subcategory}
              onChange={(event) => setSubcategory(event.target.value)}
              required
            >
              {subcategories?.map((subcat: { id: string; name: string }) => (
                <option key={subcat.id} value={subcat.id}>
                  {subcat.name}
                </option>
              ))}
              {/* <option value="">Selecione a categoria</option>
              <option value="infraestrutura">Infraestrutura</option>
              <option value="saneamento">Saneamento</option>
              <option value="seguranca">Segurança</option>
              <option value="saude">Saúde</option>
              <option value="educacao">Educação</option>
              <option value="transporte">Transporte</option>
              <option value="meio-ambiente">Meio Ambiente</option>
              <option value="outros">Outros</option> */}
            </select>
          </Field>

          <Field label="Localização Exata *" required>
            <div className="relative">
              <input
                className="h-12 w-full rounded-lg border border-[#d6dce5] bg-white pl-4 pr-10 text-base text-[#111418] placeholder:text-[#8a98ac] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4]"
                placeholder="Digite o bairro"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                required
              />
              <MapPin className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#8a98ac]" />
            </div>
          </Field>

          <Field label="Impacto *" required>
            <select
              className="h-12 rounded-lg border border-[#d6dce5] bg-white px-4 text-base text-[#111418] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4]"
              value={recurrence}
              onChange={(event) => setImpact(event.target.value)}
              required
            >
              <option value="">Informe o impacto</option>
              <option value="CITY">Cidade</option>
              <option value="NEIGHBORHOOD">Bairro</option>
              <option value="STREET">Rua</option>
            </select>
          </Field>

          <Field label="Recorrência *" required>
            <select
              className="h-12 rounded-lg border border-[#d6dce5] bg-white px-4 text-base text-[#111418] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4]"
              value={recurrence}
              onChange={(event) => setRecurrence(event.target.value)}
              required
            >
              <option value="">Selecione a frequência</option>
              <option value="ALWAYS">Sempre</option>
              <option value="SOMETIMES">Algumas vezes</option>
              <option value="FIRST">Primeira vez</option>
            </select>
          </Field>

          <Field label="Descreva seu problema *" required>
            <textarea
              className="min-h-[180px] rounded-xl border border-[#d6dce5] bg-white px-4 py-3 text-base text-[#111418] placeholder:text-[#8a98ac] focus-visible:ring-2 focus-visible:ring-[#1173d4] focus-visible:outline-none dark:border-[#36414a] dark:bg-[#111c2a] dark:text-[#f0f2f4] resize-none"
              placeholder="Seja detalhado. Clique no ícone ✨ para receber ajuda da nossa IA."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </Field>

          <Button
            onClick={handleSubmit}
            // disabled={isSubmitDisabled}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1173d4] text-base font-bold text-white hover:bg-[#0f65bb] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
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
            <p className="text-center text-sm font-medium text-green-600">
              Reclamação enviada com sucesso! Nossa equipe irá analisar seu
              caso.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2 text-base font-semibold text-[#111418] dark:text-[#f0f2f4]">
      {label}
      {children}
    </label>
  );
}
