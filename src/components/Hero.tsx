'use client'

import Image from 'next/image'
import { MapPin, Star } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const IMAGES = [
  '/page0.jpeg',
  '/page1.jpeg',
  '/page2.jpeg',
  '/page3.jpeg',
  '/page4.jpeg',
  '/page5.jpeg',
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  const goTo = (index: number) => {
    if (index === current || transitioning) return
    setPrev(current)
    setTransitioning(true)
    setCurrent(index)
    setTimeout(() => {
      setPrev(null)
      setTransitioning(false)
    }, 1200)
  }

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      goTo((current + 1) % IMAGES.length)
    }, 6000)
  }

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      const wasMobile = viewportWidth < 768
      const isNowMobile = newWidth < 768
      setViewportWidth(newWidth)
      if (wasMobile !== isNowMobile) {
        setCurrent(0)
        setPrev(null)
        setTransitioning(false)
        resetInterval()
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [viewportWidth])

  useEffect(() => {
    resetInterval()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [current, transitioning])

  const getKenBurns = (index: number) =>
    index % 2 === 0 ? 'kenBurnsIn' : 'kenBurnsOut'

  return (
    <section className="w-full pt-0">
      <style>{`
        @keyframes kenBurnsIn {
          from { transform: scale(1);    opacity: 1; }
          to   { transform: scale(1.12); opacity: 1; }
        }
        @keyframes kenBurnsOut {
          from { transform: scale(1.12); opacity: 1; }
          to   { transform: scale(1);    opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Morphing doux */
        @keyframes morphingTrad {
          0%   { border-radius: 20px; transform: rotate(0deg) scale(1); }
          25%  { border-radius: 28px 20px 28px 20px; transform: rotate(0.5deg) scale(1.01); }
          50%  { border-radius: 20px 28px 20px 28px; transform: rotate(-0.5deg) scale(1.01); }
          75%  { border-radius: 24px; transform: rotate(0.3deg) scale(1.01); }
          100% { border-radius: 20px; transform: rotate(0deg) scale(1); }
        }

        /* Lueur verte et dorée */
        @keyframes glowTrad {
          0% {
            box-shadow:
              0 0 0 0 rgba(61, 122, 53, 0),
              0 0 0 0 rgba(232, 130, 12, 0),
              0 20px 25px -12px rgba(0,0,0,0.3);
          }
          25% {
            box-shadow:
              0 0 15px 4px rgba(61, 122, 53, 0.25),
              0 0 30px 8px rgba(232, 130, 12, 0.2),
              0 25px 35px -12px rgba(0,0,0,0.35);
          }
          50% {
            box-shadow:
              0 0 25px 8px rgba(61, 122, 53, 0.35),
              0 0 50px 15px rgba(232, 130, 12, 0.3),
              0 30px 45px -12px rgba(0,0,0,0.4);
          }
          75% {
            box-shadow:
              0 0 15px 4px rgba(61, 122, 53, 0.25),
              0 0 30px 8px rgba(232, 130, 12, 0.2),
              0 25px 35px -12px rgba(0,0,0,0.35);
          }
          100% {
            box-shadow:
              0 0 0 0 rgba(61, 122, 53, 0),
              0 0 0 0 rgba(232, 130, 12, 0),
              0 20px 25px -12px rgba(0,0,0,0.3);
          }
        }

        /* Flottement 3D */
        @keyframes floatTrad {
          0%   { transform: translateY(0px) translateZ(0px); }
          25%  { transform: translateY(-8px) translateZ(15px); }
          50%  { transform: translateY(0px) translateZ(0px); }
          75%  { transform: translateY(4px) translateZ(8px); }
          100% { transform: translateY(0px) translateZ(0px); }
        }

        /* Dégradé vert et orange */
        @keyframes gradientTrad {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Rotation des particules */
        @keyframes particleRotateTrad {
          0%   { transform: rotate(0deg) scale(1);   opacity: 0.4; }
          50%  { transform: rotate(180deg) scale(1.3); opacity: 0.7; }
          100% { transform: rotate(360deg) scale(1);  opacity: 0.4; }
        }

        /* Logo box traditionnel - version verte */
        .logo-box-trad {
          position: relative;
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(10px);
          animation: floatTrad 4s ease-in-out infinite, glowTrad 3s ease-in-out infinite;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
          perspective: 1000px;
          border: 1px solid rgba(232, 130, 12, 0.3);
        }

        .logo-box-trad::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #2d5a27, #e8820c, #f5a030, #3d7a35, #2d5a27);
          background-size: 300% 300%;
          border-radius: 22px;
          z-index: -1;
          animation: gradientTrad 3s ease infinite, morphingTrad 6s ease-in-out infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .logo-box-trad:hover::before { opacity: 1; }

        .logo-box-trad:hover {
          transform: scale(1.05) translateY(-5px) translateZ(20px);
          background: rgba(255, 255, 255, 1);
          border-color: rgba(232, 130, 12, 0.6);
        }

        .logo-image-trad {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .logo-box-trad:hover .logo-image-trad {
          transform: scale(1.1) rotate(3deg);
          filter: drop-shadow(0 0 6px rgba(61, 122, 53, 0.5));
        }

        /* Gradient texte vert */
        .text-gradient-green {
          background: linear-gradient(135deg, #1a3a16 0%, #2d5a27 25%, #3d7a35 50%, #2d5a27 75%, #1a3a16 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientTrad 3s ease infinite;
        }

        /* Gradient texte orange */
        .text-gradient-orange {
          background: linear-gradient(135deg, #c46a00 0%, #e8820c 25%, #f5a030 50%, #e8820c 75%, #c46a00 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientTrad 2s ease infinite;
        }

        /* Particules décoratives */
        .particle-trad {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(135deg, #3d7a35, #e8820c);
          border-radius: 50%;
          pointer-events: none;
          animation: particleRotateTrad 3s ease-in-out infinite;
        }

        .particle-trad:nth-child(1) { top: -8px; left: 20%; animation-delay: 0s; }
        .particle-trad:nth-child(2) { bottom: -8px; right: 20%; animation-delay: 0.5s; width: 5px; height: 5px; }
        .particle-trad:nth-child(3) { top: 30%; right: -12px; animation-delay: 1s; width: 3px; height: 3px; }
        .particle-trad:nth-child(4) { bottom: 30%; left: -12px; animation-delay: 1.5s; width: 4px; height: 4px; }
        .particle-trad:nth-child(5) { top: -4px; right: 40%; animation-delay: 0.8s; width: 3px; height: 3px; }

        /* Ripple */
        @keyframes rippleTrad {
          0%   { box-shadow: 0 0 0 0 rgba(232, 130, 12, 0.5); opacity: 1; }
          100% { box-shadow: 0 0 0 20px rgba(232, 130, 12, 0); opacity: 0; }
        }

        .logo-box-trad:active::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          animation: rippleTrad 0.6s ease-out;
          pointer-events: none;
        }

        /* Motif zellige en overlay - version vert/orange */
        .hero-zellige-overlay {
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23e8820c' stroke-width='0.3' opacity='0.1'%3E%3Cpolygon points='40,4 76,19 76,61 40,76 4,61 4,19'/%3E%3Cpolygon points='40,16 60,28 60,52 40,64 20,52 20,28'/%3E%3Ccircle cx='40' cy='40' r='8'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 60px 60px;
          pointer-events: none;
        }
      `}</style>

      <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] overflow-visible">

        {/* Slideshow */}
        <div className="absolute inset-0 overflow-hidden">

          {/* Image précédente — fade out */}
          {prev !== null && (
            <div
              className="absolute inset-0"
              style={{ animation: 'fadeOut 1.2s ease forwards', zIndex: 1 }}
            >
              <Image
                key={`prev-${prev}`}
                src={IMAGES[prev]}
                alt=""
                fill
                className="object-cover"
                style={{ animation: `${getKenBurns(prev)} 6s ease forwards` }}
              />
            </div>
          )}

          {/* Image courante — fade in + Ken Burns */}
          <div
            className="absolute inset-0"
            style={{
              animation: transitioning ? 'fadeIn 1.2s ease forwards' : 'none',
              zIndex: 2,
            }}
          >
            <Image
              key={`current-${current}`}
              src={IMAGES[current]}
              alt={`Dghmira slide ${current + 1}`}
              fill
              priority={current === 0}
              className="object-cover"
              style={{ animation: `${getKenBurns(current)} 6s ease forwards` }}
            />
          </div>

          {/* Overlay — tons verts */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(45,90,39,0.25) 0%, rgba(0,0,0,0.45) 50%, rgba(61,122,53,0.15) 100%)',
              zIndex: 3,
            }}
          />
          
          {/* Motif zellige décoratif */}
          <div className="hero-zellige-overlay absolute inset-0 z-[4]" />
        </div>

        {/* Contenu centré — style traditionnel sans brun */}
        <div
          className="relative flex flex-col items-center justify-center h-full gap-2 text-white px-4"
          style={{ zIndex: 10 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#e8820c]/60 text-xs tracking-[6px]">✻</span>
            <span className="text-[#e8820c]/40 text-[10px] tracking-[4px]">BIENVENUE</span>
            <span className="text-[#e8820c]/60 text-xs tracking-[6px]">✻</span>
          </div>
          <h1
            className="font-black text-3xl sm:text-4xl md:text-5xl tracking-[6px] drop-shadow-lg italic"
            style={{ fontFamily: '"Times New Roman", Times, serif', letterSpacing: '6px' }}
          >
            D<span style={{ color: '#f5a030' }}>g</span>hmira
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 px-3 py-1 rounded-sm"
              style={{ background: '#3d7a35', border: '1px solid #e8820c' }}>
              <Star size={13} fill="#f5a030" stroke="#f5a030" />
              <span className="text-white text-sm font-bold tracking-wide">4.8</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1">
              <MapPin size={14} className="shrink-0" style={{ color: '#f5a030' }} />
              <span className="text-white/90 text-sm sm:text-base font-medium drop-shadow tracking-wide">
                Casablanca, Maroc
              </span>
            </div>
          </div>
        </div>

        {/* Logo box traditionnel - version verte */}
        <div className="absolute bottom-0 left-10 sm:left-16 translate-y-1/2" style={{ zIndex: 20 }}>
          <div className="logo-box-trad rounded-2xl shadow-2xl w-[115px] h-[125px] sm:w-[135px] sm:h-[150px] flex flex-col items-center justify-center gap-0.5 px-3 py-4">
            <div className="particle-trad"></div>
            <div className="particle-trad"></div>
            <div className="particle-trad"></div>
            <div className="particle-trad"></div>
            <div className="particle-trad"></div>

            <div className="relative w-16 h-16 sm:w-20 sm:h-20 logo-image-trad">
              <Image src="/dghmira-.png" alt="Logo Dghmira" fill className="object-contain" />
            </div>
            <span
              className="text-gradient-green font-black text-xs sm:text-sm tracking-[3px] uppercase leading-none"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              D<span className="text-gradient-orange">g</span>hmira
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#e8820c]/40 to-transparent my-0.5" />
            <span
              className="text-gray-400 text-[7px] tracking-[3px] uppercase mt-0.5"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Restaurant
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}