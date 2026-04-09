'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Nos Voitures', href: '/#voitures' },
  { label: 'A propos', href: '/#about' },
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

  if (!mounted) return null

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between
          px-6 md:px-12 h-20 transition-all duration-700 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md'
              : 'bg-transparent'
          }`}
      >
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 group animate-slideInLeft">
          <div className="relative overflow-hidden rounded-full w-12 h-12 md:w-14 md:h-14
            border border-[#c4a35a]/30 bg-[#c4a35a]/10">
            <Image
              src="/rentalcar.png"
              alt="Logo AutoLux"
              width={100}
              height={100}
              className="rounded-full transition-transform duration-500 group-hover:scale-110
                w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent
              via-white/30 to-transparent translate-x-[-100%]
              group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>
          <div className="flex flex-col leading-none">
            <span
              className={`text-2xl md:text-3xl tracking-[4px] transition-colors duration-700 ${
                scrolled ? 'text-gray-800' : 'text-white'
              }`}
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Imperial<span className="text-[#c4a35a]">Car</span>
            </span>
            <span className={`text-[9px] tracking-[3px] uppercase transition-colors duration-700 ${
              scrolled ? 'text-gray-500' : 'text-gray-200'
            }`}
            style={{ fontFamily: 'var(--font-outfit)' }}>
              Rental Cars
            </span>
          </div>
        </Link>

        {/* ── Liens desktop ── */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-[1.5px] uppercase transition-all duration-300 relative
                after:absolute after:bottom-0 after:left-0 after:h-[1px]
                after:bg-[#c4a35a] after:w-0 hover:after:w-full
                after:transition-all after:duration-300 animate-fadeIn
                ${scrolled 
                  ? 'text-gray-600 hover:text-[#c4a35a]' 
                  : 'text-white/90 hover:text-[#c4a35a]'
                }`}
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              {link.label}
            </Link>
          ))}

          {/* CTA Contact - Redirige vers la section contact sur la page d'accueil */}
          <Link
            href="/#contact"
            className={`relative overflow-hidden text-sm tracking-[2px] uppercase
              px-6 py-2.5 rounded-sm transition-all duration-300 animate-scaleIn
              before:absolute before:inset-0 before:bg-white/20
              before:translate-x-[-100%] hover:before:translate-x-[100%]
              before:transition-transform before:duration-500 ${
                scrolled 
                  ? 'text-white bg-[#c4a35a] hover:shadow-lg hover:shadow-[#c4a35a]/30' 
                  : 'text-white bg-[#c4a35a]/90 hover:bg-[#c4a35a] backdrop-blur-sm'
              }`}
            style={{ animationDelay: '0.6s' }}
          >
            <span className="relative z-10">Contact</span>
          </Link>
        </div>

        {/* ── Mobile toggle ── */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden transition-colors duration-300 ${
            scrolled ? 'text-gray-600 hover:text-[#c4a35a]' : 'text-white hover:text-[#c4a35a]'
          }`}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ── Menu mobile ── */}
      <div
        className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-md md:hidden
          transition-all duration-500 ${
            mobileMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        style={{ top: '80px' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg tracking-[2px] uppercase text-gray-700
                hover:text-[#c4a35a] transition-all duration-300
                transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white bg-[#c4a35a] px-8 py-3 rounded-sm
              hover:shadow-lg hover:shadow-[#c4a35a]/30 transition-all duration-300
              transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}"
            style={{ transitionDelay: '0.5s' }}
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  )
}