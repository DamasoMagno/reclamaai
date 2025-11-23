import Link from "next/link"
import { Button } from "@/components/ui/button"

const links = [
  { href: "/", label: "Início" },
  { href: "/reclamacao", label: "Nova Reclamação" },
  { href: "#minhas", label: "Minhas Reclamações" },
  { href: "#mapa", label: "Mapa de Problemas" },
]

export function SiteHeader() {
  return (
    <header className="border-b border-[#e5e7eb] bg-white/95 backdrop-blur dark:border-[#36414a] dark:bg-[#101922]/90">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3 text-[#0b1520] dark:text-white">
          <div className="size-9 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 p-1.5 shadow-md">
            <svg
              className="text-white"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              <path d="M13.5 8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path>
              <path d="M10.5 8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path>
              <path d="M10.5 11.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path>
              <path d="M13.5 11.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path>
              <path d="M12 10v.01"></path>
              <path d="m15 7-1.5 1.5"></path>
              <path d="m9 7 1.5 1.5"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold leading-tight tracking-[-0.015em]">
              <span>Reclame</span>
              <span className="bg-gradient-to-br from-green-400 to-blue-500 bg-clip-text text-transparent">AI</span>
              <span>!</span>
            </h1>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[#111418] dark:text-[#f0f2f4] md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[#1173d4]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" className="h-9 px-3 text-sm font-semibold text-[#1173d4]">
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="hidden h-9 rounded-full bg-[#1173d4] px-5 text-sm font-semibold text-white hover:bg-[#0f65bb] md:inline-flex"
          >
            <Link href="/reclamacao">Registrar Reclamação</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
