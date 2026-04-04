// components/Footer.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, Instagram, ChevronRight, Flame, Phone, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-black text-gray-300 overflow-hidden">
      
      {/* Décor élégant - couleurs rouge/orange */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        
        {/* ── Grille principale ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-16 lg:py-20">
          
          {/* Colonne 1 - Brand & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="relative overflow-hidden rounded-full w-12 h-12
                border border-red-500/30 bg-red-500/10 flex-shrink-0
                transition-all duration-300 group-hover:border-red-500">
                <Image
                  src="/smoky.PNG"
                  alt="Smoky Burgers"
                  width={48}
                  height={48}
                  className="rounded-full w-full h-full object-cover
                    transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl tracking-wide text-white"
                  style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 500 }}>
                  Smoky<span className="text-red-500">Burgers</span>
                </span>
                <span className="text-[9px] tracking-[3px] uppercase text-gray-500">
                  Fast Food Restaurant
                </span>
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Burgers faits maison • 90% ingrédients locaux 🇲🇦<br />
              Viande fraîche, pains artisanaux, sauces exclusives.
            </p>
            
            {/* FOLLOW US - Titre avant les icônes */}
            <div className="mb-3">
              <p className="text-gray-400 text-xs font-medium tracking-wider uppercase">
                FOLLOW US
              </p>
            </div>
            
            {/* Réseaux sociaux - Instagram & Threads */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/smokyburgersmaroc/" 
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center
                  text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500
                  transition-all duration-300"
              >
                <Instagram size={16} />
              </a>
              
              {/* Threads */}
              <a 
                href="https://www.threads.com/@smokyburgersmaroc" 
                aria-label="Threads"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center
                  text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500
                  transition-all duration-300"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
              </a>
            </div>
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h3 className="text-white font-medium text-[11px] tracking-[3px] uppercase mb-6
              flex items-center gap-2">
              <span className="w-6 h-px bg-gradient-to-r from-red-500 to-orange-500" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Notre Menu', href: '/#menu' },
                { label: 'À Propos', href: '/#about' },
                { label: 'Contact', href: '/#contact' },
                { label: 'Commander', href: 'https://glovoapp.com/fr/ma/casablanca/stores/smoky-burgers', external: true },
              ].map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a 
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-red-500 text-sm transition-all duration-300 
                        flex items-center gap-2 group"
                    >
                      <ChevronRight 
                        size={12} 
                        className="text-red-500 opacity-0 group-hover:opacity-100 
                          transition-all duration-300 -translate-x-2 group-hover:translate-x-0" 
                      />
                      {item.label}
                    </a>
                  ) : (
                    <Link 
                      href={item.href}
                      className="text-gray-400 hover:text-red-500 text-sm transition-all duration-300 
                        flex items-center gap-2 group"
                    >
                      <ChevronRight 
                        size={12} 
                        className="text-red-500 opacity-0 group-hover:opacity-100 
                          transition-all duration-300 -translate-x-2 group-hover:translate-x-0" 
                      />
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Horaires & Services */}
          <div>
            <h3 className="text-white font-medium text-[11px] tracking-[3px] uppercase mb-6
              flex items-center gap-2">
              <span className="w-6 h-px bg-gradient-to-r from-red-500 to-orange-500" />
              Horaires & Services
            </h3>
            
            <div className="space-y-5">
              {/* Horaires d'ouverture */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={14} className="text-red-500" />
                  <span className="text-gray-300 text-sm font-medium">Ouverture</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between text-gray-400">
                    <span>Lundi - Dimanche</span>
                    <span className="text-gray-300">12h00 – 23h30</span>
                  </li>
                  <li className="text-gray-400">
                    <span className="block">Ouvert 7j/7</span>
                  </li>
                </ul>
              </div>
              
              {/* Modes de service - seulement les textes en ligne */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-3">
                  <Flame size={14} className="text-orange-500" />
                  <span className="text-gray-300 text-sm font-medium">Modes de service</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-gray-300 text-xs font-medium">Eat In</span>
                    <p className="text-gray-500 text-[9px] mt-0.5">Sur place</p>
                  </div>
                  <div>
                    <span className="text-gray-300 text-xs font-medium">Take Away</span>
                    <p className="text-gray-500 text-[9px] mt-0.5">À emporter</p>
                  </div>
                  <div>
                    <span className="text-gray-300 text-xs font-medium">Delivery</span>
                    <p className="text-gray-500 text-[9px] mt-0.5">Livraison</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne 4 - Contact & Localisation */}
          <div>
            <h3 className="text-white font-medium text-[11px] tracking-[3px] uppercase mb-6
              flex items-center gap-2">
              <span className="w-6 h-px bg-gradient-to-r from-red-500 to-orange-500" />
              Nous contacter
            </h3>
            
            {/* Contact info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 group">
                <Phone size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    +212 522 123 456
                  </span>
                  <span className="text-gray-500 text-[10px]">Service client</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <Mail size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    contact@smokyburgers.ma
                  </span>
                  <span className="text-gray-500 text-[10px]">24h/24 réponse sous 24h</span>
                </div>
              </div>
            </div>

            {/* Localisation */}
            <h3 className="text-white font-medium text-[11px] tracking-[3px] uppercase mb-4
              flex items-center gap-2">
              <span className="w-6 h-px bg-gradient-to-r from-red-500 to-orange-500" />
              Nous trouver
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  Av. Tantan, Casablanca, Morocco
                </span>
              </li>
            </ul>

            {/* Carte Google Maps */}
            <div className="pt-4">
              <div className="rounded-lg overflow-hidden border border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13293.61922707863!2d-7.632038!3d33.57311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4772aa968f%3A0xb4e8e8e8e8e8e8e8!2sAv.%20Tantan%2C%20Casablanca%2C%20Morocco!5e0!3m2!1sen!2s!4v1711382400000!5m2!1sen!2s"
                    width="100%"
                    height="100"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                    title="Smoky Burgers - Av. Tantan, Casablanca"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[10px] text-gray-500">
                  📍 Av. Tantan, Casablanca
                </p>
                <a 
                  href="https://maps.app.goo.gl/xSorfwwUacGUJdjBA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-red-500 hover:underline"
                >
                  Ouvrir dans Maps →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Séparateur gradient rouge/orange ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

        {/* ── Bas du footer simplifié ── */}
        <div className="py-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} <span className="text-red-500 font-medium">Smoky Burgers</span>. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}