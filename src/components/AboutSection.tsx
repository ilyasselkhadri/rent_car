'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

// ─── Image sets per section - 5 images each for burger restaurant ────────────────
const missionImages = [
  { src: '/burger1.jpeg', alt: 'Smoky Burger signature' },
  { src: '/burger2.jpeg', alt: 'Burger artisanal avec frites' },
  { src: '/burger3.jpeg', alt: 'Burger double viande' },
  { src: '/burger4.jpeg', alt: 'Burger avec sauce maison' },
  { src: '/burger5.jpeg', alt: 'Assiette de burgers' },
]

const storyImages = [
  { src: '/cuisine1.jpeg', alt: 'Cuisine ouverte et propre' },
  { src: '/cuisine2.PNG', alt: 'Préparation artisanale' },
  { src: '/cuisine3.PNG', alt: 'Ingrédients frais locaux' },
  { src: '/cuisine4.PNG', alt: 'Chef au travail' },
  { src: '/cuisine5.PNG', alt: 'Atmosphère chaleureuse' },
]

const whyImages = [
  { src: '/img5.jpeg', alt: 'Produits locaux marocains' },
  { src: '/img2.jpeg', alt: 'Viande fraîche qualité supérieure' },
  { src: '/img4.jpeg', alt: 'Pain artisanal fait maison' },
  { src: '/img3.jpeg', alt: 'Sauces exclusives' },
  { src: '/img1.jpeg', alt: 'Ingrédients 90% locaux' },
]

// ─── Auto-rotating image carousel ─────────────────────────
function ImageCarousel({ images, interval = 5000 }: { images: { src: string; alt: string }[]; interval?: number }) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((idx: number) => {
    if (animating || idx === current) return
    setPrev(current)
    setCurrent(idx)
    setAnimating(true)
    setTimeout(() => { setPrev(null); setAnimating(false) }, 700)
  }, [animating, current])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % images.length
        setPrev(c)
        setAnimating(true)
        setTimeout(() => { setPrev(null); setAnimating(false) }, 700)
        return next
      })
    }, interval)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [images.length, interval])

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl group" style={{ aspectRatio: '1/1' }}>
      {images.map((img, idx) => (
        <div
          key={img.src}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: idx === current ? 1 : 0,
            transform: idx === current ? 'scale(1.04)' : 'scale(1)',
            transition: idx === current ? 'opacity 0.7s ease, transform 6s ease' : 'opacity 0.7s ease',
            zIndex: idx === current ? 2 : idx === prev ? 1 : 0,
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
          />
        </div>
      ))}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />
      {/* Red border */}
      <div className="absolute inset-0 rounded-2xl z-20 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(239,68,68,0.35)' }} />
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className="rounded-full transition-all duration-300"
            style={{
              width: idx === current ? '24px' : '8px',
              height: '8px',
              background: idx === current ? '#ef4444' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
      {/* Counter */}
      <div className="absolute top-4 right-4 z-30 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white/80 font-medium tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {current + 1} / {images.length}
      </div>
    </div>
  )
}

// ─── Check item ────────────────────────────────────────────
function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-all duration-300 group-hover:scale-110"
        style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)' }}>
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors duration-200" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  )
}

// ─── Main ──────────────────────────────────────────────────
export default function AboutSection() {
  // Stocker les textes avec l'apostrophe normale dans le tableau
  const avantagesItems = [
    "90% d'ingrédients locaux et frais",
    "Cuisson au feu de bois pour un goût unique",
    "Pains faits maison chaque matin",
    "Frites coupées à la main",
    "Sauces exclusives préparées sur place",
    "Livraison rapide via Glovo & Jumia Food",
    "Ouvert 7j/7 de 12h à 23h30",
  ]

  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fdfaf5 0%, #f8f4ed 40%, #fdfcf9 100%)' }}
    >
      {/* Decorative blobs - rouge/orange */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}>
            <span className="border-b-2 border-red-500 pb-1">À propos de nous</span>
          </h2>
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          </div>
        </div>

        {/* ── Section 1 : Mission ── */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5" style={{ background: '#ef4444' }} />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400">Notre mission</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Le vrai goût du <span style={{ color: '#ef4444' }}>fait maison</span>
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>Chez <strong className="text-red-600">Smoky Burgers</strong>, notre mission est simple : vous offrir <strong className="text-gray-800">le meilleur burger artisanal</strong> de Casablanca, préparé avec passion et des ingrédients locaux de première qualité.</p>
              <p>Nous croyons qu&apos;un bon burger se fait avec des produits frais, une viande savoureuse et une sauce qui fait la différence. C&apos;est pourquoi nous utilisons <strong className="text-gray-800">90% d&apos;ingrédients locaux</strong> et préparons tout sur place.</p>
              <p>Notre engagement : vous servir un burger authentique, généreux et savoureux, dans une ambiance chaleureuse et décontractée.</p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <ImageCarousel images={missionImages} interval={5000} />
          </div>
        </div>

        {/* ── Section 2 : Story ── */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-1">
            <ImageCarousel images={storyImages} interval={5000} />
          </div>
          <div className="order-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5" style={{ background: '#ef4444' }} />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400">Notre histoire</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Nés d&apos;une <span style={{ color: '#ef4444' }}>passion</span> pour le burger
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">Smoky Burgers est né d&apos;une passion : celle du burger artisanal et du goût authentique. Après des années à chercher le burger parfait, nous avons décidé de créer le nôtre.</p>
            <p className="text-gray-600 leading-relaxed mb-6">Notre promesse :</p>
            <div className="space-y-3 mb-6">
              <CheckItem text="Burgers 100% faits maison" />
              <CheckItem text="Viande fraîche grillée au feu de bois" />
              <CheckItem text="Pains artisanaux préparés quotidiennement" />
              <CheckItem text="90% d&apos;ingrédients locaux et marocains" />
              <CheckItem text="Commandez sur Glovo, Jumia Food" />
              <CheckItem text="Livraison gratuite" />
            </div>
          </div>
        </div>

        {/* ── Section 3 : Why Us ── */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5" style={{ background: '#ef4444' }} />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400">Nos avantages</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Pourquoi choisir <span style={{ color: '#ef4444' }}>Smoky Burgers ?</span>
            </h3>
            <div className="space-y-4">
              {avantagesItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)' }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200" dangerouslySetInnerHTML={{ __html: item.replace(/'/g, "&apos;") }} />
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "Notre objectif est simple : vous offrir l&apos;expérience burger la plus savoureuse et authentique de Casablanca, à chaque visite. Rejoignez les centaines de clients satisfaits qui font de Smoky Burgers leur restaurant préféré !" }} />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <ImageCarousel images={whyImages} interval={5000} />
          </div>
        </div>

      </div>
    </section>
  )
}