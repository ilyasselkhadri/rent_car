// components/Footer.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, Instagram, Facebook, ChevronRight, Flame, Phone, Mail, Star } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-black text-gray-300 overflow-hidden">
      
      {/* Décor traditionnel - tons vert/orange */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e8820c]/30 to-transparent" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#3d7a35]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#e8820c]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3d7a35]/[0.02] rounded-full blur-3xl" />
      </div>

      {/* Motif zellige décoratif */}
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%233d7a35' stroke-width='0.5'%3E%3Cpolygon points='30,3 57,16.5 57,43.5 30,57 3,43.5 3,16.5'/%3E%3Cpolygon points='30,12 48,21 48,39 30,48 12,39 12,21'/%3E%3Ccircle cx='30' cy='30' r='6'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        
        {/* ── Grille principale ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-16 lg:py-20">
          
          {/* Colonne 1 - Brand & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="relative overflow-hidden rounded-full w-12 h-12
                border border-[#e8820c]/30 bg-[#3d7a35]/10 flex-shrink-0
                transition-all duration-300 group-hover:border-[#e8820c]">
                <Image
                  src="/dghmira-.png"
                  alt="Dghmira"
                  width={48}
                  height={48}
                  className="rounded-full w-full h-full object-cover
                    transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl tracking-wide text-white"
                  style={{ fontFamily: '"Times New Roman", Times, serif', fontWeight: 600 }}>
                  D<span className="text-[#e8820c]">g</span>hmira
                </span>
                <span className="text-[9px] tracking-[3px] uppercase text-gray-500">
                  Restaurant Traditionnel
                </span>
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              L'âme du Maroc à chaque bouchée
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Cuisine traditionnelle • 100% fait maison<br />
              Épices authentiques • Ingrédients locaux<br />
              Livraison partout à Casablanca
            </p>
            
            {/* FOLLOW US */}
            <div className="mb-3">
              <p className="text-gray-400 text-xs font-medium tracking-wider uppercase">
                FOLLOW US
              </p>
            </div>
            
            {/* Réseaux sociaux - Instagram & Facebook */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/dghmira_casa/" 
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center
                  text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-[#3d7a35] hover:to-[#e8820c]
                  transition-all duration-300"
              >
                <Instagram size={16} />
              </a>
              
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/profile.php?id=61582405899275" 
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center
                  text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-[#3d7a35] hover:to-[#e8820c]
                  transition-all duration-300"
              >
                <Facebook size={16} />
              </a>
            </div>
  
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h3 className="text-white font-medium text-[11px] tracking-[3px] uppercase mb-6
              flex items-center gap-2"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              <span className="w-6 h-px bg-gradient-to-r from-[#3d7a35] to-[#e8820c]" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Notre Menu', href: '/#menu' },
                { label: 'À Propos', href: '/#about' },
                { label: 'Contact', href: '/#contact' },
                { label: 'Dghmira Express', href: 'https://www.instagram.com/dghmira_express/', external: true },
              ].map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a 
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#e8820c] text-sm transition-all duration-300 
                        flex items-center gap-2 group"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      <ChevronRight 
                        size={12} 
                        className="text-[#e8820c] opacity-0 group-hover:opacity-100 
                          transition-all duration-300 -translate-x-2 group-hover:translate-x-0" 
                      />
                      {item.label}
                    </a>
                  ) : (
                    <Link 
                      href={item.href}
                      className="text-gray-400 hover:text-[#e8820c] text-sm transition-all duration-300 
                        flex items-center gap-2 group"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      <ChevronRight 
                        size={12} 
                        className="text-[#e8820c] opacity-0 group-hover:opacity-100 
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
              flex items-center gap-2"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              <span className="w-6 h-px bg-gradient-to-r from-[#3d7a35] to-[#e8820c]" />
              Horaires & Services
            </h3>
            
            <div className="space-y-5">
              {/* Horaires d'ouverture */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={14} className="text-[#e8820c]" />
                  <span className="text-gray-300 text-sm font-medium">Ouverture</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between text-gray-400">
                    <span>Lundi - Dimanche</span>
                    <span className="text-gray-300">12h00 – 23h00</span>
                  </li>
                  <li className="text-gray-400">
                    <span className="block">Ouvert 7j/7</span>
                  </li>
                </ul>
              </div>
              
              {/* Modes de service */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-3">
                  <Flame size={14} className="text-[#3d7a35]" />
                  <span className="text-gray-300 text-sm font-medium">Modes de service</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-gray-300 text-xs font-medium">Cloud Kitchen</span>
                    <p className="text-gray-500 text-[9px] mt-0.5">Cuisine centralisée</p>
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

              {/* Caterer badge */}
              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-[#e8820c]" />
                  <span className="text-gray-400 text-xs">Service Traiteur disponible</span>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne 4 - Contact & Localisation */}
          <div>
            <h3 className="text-white font-medium text-[11px] tracking-[3px] uppercase mb-6
              flex items-center gap-2"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              <span className="w-6 h-px bg-gradient-to-r from-[#3d7a35] to-[#e8820c]" />
              Nous contacter
            </h3>
            
            {/* Contact info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 group">
                <Phone size={16} className="text-[#e8820c] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href="tel:0660644810" className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    0660644810
                  </a>
                  <span className="text-gray-500 text-[10px]">Commandes & réservations</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <Mail size={16} className="text-[#e8820c] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    contact@dghmira.ma
                  </span>
                  <span className="text-gray-500 text-[10px]">Service client</span>
                </div>
              </div>
            </div>

            {/* Localisation */}
            <h3 className="text-white font-medium text-[11px] tracking-[3px] uppercase mb-4
              flex items-center gap-2"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              <span className="w-6 h-px bg-gradient-to-r from-[#3d7a35] to-[#e8820c]" />
              Nous trouver
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <MapPin size={16} className="text-[#e8820c] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  135 rue Abou El Hassan Es-Séghir<br />
                  Quartier les Princesses Maarif<br />
                  Casablanca, Morocco
                </span>
              </li>
            </ul>

            {/* Carte Google Maps */}
            <div className="pt-2">
              <div className="rounded-lg overflow-hidden border border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13293.61922707863!2d-7.632038!3d33.57311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4772aa968f%3A0xb4e8e8e8e8e8e8e8!2s135%20Rue%20Abou%20El%20Hassan%20Es-S%C3%A9ghir%2C%20Casablanca%2C%20Morocco!5e0!3m2!1sen!2s!4v1711382400000!5m2!1sen!2s"
                    width="100%"
                    height="100"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                    title="Dghmira - 135 rue Abou El Hassan Es-Séghir, Maarif, Casablanca"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[10px] text-gray-500">
                  📍 Quartier les Princesses Maarif
                </p>
                <a 
                  href="https://maps.google.com/?q=135+rue+Abou+El+Hassan+Es-S%C3%A9ghir+Casablanca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-[#e8820c] hover:underline"
                >
                  Ouvrir dans Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* ── Séparateur gradient vert/orange ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#e8820c]/30 to-transparent" />

        {/* ── Bas du footer ── */}
        <div className="py-8 text-center">
          <p className="text-gray-500 text-sm" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
            © {currentYear} <span className="text-[#e8820c] font-medium">Dghmira</span>. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}