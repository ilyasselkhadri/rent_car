'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { MapPin, Clock, Send, Calendar, Info, Mail } from 'lucide-react'

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

    // Obtenir la date et l'heure actuelles
    const now = new Date()
    const formattedTime = now.toLocaleString('fr-FR', {
      dateStyle: 'full',
      timeStyle: 'short'
    })

    try {
      // Envoyer les variables correspondant au template EmailJS
      await emailjs.send(
        'service_k840c9p', // Ton Service ID
        'template_kqd3pqf', // Ton Template ID
        {
          name: `${formData.nom} (${formData.email}) - Sujet: ${formData.sujet}`, // Nom complet + email + sujet
          time: formattedTime, // Date et heure de l'envoi
          message: `
📋 SUJET: ${formData.sujet}

📞 TÉLÉPHONE: ${formData.telephone || 'Non renseigné'}

💬 MESSAGE:
${formData.message}

--- 
Email du client: ${formData.email}
Pour répondre, cliquez sur "Répondre"
          `.trim(),
        },
        'A3ko8-djF7G7OLiqS' // Ton Public Key
      )

      setSubmitStatus('success')
      setFormData({ nom: '', email: '', telephone: '', sujet: '', message: '' })
      setTimeout(() => setSubmitStatus('idle'), 5000)

    } catch (error) {
      console.error('Erreur EmailJS:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">

      {/* Décorations animées */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}
          >
            <span className="border-b-2 border-red-500 pb-1">Contactez-nous</span>
          </h2>
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          </div>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto mt-6">
            Une question ? Une commande spéciale ? Remplissez le formulaire ci-dessous et nous vous répondrons par email dans les plus brefs délais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Colonne gauche - Informations de contact */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 h-full">
            <h3
              className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <MapPin size={22} className="text-red-500" />
              Nos coordonnées
            </h3>

            <div className="space-y-6">

              {/* Adresse */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500 transition-colors duration-300">
                  <MapPin size={18} className="text-red-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Adresse</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    J922+35P Casablanca, Maroc
                  </p>
                </div>
              </div>

              {/* Horaires */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500 transition-colors duration-300">
                  <Clock size={18} className="text-red-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Horaires d&apos;ouverture</h4>
                  <div className="text-gray-500 text-sm space-y-1">
                    <p>Lundi - Jeudi : 12h00 – 23h30</p>
                    <p>Vendredi - Dimanche : 12h00 – 23h59</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
               <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500 transition-colors duration-300">
               <Mail size={18} className="text-red-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
               <h4 className="font-semibold text-gray-700 mb-1">Email</h4>
                 <a
                   href="mailto:contact@smokyburgers.ma"
                   className="text-red-500 text-sm hover:underline"
                  >
                  contact@smokyburgers.ma
                 </a>
                <p className="text-gray-400 text-xs mt-1">Réponse sous 24h</p>
             </div>
            </div>

              {/* Informations légales */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors duration-300">
                  <Info size={18} className="text-orange-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Informations légales</h4>
                  <p className="text-gray-500 text-sm">
                    SMOKY BURGERS SARL AU<br />
                    ICE: 002705795000055
                  </p>
                </div>
              </div>

              {/* Lien Glovo */}
              <div className="mt-4 pt-2">
                <a
                  href="https://glovoapp.com/docs/fr/legal/terms/?country=ma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-orange-500 transition-colors duration-300"
                >
                  <Calendar size={12} />
                  Conditions d&apos;utilisation de Glovo
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Colonne droite - Formulaire */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 h-full">
            <h3
              className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <Send size={22} className="text-red-500" />
              Envoyez-nous un message
            </h3>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-700 text-sm">✅ Message envoyé avec succès ! Nous vous répondrons sous 24h.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 text-sm">❌ Une erreur est survenue. Veuillez réessayer.</p>
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
                      focus:border-red-500 focus:ring-2 focus:ring-red-500/20 
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
                      focus:border-red-500 focus:ring-2 focus:ring-red-500/20 
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
                      focus:border-red-500 focus:ring-2 focus:ring-red-500/20 
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
                      focus:border-red-500 focus:ring-2 focus:ring-red-500/20 
                      transition-all duration-200 bg-gray-50 text-gray-800"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="Commande">Commande</option>
                    <option value="Réservation de table">Réservation de table</option>
                    <option value="Demande d&apos;information">Demande d&apos;information</option>
                    <option value="Catering">Service traiteur</option>
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
                    focus:border-red-500 focus:ring-2 focus:ring-red-500/20 
                    transition-all duration-200 bg-gray-50 text-gray-800 resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-500 
                  text-white py-4 rounded-xl text-sm tracking-[3px] uppercase font-semibold
                  hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300
                  disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  {!isSubmitting && <Mail size={16} className="group-hover:translate-x-1 transition-transform" />}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-600 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}