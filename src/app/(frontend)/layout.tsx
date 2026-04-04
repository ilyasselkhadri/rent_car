import { ReactNode } from 'react'
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${cormorant.variable} ${jost.variable}`}>
        <Navbar />
        {children}
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  )
}