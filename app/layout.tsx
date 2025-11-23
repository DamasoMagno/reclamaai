import type { Metadata } from "next"
import { Public_Sans } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Participa+ | Radar de Problemas Públicos",
  description: "Acompanhe e vote nos principais problemas da sua cidade enviados por cidadãos.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${publicSans.variable} bg-[#f6f7f8] text-[#111418] antialiased`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
