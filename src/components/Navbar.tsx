'use client'

// ============================================================
// 1. IMPORTS
// ============================================================
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

// ============================================================
// 2. CONSTANTES & DONNÉES
// ============================================================
const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Notre Menu', href: '/#menu' },
  { label: 'À Propos', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

// Lien Glovo
const GLOVO_URL = 'https://glovoapp.com/fr/ma/casablanca/stores/dghmira-cas-1'

// ============================================================
// 3. STYLES INJECTÉS (CSS-in-JS)
// ============================================================
const styles = `
  /* Motif zellige marocain en fond */
  .nav-zellige {
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%233d7a35' stroke-width='0.5' opacity='0.18'%3E%3Cpolygon points='20,2 38,11 38,29 20,38 2,29 2,11'/%3E%3Cpolygon points='20,8 32,14 32,26 20,32 8,26 8,14'/%3E%3Cline x1='20' y1='2' x2='20' y2='8'/%3E%3Cline x1='38' y1='11' x2='32' y2='14'/%3E%3Cline x1='38' y1='29' x2='32' y2='26'/%3E%3Cline x1='20' y1='38' x2='20' y2='32'/%3E%3Cline x1='2' y1='29' x2='8' y2='26'/%3E%3Cline x1='2' y1='11' x2='8' y2='14'/%3E%3C/g%3E%3C/svg%3E");
    background-size: 40px 40px;
  }

  /* Bordure inspirée des zelliges */
  .nav-border-bottom {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg,
      transparent 0%,
      #2d5a27 10%,
      #e8820c 30%,
      #f5a030 50%,
      #e8820c 70%,
      #2d5a27 90%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .nav-border-bottom.visible { opacity: 1; }

  /* Petit losange décoratif au centre */
  .nav-diamond {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px; height: 12px;
    background: #e8820c;
    border: 2px solid #2d5a27;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .nav-diamond.visible { opacity: 1; }

  /* Effet de soulignement central traditionnel */
  .nav-link-trad {
    position: relative;
    font-family: 'Times New Roman', Times, serif;
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 600;
    transition: color 0.3s ease;
  }
  .nav-link-trad::before,
  .nav-link-trad::after {
    content: '';
    position: absolute;
    bottom: -3px;
    height: 1.5px;
    width: 0;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .nav-link-trad::before { left: 50%; background: #e8820c; }
  .nav-link-trad::after { right: 50%; background: #e8820c; }
  .nav-link-trad:hover::before,
  .nav-link-trad:hover::after { width: 50%; }

  /* Bouton CTA avec bordure dorée */
  .cta-trad {
    font-family: 'Times New Roman', Times, serif;
    font-size: 12px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    font-weight: 700;
    font-style: italic;
    position: relative;
    overflow: hidden;
    padding: 10px 28px;
    border-radius: 2px;
    color: white;
    background: linear-gradient(135deg, #2d5a27, #3d7a35);
    border: 1px solid #e8820c;
    transition: all 0.35s ease;
    cursor: pointer;
  }
  .cta-trad::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(135deg, #e8820c, #f5a030);
    transition: left 0.45s ease;
    z-index: 0;
  }
  .cta-trad:hover::before { left: 0; }
  .cta-trad:hover { border-color: #f5a030; transform: scale(1.02); }
  .cta-trad span { position: relative; z-index: 1; }

  /* Décorations autour du logo */
  .logo-frame { position: relative; }
  .logo-frame::before { 
    content: '✦'; 
    position: absolute; 
    top: -2px; 
    left: -16px; 
    font-size: 10px; 
    color: #e8820c; 
    opacity: 0.8;
  }
  .logo-frame::after { 
    content: '✦'; 
    position: absolute; 
    top: -2px; 
    right: -16px; 
    font-size: 10px; 
    color: #e8820c; 
    opacity: 0.8;
  }

  /* Version mobile du fond zellige */
  .mobile-overlay-trad {
    background:
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.4' opacity='0.08'%3E%3Cpolygon points='30,3 57,16.5 57,43.5 30,57 3,43.5 3,16.5'/%3E%3Cpolygon points='30,12 48,21 48,39 30,48 12,39 12,21'/%3E%3Ccircle cx='30' cy='30' r='6'/%3E%3C/g%3E%3C/svg%3E") repeat,
      linear-gradient(145deg, #1a3a16 0%, #2d5a27 35%, #3d7a35 65%, #1f4a1a 100%);
    background-size: 60px 60px, 100% 100%;
  }

  /* Séparateur décoratif */
  .mobile-divider {
    width: 140px; 
    height: 1px;
    background: linear-gradient(90deg, transparent, #e8820c, #f5a030, #e8820c, transparent);
    margin: 10px auto 12px;
  }

  /* Liens mobiles */
  .mobile-link-trad {
    font-family: 'Times New Roman', Times, serif;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-weight: 500;
    border: 1px solid rgba(232,130,12,0.3);
    border-radius: 2px;
    background: rgba(255,255,255,0.05);
    transition: all 0.3s ease;
    backdrop-filter: blur(4px);
  }
  .mobile-link-trad:hover {
    background: rgba(232,130,12,0.2);
    border-color: rgba(232,130,12,0.8);
    color: #f5a030;
    letter-spacing: 3.5px;
  }

  /* Animation subtile pour le logo */
  @keyframes gentleGlow {
    0%, 100% { filter: drop-shadow(0 0 2px rgba(232,130,12,0.3)); }
    50% { filter: drop-shadow(0 0 6px rgba(232,130,12,0.6)); }
  }
  .logo-glow {
    animation: gentleGlow 3s ease-in-out infinite;
  }

  /* Fix pour le titre mobile */
  .mobile-logo-title {
    font-family: 'Times New Roman', Times, serif;
    font-size: 2rem;
    font-weight: bold;
    font-style: italic;
    color: white;
    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
  }
  .mobile-logo-title span {
    color: #f5a030;
  }
  .mobile-subtitle {
    font-family: 'Times New Roman', Times, serif;
    font-size: 9px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
  }
`

// ============================================================
// 4. COMPOSANT PRINCIPAL
// ============================================================
export default function Navbar() {
  // ----------------------------------------
  // 4.1 State & Hooks
  // ----------------------------------------
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // ----------------------------------------
  // 4.2 Effets pour le scroll et le montage
  // ----------------------------------------
  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ----------------------------------------
  // 4.3 Gestion du body scroll lock
  // ----------------------------------------
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [mobileMenuOpen])

  // ----------------------------------------
  // 4.4 Variables dérivées
  // ----------------------------------------
  const isGlassActive = scrolled || mobileMenuOpen

  // ----------------------------------------
  // 4.5 Fonction pour ouvrir Glovo
  // ----------------------------------------
  const openGlovo = () => {
    window.open(GLOVO_URL, '_blank', 'noopener,noreferrer')
  }

  // ----------------------------------------
  // 4.6 Rendu conditionnel (évite hydration mismatch)
  // ----------------------------------------
  if (!mounted) return null

  // ============================================================
  // 5. RENDU DU COMPOSANT
  // ============================================================
  return (
    <>
      {/* 5.1 Styles globaux */}
      <style>{styles}</style>

      {/* 5.2 Barre de navigation principale */}
      <nav
        className={`nav-zellige fixed top-0 left-0 right-0 z-50 flex items-center justify-between
          px-4 sm:px-6 md:px-12 h-16 sm:h-20 transition-all duration-500 ${
            isGlassActive
              ? 'bg-[#faf6ee]/94 backdrop-blur-xl'
              : 'bg-transparent [background-image:none]'
          }`}
      >
        {/* Décorations bas de navbar */}
        <div className={`nav-border-bottom ${isGlassActive ? 'visible' : ''}`} />
        <div className={`nav-diamond ${isGlassActive ? 'visible' : ''}`} />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className={`relative overflow-hidden rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
            border-2 transition-all duration-300 ${isGlassActive ? 'border-[#e8820c] shadow-md' : 'border-[#e8820c]/60'}
            ${isGlassActive ? 'logo-glow' : ''}`}>
            <Image
              src="/dghmira-.png"
              alt="Dghmira Restaurant"
              width={110}
              height={110}
              className="rounded-full transition-transform duration-500 group-hover:scale-110 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-none logo-frame pl-3 pr-3">
            <span
              className={`text-xl sm:text-2xl md:text-3xl tracking-[5px] transition-colors duration-500 font-bold italic ${
                isGlassActive ? 'text-[#2d5a27]' : 'text-white drop-shadow-md'
              }`}
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              D<span className={isGlassActive ? 'text-[#e8820c]' : 'text-[#f5a030]'}>g</span>hmira
            </span>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link-trad ${
                isGlassActive
                  ? 'text-[#2a3a25] hover:text-[#3d7a35]'
                  : 'text-white/95 hover:text-[#f5a030]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button onClick={openGlovo} className="cta-trad">
            <span>Commander</span>
          </button>
        </div>

        {/* Bouton hamburger mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden transition-all duration-300 z-50 p-2 border
            hover:scale-110 ${
              isGlassActive
                ? 'text-[#2d5a27] hover:text-[#e8820c] bg-white/70 border-[#3d7a35]/50'
                : 'text-white hover:text-[#f5a030] bg-white/15 border-white/30'
            }`}
          style={{ borderRadius: '2px' }}
          aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ======================================================== */}
      {/* 5.3 MENU MOBILE TRADITIONNEL */}
      {/* ======================================================== */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out
          ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        {/* Fond semi-transparent cliquable */}
        <div
          className={`mobile-overlay-trad absolute inset-0 transition-opacity duration-500
            ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Contenu du menu mobile */}
        <div className={`relative z-10 flex flex-col items-center justify-center h-full
          transform transition-all duration-500 delay-200
          ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
        >
          {/* Logo mobile avec décorations */}
          <div className="text-center">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full overflow-hidden
              border-2 border-[#e8820c]/80 shadow-2xl p-1 bg-white/15 backdrop-blur-sm">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image src="/dghmira-.png" alt="Dghmira Restaurant" fill className="object-cover" />
              </div>
            </div>
            <div className="mobile-divider" />
          </div>
          
          {/* Liens de navigation mobiles */}
          <div className="flex flex-col items-center gap-3 w-full max-w-xs px-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-link-trad w-full text-center text-base tracking-[3px] uppercase
                  text-white py-3 px-6 transform hover:scale-105
                  ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: `${index * 0.1 + 0.2}s` }}
              >
                {link.label}
              </Link>
            ))}

            {/* CTA mobile */}
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                openGlovo()
              }}
              className={`mt-6 w-full text-center text-white font-bold italic
                border-2 border-[#e8820c] bg-gradient-to-r from-[#2d5a27] to-[#3d7a35]
                px-8 py-4 uppercase tracking-[3px] text-sm
                hover:from-[#e8820c] hover:to-[#f5a030] hover:border-[#f5a030]
                transition-all duration-300 hover:scale-105 shadow-lg
                ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{
                transitionDelay: '0.6s',
                fontFamily: '"Times New Roman", Times, serif',
                borderRadius: '2px',
              }}
            >
             Commander
            </button>
          </div>
        
        </div>
      </div>
    </>
  )
}