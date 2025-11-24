"use client"

import { ChevronDown, Search } from "lucide-react"
import type { TopicsFilters } from "@/lib/topics"

type Props = {
  filters: TopicsFilters
  categories: string[]
  onChange: (key: keyof TopicsFilters, value: string) => void
}

const fallbackCategories = ["Segurança", "Infraestrutura", "Transporte", "Educação"]

export function TopicsFilterBar({ filters, categories, onChange }: Props) {
  const categoryItems = ["todos", ...(categories.length ? categories : fallbackCategories)]

  const handleSearchChange = (value: string) => {
    onChange("city", value)
    onChange("search", value)
  }

  return (
    <section className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-lg border border-[#f0f2f4] bg-white px-4 text-sm font-medium text-[#111418]"
        >
          Categorias
          <ChevronDown className="size-4 text-[#617589]" />
        </button>
        {categoryItems.map((category) => {
          const active = filters.category === category
          return (
            <button
              key={category}
              className={`flex h-10 items-center rounded-lg px-4 text-sm font-medium ${
                active
                  ? "border border-[#1173d4]/40 bg-[#1173d4]/20 text-[#1173d4]"
                  : "border border-[#f0f2f4] bg-white text-[#111418]"
              }`}
              onClick={() => onChange("category", category)}
              type="button"
            >
              {category === "todos" ? "Todas" : category}
            </button>
          )
        })}
      </div>
      <div className="flex-grow">
        <label className="flex h-10 w-full items-center rounded-lg border border-[#f0f2f4] bg-white px-4 text-sm text-[#111418]">
          <Search className="mr-3 size-4 text-[#90a4b7]" />
          <input
            className="h-full w-full border-none bg-transparent text-sm text-[#111418] placeholder:text-[#617589] focus:outline-none"
            placeholder="Buscar por cidade..."
            type="text"
            value={filters.city}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
        </label>
      </div>
    </section>
  )
}
