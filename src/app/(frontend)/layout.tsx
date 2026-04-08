import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './styles.css'  
import Footer from '@/components/Footer'
import FloatingWidgets from '@/components/FloatingWidgets'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['400', '600'],
  variable: '--font-cormorant'
})

const jost = Jost({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500'],
  variable: '--font-jost'
})

export const metadata: Metadata = {
  title: 'Dghmira',
  description: 'Le meilleur burger à Casablanca - Burgers artisanaux préparés avec des ingrédients frais',
  icons: {
    icon: '/dghmira-.png',
    shortcut: '/dghmira-.png',
    apple: '/dghmira-.png',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/dghmira-.png" type="image/png" />
        <link rel="apple-touch-icon" href="/dghmira-.png" />
        <meta name="theme-color" content="#dc2626" />
      </head>
      <body className={`${cormorant.variable} ${jost.variable}`}>
        <Navbar />
        {children}
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  )
}