'use client'

import { useState } from 'react'
import { MapPin, Clock, Send, Calendar, Info, Mail, Phone, MessageCircle, Facebook, Instagram } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler un envoi (à remplacer par votre logique EmailJS si nécessaire)
    setTimeout(() => {
      setSubmitStatus('success')
      setFormData({ nom: '', email: '', telephone: '', sujet: '', message: '' })
      setTimeout(() => setSubmitStatus('idle'), 5000)
      setIsSubmitting(false)
    }, 1000)
  }

  const phoneNumber = "212660644810"
  const whatsappLink = `https://wa.me/${phoneNumber}`

  return (
    <section id="contact" className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">

      {/* Décorations traditionnelles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#3d7a35]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#e8820c]/5 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e8820c]/30 to-transparent" />
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

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="text-[#e8820c] text-xl">✻</span>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400">Contactez-nous</span>
            <span className="text-[#e8820c] text-xl">✻</span>
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: '"Times New Roman", Times, serif', letterSpacing: '2px' }}
          >
            <span className="border-b-2 border-[#e8820c] pb-2">Prenez contact avec Dghmira</span>
          </h2>
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3d7a35]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#e8820c]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#3d7a35]" />
          </div>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto mt-6">
            Une question ? Une commande spéciale ? Contactez-nous directement par WhatsApp ou via le formulaire ci-dessous.
            Nous vous répondrons dans les plus brefs délais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Colonne gauche - Informations de contact */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 h-full">
            <h3
              className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              <MapPin size={22} className="text-[#e8820c]" />
              Nos coordonnées
            </h3>

            <div className="space-y-6">

              {/* WhatsApp - Primaire */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366] transition-colors duration-300">
                  <MessageCircle size={18} className="text-[#25D366] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-700 mb-1">WhatsApp (Commandes)</h4>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] text-sm hover:underline font-medium"
                  >
                    0660 644 810
                  </a>
                  <p className="text-gray-400 text-xs mt-1">Cliquez pour commander directement sur WhatsApp</p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#e8820c]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e8820c] transition-colors duration-300">
                  <Phone size={18} className="text-[#e8820c] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Téléphone</h4>
                  <a
                    href="tel:0660644810"
                    className="text-gray-600 text-sm hover:text-[#e8820c] transition-colors"
                  >
                    0660 644 810
                  </a>
                  <p className="text-gray-400 text-xs mt-1">Service client disponible 12h-23h</p>
                </div>
              </div>

              {/* Adresse */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#3d7a35]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#3d7a35] transition-colors duration-300">
                  <MapPin size={18} className="text-[#3d7a35] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Adresse</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    135 rue Abou El Hassan Es-Séghir<br />
                    Quartier les Princesses Maarif<br />
                    Casablanca, Morocco
                  </p>
                </div>
              </div>

              {/* Horaires */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#e8820c]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e8820c] transition-colors duration-300">
                  <Clock size={18} className="text-[#e8820c] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Horaires d'ouverture</h4>
                  <div className="text-gray-500 text-sm space-y-1">
                    <p>Lundi - Dimanche : 12h00 – 23h00</p>
                    <p className="text-xs text-gray-400">Ouvert 7j/7</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#3d7a35]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#3d7a35] transition-colors duration-300">
                  <Mail size={18} className="text-[#3d7a35] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Email</h4>
                  <a
                    href="mailto:contact@dghmira.ma"
                    className="text-[#e8820c] text-sm hover:underline"
                  >
                    contact@dghmira.ma
                  </a>
                  <p className="text-gray-400 text-xs mt-1">Réponse sous 24h</p>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#e8820c]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e8820c] transition-colors duration-300">
                  <Instagram size={18} className="text-[#e8820c] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Suivez-nous</h4>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.instagram.com/dghmira_casa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#e8820c] text-sm transition-colors flex items-center gap-1"
                    >
                      <Instagram size={14} /> Instagram
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61582405899275"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#e8820c] text-sm transition-colors flex items-center gap-1"
                    >
                      <Facebook size={14} /> Facebook
                    </a>
                  </div>
                </div>
              </div>

              {/* Informations légales */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#3d7a35]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#3d7a35] transition-colors duration-300">
                  <Info size={18} className="text-[#3d7a35] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Informations</h4>
                  <p className="text-gray-500 text-sm">
                    Moroccan Cloud Kitchen<br />
                    Service Traiteur disponible
                  </p>
                </div>
              </div>

              {/* Bouton WhatsApp flottant dans la carte */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-3 rounded-xl
                    hover:bg-[#20b859] transition-all duration-300 hover:scale-105 transform shadow-lg"
                >
                  <MessageCircle size={20} />
                  <span className="font-semibold tracking-wide">Commander sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Colonne droite - Formulaire */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 h-full">
            <h3
              className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              <Send size={22} className="text-[#e8820c]" />
              Envoyez-nous un message
            </h3>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-700 text-sm">✅ Message envoyé avec succès ! Nous vous répondrons sous 24h.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 text-sm">❌ Une erreur est survenue. Veuillez réessayer ou nous contacter directement sur WhatsApp.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2 font-medium">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm 
                      focus:border-[#e8820c] focus:ring-2 focus:ring-[#e8820c]/20 
                      transition-all duration-200 bg-gray-50 text-gray-800"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2 font-medium">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm 
                      focus:border-[#e8820c] focus:ring-2 focus:ring-[#e8820c]/20 
                      transition-all duration-200 bg-gray-50 text-gray-800"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2 font-medium">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm 
                      focus:border-[#e8820c] focus:ring-2 focus:ring-[#e8820c]/20 
                      transition-all duration-200 bg-gray-50 text-gray-800"
                    placeholder="+212 6 XX XX XX XX (optionnel)"
                  />
                  <p className="text-xs text-gray-400 mt-1">Pour que nous puissions vous rappeler si besoin</p>
                </div>

                <div>
                  <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2 font-medium">
                    Sujet *
                  </label>
                  <select
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm 
                      focus:border-[#e8820c] focus:ring-2 focus:ring-[#e8820c]/20 
                      transition-all duration-200 bg-gray-50 text-gray-800"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="Commande">Commande</option>
                    <option value="Réservation">Réservation</option>
                    <option value="Demande d'information">Demande d'information</option>
                    <option value="Traiteur">Service traiteur</option>
                    <option value="Réclamation">Réclamation</option>
                    <option value="Partenariat">Partenariat</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2 font-medium">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm 
                    focus:border-[#e8820c] focus:ring-2 focus:ring-[#e8820c]/20 
                    transition-all duration-200 bg-gray-50 text-gray-800 resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden bg-gradient-to-r from-[#3d7a35] to-[#e8820c] 
                  text-white py-4 rounded-xl text-sm tracking-[3px] uppercase font-semibold
                  hover:shadow-xl hover:shadow-[#e8820c]/30 transition-all duration-300
                  disabled:opacity-70 disabled:cursor-not-allowed group"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  {!isSubmitting && <Send size={16} className="group-hover:translate-x-1 transition-transform" />}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#2d5a27] to-[#f5a030] 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </form>

            <p className="text-center text-gray-400 text-[10px] mt-6">
              En soumettant ce formulaire, vous acceptez que vos données soient traitées pour vous répondre.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}