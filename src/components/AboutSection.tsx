'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { Flame, Clock, Truck, Award, MapPin, Phone } from 'lucide-react'

// ─── Image sets per section ────────────────
const missionImages = [
  { src: '/img2.jpeg', alt: 'Tajine traditionnel marocain' },
  { src: '/img7.jpeg', alt: 'Couscous royal' },
  { src: '/img12.jpeg', alt: 'Pastilla marocaine' },
  { src: '/img13.jpeg', alt: 'Mechoui traditionnel' },
  { src: '/img15.jpeg', alt: 'Thé à la menthe et pâtisseries' },
]

const storyImages = [
  { src: '/img1.jpeg', alt: 'Cuisine marocaine authentique' },
  { src: '/img11.jpeg', alt: 'Préparation artisanale' },
  { src: '/img5.jpeg', alt: 'Épices marocaines' },
  { src: '/img4.jpeg', alt: 'Chef au travail' },
  { src: '/img9.jpeg', alt: 'Atmosphère chaleureuse' },
]

const whyImages = [
  { src: '/img3.jpeg', alt: 'Produits locaux marocains' },
  { src: '/img14.jpeg', alt: 'Viande halal qualité supérieure' },
  { src: '/img8.jpeg', alt: 'Pain artisanal fait maison' },
  { src: '/img6.jpeg', alt: 'Recettes traditionnelles' },
  { src: '/img10.jpeg', alt: 'Épices authentiques' },
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
      {/* Orange border */}
      <div className="absolute inset-0 rounded-2xl z-20 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(232,130,12,0.35)' }} />
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
              background: idx === current ? '#e8820c' : 'rgba(255,255,255,0.5)',
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
        style={{ background: 'linear-gradient(135deg, #3d7a35, #e8820c)' }}>
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
  const avantagesItems = [
    "100% fait maison avec des recettes traditionnelles",
    "Épices authentiques venues des souks marocains",
    "Pains et pâtisseries préparés chaque matin",
    "Viande halal de première qualité",
    "Plats cuisinés avec amour comme à la maison",
    "Livraison rapide partout à Casablanca",
    "Ouvert 7j/7 de 12h à 23h",
  ]

  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fdfaf5 0%, #f8f4ed 40%, #fdfcf9 100%)' }}
    >
      {/* Decorative blobs - vert/orange */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(61,122,53,0.06) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,130,12,0.04) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      {/* Motif zellige décoratif */}
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%233d7a35' stroke-width='0.5'%3E%3Cpolygon points='30,3 57,16.5 57,43.5 30,57 3,43.5 3,16.5'/%3E%3Cpolygon points='30,12 48,21 48,39 30,48 12,39 12,21'/%3E%3Ccircle cx='30' cy='30' r='6'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="text-[#e8820c] text-xl">✻</span>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400">L'Âme du Maroc</span>
            <span className="text-[#e8820c] text-xl">✻</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: '"Times New Roman", Times, serif', letterSpacing: '2px' }}>
            <span className="border-b-2 border-[#e8820c] pb-2">À propos de Dghmira</span>
          </h2>
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3d7a35]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#e8820c]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#3d7a35]" />
          </div>
        </div>

        {/* ── Section 1 : Mission ── */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5" style={{ background: '#e8820c' }} />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400">Notre mission</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              L'âme du Maroc <span style={{ color: '#e8820c' }}>à chaque bouchée</span>
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>Chez <strong className="text-[#3d7a35]">Dghmira</strong>, notre mission est simple : vous offrir <strong className="text-gray-800">le meilleur de la cuisine marocaine traditionnelle</strong>, préparée avec passion et des ingrédients locaux de première qualité.</p>
              <p>Nous croyons que la vraie cuisine marocaine se fait avec des produits frais, des épices authentiques et beaucoup d'amour. C'est pourquoi nous utilisons <strong className="text-gray-800">100% d'ingrédients locaux</strong> et préparons tout sur place comme à la maison.</p>
              <p>Notre engagement : vous faire voyager au cœur du Maroc à travers des plats généreux, savoureux et authentiques, dans une ambiance chaleureuse et traditionnelle.</p>
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
              <div className="w-8 h-0.5" style={{ background: '#e8820c' }} />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400">Notre histoire</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              Nés d'une <span style={{ color: '#e8820c' }}>passion</span> pour la tradition
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">Dghmira est né d'une passion : celle de la cuisine marocaine authentique et du goût d'antan. Après des années à chercher les saveurs de notre enfance, nous avons décidé de les recréer pour vous.</p>
            <p className="text-gray-600 leading-relaxed mb-6">Notre promesse :</p>
            <div className="space-y-3 mb-6">
              <CheckItem text="Plats 100% faits maison" />
              <CheckItem text="Recettes traditionnelles marocaines" />
              <CheckItem text="Épices authentiques des souks" />
              <CheckItem text="100% d'ingrédients locaux" />
              <CheckItem text="Commandez sur Glovo & Jumia Food" />
              <CheckItem text="Livraison gratuite à Casablanca" />
            </div>
          </div>
        </div>

        {/* ── Section 3 : Why Us ── */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5" style={{ background: '#e8820c' }} />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400">Nos avantages</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              Pourquoi choisir <span style={{ color: '#e8820c' }}>Dghmira ?</span>
            </h3>
            <div className="space-y-4">
              {avantagesItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #3d7a35, #e8820c)' }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200" dangerouslySetInnerHTML={{ __html: item.replace(/'/g, "&apos;") }} />
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-sm leading-relaxed">Notre objectif est simple : vous offrir l'expérience culinaire marocaine la plus authentique et savoureuse de Casablanca, à chaque visite. Rejoignez les milliers de clients satisfaits qui font de Dghmira leur restaurant préféré !</p>
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