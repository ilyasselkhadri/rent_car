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
  title: 'rent_car_marrakech',
  description: 'Le meilleur choix pour louer une voiture à Marrakech. Découvrez notre large sélection de véhicules, des berlines élégantes aux SUV spacieux, tous disponibles à des prix compétitifs. Réservez dès maintenant et profitez de votre séjour à Marrakech avec style et confort.',
  icons: {
    icon: '/rentalcar.png',
    shortcut: '/rentalcar.png',
    apple: '/rentalcar.png',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/rentalcar.png" type="image/png" />
        <link rel="apple-touch-icon" href="/rentalcar.png" />
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