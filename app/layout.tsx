import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/CartContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SneakerStore - Boutique de Chaussures Premium",
  description:
    "Découvrez notre collection exclusive de chaussures de sport et baskets de marque. Livraison rapide au Cameroun.",
  keywords: "chaussures, sneakers, baskets, Nike, Adidas, Jordan, Cameroun, Douala, Yaoundé",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
