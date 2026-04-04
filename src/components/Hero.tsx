'use client'

import Image from 'next/image'
import { MapPin, Star } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const IMAGES = [
  '/herosmokyburgers.png',
  '/img1.jpeg',
  '/img2.jpeg',
  '/img3.jpeg',
  '/img4.jpeg',
  '/img5.jpeg',
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

  // Nettoyer et redémarrer l'intervalle
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      goTo((current + 1) % IMAGES.length)
    }, 6000)
  }

  // Détecter les changements de taille d'écran
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      const wasMobile = viewportWidth < 768
      const isNowMobile = newWidth < 768
      
      setViewportWidth(newWidth)
      
      // Si on passe de mobile à desktop ou vice-versa
      if (wasMobile !== isNowMobile) {
        // Réinitialiser l'état du carrousel
        setCurrent(0)
        setPrev(null)
        setTransitioning(false)
        
        // Redémarrer l'intervalle
        resetInterval()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [viewportWidth])

  // Gestion de l'intervalle principal
  useEffect(() => {
    resetInterval()
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [current, transitioning])

  // Alterne zoom-in / zoom-out selon l'index
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
        
        /* Animations ultra modernes */
        @keyframes morphing {
          0% {
            border-radius: 20px;
            transform: rotate(0deg) scale(1);
          }
          25% {
            border-radius: 30px 20px 30px 20px;
            transform: rotate(1deg) scale(1.02);
          }
          50% {
            border-radius: 20px 30px 20px 30px;
            transform: rotate(-1deg) scale(1.01);
          }
          75% {
            border-radius: 25px 25px 25px 25px;
            transform: rotate(0.5deg) scale(1.02);
          }
          100% {
            border-radius: 20px;
            transform: rotate(0deg) scale(1);
          }
        }
        
        @keyframes neonPulse {
          0% {
            box-shadow: 
              0 0 0 0 rgba(220, 38, 38, 0),
              0 0 0 0 rgba(234, 88, 12, 0),
              0 20px 25px -12px rgba(0, 0, 0, 0.2);
          }
          25% {
            box-shadow: 
              0 0 20px 5px rgba(220, 38, 38, 0.3),
              0 0 40px 10px rgba(234, 88, 12, 0.2),
              0 25px 35px -12px rgba(0, 0, 0, 0.3);
          }
          50% {
            box-shadow: 
              0 0 30px 10px rgba(220, 38, 38, 0.5),
              0 0 60px 20px rgba(234, 88, 12, 0.3),
              0 30px 45px -12px rgba(0, 0, 0, 0.4);
          }
          75% {
            box-shadow: 
              0 0 20px 5px rgba(220, 38, 38, 0.3),
              0 0 40px 10px rgba(234, 88, 12, 0.2),
              0 25px 35px -12px rgba(0, 0, 0, 0.3);
          }
          100% {
            box-shadow: 
              0 0 0 0 rgba(220, 38, 38, 0),
              0 0 0 0 rgba(234, 88, 12, 0),
              0 20px 25px -12px rgba(0, 0, 0, 0.2);
          }
        }
        
        @keyframes float3D {
          0% {
            transform: translateY(0px) translateZ(0px) rotateX(0deg);
          }
          25% {
            transform: translateY(-10px) translateZ(20px) rotateX(2deg);
          }
          50% {
            transform: translateY(0px) translateZ(0px) rotateX(0deg);
          }
          75% {
            transform: translateY(5px) translateZ(10px) rotateX(-2deg);
          }
          100% {
            transform: translateY(0px) translateZ(0px) rotateX(0deg);
          }
        }
        
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes textGlitch {
          0%, 100% {
            text-shadow: 2px 0 0 rgba(220, 38, 38, 0), -2px 0 0 rgba(234, 88, 12, 0);
          }
          25% {
            text-shadow: 3px 0 0 rgba(220, 38, 38, 0.5), -2px 0 0 rgba(234, 88, 12, 0.5);
          }
          50% {
            text-shadow: -2px 0 0 rgba(220, 38, 38, 0.5), 3px 0 0 rgba(234, 88, 12, 0.5);
          }
          75% {
            text-shadow: 2px 0 0 rgba(220, 38, 38, 0.5), -3px 0 0 rgba(234, 88, 12, 0.5);
          }
        }
        
        @keyframes particleRotate {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: rotate(180deg) scale(1.5);
            opacity: 0.6;
          }
          100% {
            transform: rotate(360deg) scale(1);
            opacity: 0.3;
          }
        }
        
        .logo-box-modern {
          position: relative;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          animation: float3D 4s ease-in-out infinite, neonPulse 3s ease-in-out infinite;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .logo-box-modern::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #dc2626, #ea580c, #f59e0b, #ea580c, #dc2626);
          background-size: 300% 300%;
          border-radius: 22px;
          z-index: -1;
          animation: gradientShift 3s ease infinite, morphing 6s ease-in-out infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .logo-box-modern:hover::before {
          opacity: 1;
        }
        
        .logo-box-modern:hover {
          transform: scale(1.08) translateY(-8px) translateZ(30px);
          background: rgba(255, 255, 255, 1);
          backdrop-filter: blur(20px);
        }
        
        .logo-image-modern {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .logo-box-modern:hover .logo-image-modern {
          transform: scale(1.15) rotate(5deg);
          filter: drop-shadow(0 0 8px rgba(220, 38, 38, 0.5));
        }
        
        .text-gradient-modern {
          background: linear-gradient(135deg, #111 0%, #333 25%, #dc2626 50%, #333 75%, #111 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientShift 3s ease infinite, textGlitch 2s ease-in-out infinite;
        }
        
        .text-gradient-orange {
          background: linear-gradient(135deg, #dc2626 0%, #ea580c 25%, #f59e0b 50%, #ea580c 75%, #dc2626 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientShift 2s ease infinite;
        }
        
        /* Particules décoratives */
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(135deg, #dc2626, #ea580c);
          border-radius: 50%;
          pointer-events: none;
          animation: particleRotate 3s ease-in-out infinite;
        }
        
        .particle:nth-child(1) { top: -10px; left: 20%; animation-delay: 0s; }
        .particle:nth-child(2) { bottom: -10px; right: 20%; animation-delay: 0.5s; width: 6px; height: 6px; }
        .particle:nth-child(3) { top: 30%; right: -15px; animation-delay: 1s; width: 3px; height: 3px; }
        .particle:nth-child(4) { bottom: 30%; left: -15px; animation-delay: 1.5s; width: 5px; height: 5px; }
        .particle:nth-child(5) { top: -5px; right: 40%; animation-delay: 0.8s; width: 4px; height: 4px; }
        
        /* Ripple effect */
        .logo-box-modern::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          pointer-events: none;
        }
        
        .logo-box-modern:active::after {
          animation: ripple 0.6s ease-out;
        }
        
        @keyframes ripple {
          0% {
            box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.5);
            opacity: 1;
          }
          100% {
            box-shadow: 0 0 0 20px rgba(220, 38, 38, 0);
            opacity: 0;
          }
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
                style={{
                  animation: `${getKenBurns(prev)} 6s ease forwards`,
                }}
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
              alt={`Smoky Burgers slide ${current + 1}`}
              fill
              priority={current === 0}
              className="object-cover"
              style={{
                animation: `${getKenBurns(current)} 6s ease forwards`,
              }}
            />
          </div>

          {/* Overlay dégradé moderne */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 100%)',
              zIndex: 3,
            }}
          />
        </div>

        {/* Contenu centré */}
        <div className="relative flex flex-col items-center justify-center h-full gap-2 text-white px-4" style={{ zIndex: 10 }}>
          <h1
            className="font-black text-3xl sm:text-4xl md:text-5xl tracking-wide drop-shadow-lg"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '3px' }}
          >
            Smoky Burgers
          </h1>
          <div className="flex items-center gap-1.5 bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-md shadow">
            <Star size={13} fill="white" />
            <span>4.8</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <MapPin size={14} className="text-red-400 shrink-0" />
            <span className="text-white/90 text-sm sm:text-base font-medium drop-shadow">
              Av. Tantan, Casablanca
            </span>
          </div>
        </div>

        {/* Logo avec animations ultra modernes */}
        <div className="absolute bottom-0 left-10 sm:left-16 translate-y-1/2" style={{ zIndex: 20 }}>
          <div className="logo-box-modern bg-white/95 rounded-2xl shadow-2xl w-[115px] h-[125px] sm:w-[135px] sm:h-[150px] flex flex-col items-center justify-center gap-0.5 px-3 py-4">
            {/* Particules décoratives */}
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 logo-image-modern transition-all duration-300">
              <Image src="/smoky.PNG" alt="Logo Smoky Burgers" fill className="object-contain" />
            </div>
            <span className="text-gradient-modern font-black text-xs sm:text-sm tracking-[1.5px] uppercase leading-none" style={{ fontFamily: 'var(--font-bebas)' }}>
              Smoky
            </span>
            <span className="text-gradient-orange font-black text-xs sm:text-sm tracking-[1.5px] uppercase leading-none -mt-0.5" style={{ fontFamily: 'var(--font-bebas)' }}>
              Burgers
            </span>
            <span className="text-gray-400 text-[7px] tracking-[1.5px] uppercase mt-0.5 transition-all duration-300 group-hover:text-gray-600" style={{ fontFamily: 'var(--font-outfit)' }}>
              Fast Food
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}