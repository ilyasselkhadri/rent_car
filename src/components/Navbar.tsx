'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Notre Menu', href: '/#menu' },
  { label: 'A propos', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const isGlassActive = scrolled || mobileMenuOpen

  if (!mounted) return null

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
          px-4 sm:px-6 md:px-12 h-16 sm:h-20 transition-all duration-500 ${
            isGlassActive
              ? 'bg-white/80 backdrop-blur-xl border-b border-white/30 shadow-lg'
              : 'bg-transparent'
          }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className={`relative overflow-hidden rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
            border transition-all duration-300 ${
              isGlassActive 
                ? 'border-red-500/80 bg-red-500/20' 
                : 'border-red-500/50 bg-red-500/10'
            }`}>
            <Image
              src="/smoky.PNG"
              alt="Smoky Burgers"
              width={110}
              height={110}
              className="rounded-full transition-transform duration-500 group-hover:scale-110
                w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent
              via-red-500/30 to-transparent translate-x-[-100%]
              group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className={`text-xl sm:text-2xl md:text-3xl tracking-[3px] sm:tracking-[4px] transition-colors duration-500 font-bold ${
                isGlassActive ? 'text-gray-800' : 'text-white'
              }`}
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Smoky<span className={isGlassActive ? 'text-red-600' : 'text-red-500'}>Burgers</span>
            </span>
            <span className={`text-[8px] sm:text-[9px] tracking-[2px] sm:tracking-[3px] uppercase transition-colors duration-500 ${
              isGlassActive ? 'text-gray-500' : 'text-orange-200/80'
            }`}
            style={{ fontFamily: 'var(--font-outfit)' }}>
              Fast Food Restaurant
            </span>
          </div>
        </Link>

        {/* Liens desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-[1.5px] uppercase transition-all duration-300 relative
                after:absolute after:bottom-0 after:left-0 after:h-[1px]
                after:bg-red-500 after:w-0 hover:after:w-full
                after:transition-all after:duration-300
                font-medium ${
                  isGlassActive 
                    ? 'text-gray-700 hover:text-red-600' 
                    : 'text-white/90 hover:text-red-500'
                }`}
            >
              {link.label}
            </Link>
          ))}

          {/* CTA Commander - Desktop */}
          <Link
            href="https://glovoapp.com/fr/ma/casablanca/stores/smoky-burgers"
            target="_blank"
            rel="noopener noreferrer"
            className={`relative overflow-hidden text-sm tracking-[2px] uppercase font-semibold
              px-6 py-2.5 rounded-full transition-all duration-300
              before:absolute before:inset-0 before:bg-white/30
              before:translate-x-[-100%] hover:before:translate-x-[100%]
              before:transition-transform before:duration-500
              ${
                isGlassActive
                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                  : 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
              } 
              hover:shadow-lg hover:shadow-red-500/50 hover:scale-105 transform`}
          >
            <span className="relative z-10">Commander</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden transition-all duration-300 z-50 p-2 rounded-full
            hover:scale-110 ${
              isGlassActive
                ? 'text-gray-700 hover:text-red-600 bg-white/50 backdrop-blur-sm' 
                : 'text-white hover:text-red-500 bg-white/10 backdrop-blur-sm'
            }`}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu overlay avec effet GLASS */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out
          ${mobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        {/* Glass background avec blur */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-red-500/30 via-orange-500/30 to-amber-500/30
            backdrop-blur-2xl transition-opacity duration-500
            ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu content */}
        <div className={`relative z-10 flex flex-col items-center justify-center h-full
          transform transition-all duration-500 delay-200
          ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
        >
          {/* Logo dans le menu mobile */}
          <div className="mb-8 sm:mb-12 text-center">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden 
              border-2 border-white/30 shadow-2xl bg-white/20 backdrop-blur-sm p-1">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/smoky.PNG"
                  alt="Smoky Burgers"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h3 className="text-white text-2xl sm:text-3xl font-bold drop-shadow-lg" style={{ fontFamily: 'var(--font-cormorant)' }}>
              Smoky<span className="text-red-400">Burgers</span>
            </h3>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 w-full max-w-xs px-6 sm:px-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full text-center text-base sm:text-lg tracking-[2px] uppercase 
                  text-white hover:text-red-400 transition-all duration-300 py-2.5 sm:py-3 px-5 sm:px-6
                  rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20
                  border border-white/20 hover:border-red-500/50
                  transform hover:scale-105
                  ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ 
                  transitionDelay: `${index * 0.1 + 0.2}s`,
                  fontFamily: 'var(--font-outfit)',
                }}
              >
                {link.label}
              </Link>
            ))}
            
            {/* CTA dans menu mobile */}
            <Link
              href="https://glovoapp.com/fr/ma/casablanca/stores/smoky-burgers"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className={`mt-4 sm:mt-6 w-full text-center text-white 
                bg-gradient-to-r from-red-600 to-orange-500 
                px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:shadow-2xl hover:shadow-red-500/50 
                transition-all duration-300 hover:scale-105 font-bold text-base sm:text-lg uppercase tracking-wider
                ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ 
                transitionDelay: '0.6s',
                fontFamily: 'var(--font-outfit)'
              }}
            >
              Commander
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}