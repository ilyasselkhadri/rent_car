'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] sm:min-h-[700px]
        md:min-h-[800px] overflow-hidden flex items-center justify-center"
    >
      {/* ── Vidéo de fond ── */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videoacceuil.mp4" type="video/mp4" />
          {/* Fallback image si la vidéo ne charge pas */}
          <div className="absolute inset-0 bg-gray-900" />
        </video>
        
        {/* Overlay sombre pour améliorer la lisibilité du texte */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ── Fond animé avec multiples animations (optionnel, à superposer) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* 1. Grille SVG animée (rotation lente) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03] animate-slowSpin"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#c4a35a" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* 2. Orbes de lumière avec animation de pulsation et déplacement */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px]
          bg-[#c4a35a]/5 rounded-full blur-[120px] animate-glowPulse animate-floatSlow" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px]
          bg-[#c4a35a]/3 rounded-full blur-[150px] animate-glowPulse animate-floatSlowReverse" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px]
          bg-gray-100/50 rounded-full blur-[100px] animate-pulseScale" />

        {/* 3. Cercles rotatifs avec animation de scaling */}
        <div className="absolute top-16 left-16 w-32 h-32 sm:w-48 sm:h-48
          border border-[#c4a35a]/10 rounded-full animate-rotateSlow" />
        <div className="absolute bottom-20 right-20 w-48 h-48 sm:w-72 sm:h-72
          border border-[#c4a35a]/8 rounded-full animate-rotateSlow"
          style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
        
        {/* 4. Cercles concentriques supplémentaires */}
        <div className="absolute top-1/2 left-1/3 w-64 h-64 sm:w-96 sm:h-96
          border border-[#c4a35a]/5 rounded-full animate-scalePulse"
          style={{ animationDuration: '30s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 sm:w-56 sm:h-56
          border border-[#c4a35a]/8 rounded-full animate-rotateSlowReverse"
          style={{ animationDuration: '20s' }} />

        {/* 5. Points pulsants */}
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-[#c4a35a]/40 rounded-full animate-ping" />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-[#c4a35a]/30 rounded-full animate-pulse animate-float" />
        <div className="absolute top-2/3 left-1/2 w-1 h-1 bg-[#c4a35a]/25 rounded-full animate-pulse animate-moveX" />
        <div className="hidden md:block absolute top-1/2 left-1/5 w-1 h-1 bg-[#c4a35a]/20 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[#c4a35a]/30 rounded-full animate-bounce" />
        <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-[#c4a35a]/35 rounded-full animate-pulse animate-moveY" />

        {/* 6. Lignes diagonales animées */}
        <div className="absolute top-0 right-[30%] w-[1px] h-full
          bg-gradient-to-b from-transparent via-[#c4a35a]/10 to-transparent animate-scanDown" />
        <div className="absolute top-0 left-[20%] w-[1px] h-full
          bg-gradient-to-b from-transparent via-[#c4a35a]/8 to-transparent animate-scanUp" />
        <div className="absolute top-0 right-[60%] w-[1px] h-full
          bg-gradient-to-b from-transparent via-[#c4a35a]/5 to-transparent animate-scanDown"
          style={{ animationDelay: '1s' }} />

        {/* 7. Particules flottantes */}
        <div className="absolute top-10 left-[15%] w-0.5 h-0.5 bg-[#c4a35a]/20 rounded-full animate-floatParticle" />
        <div className="absolute top-20 right-[25%] w-1 h-1 bg-[#c4a35a]/25 rounded-full animate-floatParticle" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-40 left-[45%] w-0.5 h-0.5 bg-[#c4a35a]/15 rounded-full animate-floatParticle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-60 right-[65%] w-1 h-1 bg-[#c4a35a]/20 rounded-full animate-floatParticle" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-20 left-[75%] w-0.5 h-0.5 bg-[#c4a35a]/25 rounded-full animate-floatParticle" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-[15%] w-1 h-1 bg-[#c4a35a]/20 rounded-full animate-floatParticle" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-80 left-[85%] w-0.5 h-0.5 bg-[#c4a35a]/15 rounded-full animate-floatParticle" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-60 right-[45%] w-1 h-1 bg-[#c4a35a]/20 rounded-full animate-floatParticle" style={{ animationDelay: '3.5s' }} />

        {/* 8. Vagues douces */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#c4a35a]/5 to-transparent animate-wave" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#c4a35a]/3 to-transparent animate-waveReverse" />
      </div>

      {/* ── Overlay gradient avec animation (optionnel) ── */}
      <div className="absolute inset-0 bg-gradient-to-b
        from-black/60 via-black/40 to-black/60 animate-gradientShift" />

      {/* ── Contenu principal ── */}
      <div className="relative z-10 text-center flex flex-col items-center
        px-4 sm:px-6 md:px-8 max-w-5xl mx-auto w-full">

        {/* Titre principal */}
        <h1
          className="font-light leading-[0.95] tracking-wide mb-4 sm:mb-5
            animate-fadeUp px-2"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(3.5rem, 14vw, 7rem)',
            color: '#ffffff',
            letterSpacing: '0.02em',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          <span className="block">La Route,</span>
          <span className="block mt-1">
            <em className="not-italic relative inline-block">
              <span className="relative z-10" style={{ color: '#c4a35a' }}>
                Votre Liberté
              </span>
              {/* Ligne surlignée */}
              <span className="absolute bottom-2 left-0 w-full h-3 sm:h-4
                bg-[#c4a35a]/20 -z-10 animate-scaleIn delay-300 rounded-sm" />
            </em>
          </span>
        </h1>

        {/* Séparateur */}
        <div className="flex items-center gap-3 my-5 sm:my-7 animate-scaleIn delay-400">
          <div className="w-8 sm:w-12 h-[1px] bg-[#c4a35a]/60" />
          <div className="w-1.5 h-1.5 bg-[#c4a35a] rounded-full animate-pulse" />
          <div className="w-8 sm:w-12 h-[1px] bg-[#c4a35a]/60" />
        </div>
        
        {/* Boutons CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3
          sm:gap-4 w-full sm:w-auto animate-fadeIn delay-700 px-4">

          {/* Primaire */}
          <Link
            href="/#contact"
            className="group relative overflow-hidden w-full sm:w-auto
              px-8 sm:px-10 py-3.5 sm:py-4
              bg-[#c4a35a] text-white
              text-xs sm:text-sm tracking-[2px] uppercase font-medium
              hover:shadow-xl hover:shadow-[#c4a35a]/30
              transition-all duration-500 rounded-sm"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Réserver un véhicule
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#d4b574] to-[#b3924a]
              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>

          {/* Secondaire */}
          <Link
            href="/#voitures"
            className="group relative overflow-hidden w-full sm:w-auto
              px-8 sm:px-10 py-3.5 sm:py-4
              border border-white/30 text-white
              text-xs sm:text-sm tracking-[2px] uppercase font-light
              hover:border-[#c4a35a] hover:text-[#c4a35a]
              transition-all duration-500 rounded-sm"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Voir nos voitures
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-[#c4a35a]/20 translate-y-full
              group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>
      </div>

      {/* ── Indicateur scroll ── */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10
        flex flex-col items-center gap-2 animate-fadeIn delay-1000">
        <span className="text-white/70 text-[8px] sm:text-[9px] tracking-[4px] uppercase"
          style={{ fontFamily: 'var(--font-outfit)' }}>
          Découvrir
        </span>
        <div className="relative">
          <div className="w-[1px] h-10 sm:h-14 bg-gradient-to-b
            from-[#c4a35a]/60 to-transparent animate-pulse" />
          <div className="absolute top-2 left-1/2 -translate-x-1/2
            w-1 h-1 bg-[#c4a35a] rounded-full animate-float" />
        </div>
      </div>

      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24
        bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  )
}