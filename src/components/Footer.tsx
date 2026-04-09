// components/Footer.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin, Clock, Instagram, MessageCircle, ChevronRight } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gray-900 text-gray-300 overflow-hidden">
      
      {/* Décor élégant */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a35a]/30 to-transparent" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#c4a35a]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#c4a35a]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c4a35a]/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        
        {/* ── Grille principale ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-16 lg:py-20">
          
          {/* Colonne 1 - Brand & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="relative overflow-hidden rounded-full w-12 h-12
                border border-[#c4a35a]/30 bg-[#c4a35a]/10 flex-shrink-0
                transition-all duration-300 group-hover:border-[#c4a35a]">
                <Image
                  src="/rentalcar.png"
                  alt="Imperial Car Rental"
                  width={48}
                  height={48}
                  className="rounded-full w-full h-full object-cover
                    transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl tracking-wide text-white"
                  style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 500 }}>
                  Imperial<span className="text-[#c4a35a]">Car</span>
                </span>
                <span className="text-[9px] tracking-[3px] uppercase text-gray-500">
                  Location de voitures à Marrakech
                </span>
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Location de véhicules premium à Marrakech. 
              Flotte moderne, service irréprochable, disponible 7j/7.
            </p>
            
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3">
              {[
                { icon: <Instagram size={16} />, href: 'https://www.instagram.com/rent_car_marrakech_/', label: 'Instagram', color: 'hover:bg-[#E4405F]' },
                { icon: <MessageCircle size={16} />, href: 'https://www.threads.com/@rent_car_marrakech_?xmt=AQF0Z8LpoheR8By-Rc58kA4MTM2OAnNGMznswDvVqgiz-AA', label: 'Threads', color: 'hover:bg-[#000000]' },
              ].map((s) => (
                <a 
                  key={s.label} 
                  href={s.href} 
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center
                    text-gray-400 hover:text-white hover:bg-[#c4a35a]
                    transition-all duration-300`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h3 className="text-white font-medium text-[11px] tracking-[3px] uppercase mb-6
              flex items-center gap-2">
              <span className="w-6 h-px bg-[#c4a35a]" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Nos Voitures', href: '/#voitures' },
                { label: 'À Propos', href: '/#about' },
                { label: 'Contact', href: '/#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-[#c4a35a] text-sm transition-all duration-300 
                      flex items-center gap-2 group"
                  >
                    <ChevronRight 
                      size={12} 
                      className="text-[#c4a35a] opacity-0 group-hover:opacity-100 
                        transition-all duration-300 -translate-x-2 group-hover:translate-x-0" 
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Horaires & Service */}
          <div>
            <h3 className="text-white font-medium text-[11px] tracking-[3px] uppercase mb-6
              flex items-center gap-2">
              <span className="w-6 h-px bg-[#c4a35a]" />
              Horaires
            </h3>
            
            <div className="space-y-5">
              {/* Service client */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={14} className="text-[#c4a35a]" />
                  <span className="text-gray-300 text-sm font-medium">Service client</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between text-gray-400">
                    <span>Lundi - Dimanche</span>
                    <span className="text-gray-300">9h00 – 23h00</span>
                  </li>
                  <li className="flex justify-between text-gray-400">
                    <span>Réservation WhatsApp</span>
                    <span className="text-gray-300">24h/24</span>
                  </li>
                </ul>
              </div>
              
              {/* Assistance WhatsApp */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#c4a35a] rounded-full animate-pulse" />
                  <span className="text-gray-300 text-sm font-medium">Réservation WhatsApp</span>
                </div>
                <p className="text-sm text-gray-400">
                  Réservez votre véhicule directement<br />
                  <a href="https://wa.me/212665171827" className="text-[#c4a35a] font-medium hover:underline">
                    +212 6 65 17 18 27
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Colonne 4 - Contact & Carte minimisée */}
          <div>
            <h3 className="text-white font-medium text-[11px] tracking-[3px] uppercase mb-6
              flex items-center gap-2">
              <span className="w-6 h-px bg-[#c4a35a]" />
              Contact
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin size={16} className="text-[#c4a35a] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  L&apos;hivernage, Marrakech, Morocco
                </span>
              </li>
              
              <li className="flex items-center gap-3 group">
                <Phone size={16} className="text-[#c4a35a] flex-shrink-0" />
                <a 
                  href="tel:+212665171827" 
                  className="text-gray-400 hover:text-[#c4a35a] transition-colors text-sm"
                >
                  +212 6 65 17 18 27
                </a>
              </li>
              
              <li className="flex items-center gap-3 group">
                <MessageCircle size={16} className="text-[#c4a35a] flex-shrink-0" />
                <a 
                  href="https://wa.me/212665171827" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#c4a35a] transition-colors text-sm"
                >
                  Réservez par WhatsApp
                </a>
              </li>
            </ul>

            {/* Carte Google Maps minimisée */}
            <div className="pt-4">
              <div className="rounded-lg overflow-hidden border border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.902024352721!2d-8.021803684870705!3d31.628155250228702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8b3cf0f577%3A0x9b3c2e3f5a6b4c8d!2sL&#39;hivernage%2C%20Marrakech%2C%20Morocco!5e0!3m2!1sen!2s!4v1711382400000!5m2!1sen!2s"
                    width="100%"
                    height="80"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                    title="Notre emplacement à L'hivernage, Marrakech"
                  />
                  {/* Overlay subtil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none" />
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[10px] text-gray-500">
                  📍 L&apos;hivernage, Marrakech
                </p>
                <a 
                  href="https://maps.google.com/?q=L'hivernage+Marrakech+Morocco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-[#c4a35a] hover:underline"
                >
                  Ouvrir dans Maps →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Séparateur doré ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#c4a35a]/30 to-transparent" />

        {/* ── Bas du footer MODIFIÉ : texte centré uniquement ── */}
        <div className="py-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} <span className="text-[#c4a35a]">Imperial Car Rental</span>. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}