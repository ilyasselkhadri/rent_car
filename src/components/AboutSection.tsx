'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Image sets per section - 5 images each ────────────────────────────────
const missionImages = [
  { src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop', alt: 'Flotte moderne de voitures à Marrakech' },
  { src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop', alt: 'Voiture de luxe Mercedes' },
  { src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop', alt: 'Voiture sportive BMW' },
  { src: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop', alt: 'Audi Q5 neuve' },
  { src: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop', alt: 'Intérieur luxueux voiture' },
]

const storyImages = [
  { src: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=600&fit=crop', alt: 'Accueil client personnalisé' },
  { src: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop', alt: 'Marrakech ville moderne' },
  { src: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=600&fit=crop', alt: 'Équipe professionnelle' },
  { src: 'https://images.unsplash.com/photo-1559521783-1d1599583485?w=800&h=600&fit=crop', alt: 'Service client de qualité' },
  { src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop', alt: 'Remise des clés satisfaite' },
]

const whyImages = [
  { src: 'https://greenwichfirst.com/wp-content/uploads/2023/04/man-in-the-drivers-seat-of-his-new-car.jpg', alt: 'Voiture de luxe haut de gamme' },
  { src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop', alt: 'Véhicule premium sur la route' },
  { src: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&h=600&fit=crop', alt: 'Road trip au Maroc' },
  { src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop', alt: 'Voiture moderne Marrakech' },
  { src: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop', alt: 'Voiture sportive sur route' },
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
    <div className="relative rounded-2xl overflow-hidden shadow-2xl group" style={{ aspectRatio: '4/3' }}>
      {images.map((img, idx) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: idx === current ? 1 : 0,
            transform: idx === current ? 'scale(1.04)' : 'scale(1)',
            transition: idx === current ? 'opacity 0.7s ease, transform 6s ease' : 'opacity 0.7s ease',
            zIndex: idx === current ? 2 : idx === prev ? 1 : 0,
          }}
        />
      ))}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />
      {/* Gold border */}
      <div className="absolute inset-0 rounded-2xl z-20 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(196,163,90,0.35)' }} />
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
              background: idx === current ? '#c4a35a' : 'rgba(255,255,255,0.5)',
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
        style={{ background: 'linear-gradient(135deg, #c4a35a, #e6c97a)' }}>
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors duration-200">{text}</span>
    </div>
  )
}

// ─── Main ──────────────────────────────────────────────────
export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fdfaf5 0%, #f8f4ed 40%, #fdfcf9 100%)' }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,163,90,0.06) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,163,90,0.04) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}>
            <span className="border-b-2 border-[#c4a35a] pb-1">À propos de nous</span>
          </h2>
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c4a35a]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c4a35a]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c4a35a]" />
          </div>
        </div>

        {/* ── Section 1 : Mission ── */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5" style={{ background: '#c4a35a' }} />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400">Notre mission</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Votre partenaire <span style={{ color: '#c4a35a' }}>mobilité</span> à Marrakech
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>Chez <strong className="text-gray-800">Imperial-Car Rental</strong>, notre mission est simple : rendre la location de voiture à Marrakech <strong className="text-gray-800">rapide, transparente et accessible</strong> à tous.</p>
              <p>Que vous soyez résident, voyageur d&apos;affaires ou touriste, nous mettons à votre disposition une flotte moderne et un service client réactif, disponible <strong className="text-gray-800">de 9h à 23h</strong>.</p>
              <p>Nous comprenons que la mobilité au Maroc est essentielle. C&apos;est pourquoi nous avons bâti un service fiable, flexible et sans stress, avec une présence privilégiée dans le quartier de <strong className="text-gray-800">l&apos;Hivernage</strong>.</p>
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
              <div className="w-8 h-0.5" style={{ background: '#c4a35a' }} />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400">Notre histoire</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Nés d&apos;un besoin <span style={{ color: '#c4a35a' }}>réel</span>
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">Imperial-Car Rental est né d&apos;un constat simple : la location de voiture à Marrakech est souvent compliquée, peu claire et manquant de transparence.</p>
            <p className="text-gray-600 leading-relaxed mb-6">Notre objectif était de construire une agence différente :</p>
            <div className="space-y-3 mb-6">
              <CheckItem text="Des tarifs clairs et sans surprises" />
              <CheckItem text="Une réservation rapide et intuitive via WhatsApp" />
              <CheckItem text="Un support humain, chaleureux et disponible 9h-23h" />
            </div>
          </div>
        </div>

        {/* ── Section 3 : Why Us ── */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5" style={{ background: '#c4a35a' }} />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-400">Nos avantages</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Pourquoi choisir <span style={{ color: '#c4a35a' }}>Imperial-Car Rental ?</span>
            </h3>
            <div className="space-y-4">
              {[
                "Réservation rapide via WhatsApp : +212665171827",
                "Assurance tous risques incluse",
                "Service client disponible 9h à 23h",
                "Accueil professionnel et personnalisé",
                "Livraison à l'aéroport, hôtel ou domicile",
                "Agence située dans le quartier de l'Hivernage",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #c4a35a, #e6c97a)' }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-sm leading-relaxed">Notre objectif est simple : vous offrir la meilleure expérience de location possible, à chaque trajet, à Marrakech.</p>
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