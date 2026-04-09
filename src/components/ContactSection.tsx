'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react'

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
    
    try {
      // Construire le message WhatsApp
      const message = `*📋 NOUVEAU MESSAGE DE CONTACT - IMPERIAL CAR*\n\n` +
        `*👤 NOM COMPLET* : ${formData.nom}\n` +
        `*📧 EMAIL* : ${formData.email}\n` +
        `*📞 TÉLÉPHONE* : ${formData.telephone || 'Non renseigné'}\n` +
        `*📋 SUJET* : ${formData.sujet}\n\n` +
        `*💬 MESSAGE* :\n${formData.message}\n\n` +
        `*🕐 DATE D&apos;ENVOI* : ${new Date().toLocaleString('fr-FR')}\n\n` +
        `_🔔 En attente de réponse_`
      
      // Encoder le message pour URL
      const encodedMessage = encodeURIComponent(message)
      const numeroWhatsApp = '212666444655' // Numéro du fournisseur 066444655
      const whatsappUrl = `https://wa.me/${numeroWhatsApp}?text=${encodedMessage}`
      
      // Ouvrir WhatsApp dans un nouvel onglet
      window.open(whatsappUrl, '_blank')
      
      // Afficher le message de succès
      setSubmitStatus('success')
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: ''
      })
      setTimeout(() => setSubmitStatus('idle'), 5000)
      
    } catch (error) {
      console.error('Erreur:', error)
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
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#c4a35a]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#c4a35a]/5 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a35a]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}>
            <span className="border-b-2 border-[#c4a35a] pb-1">Contactez-nous</span>
          </h2>
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c4a35a]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c4a35a]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c4a35a]" />
          </div>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto mt-6">
            Remplissez le formulaire ci-dessous et nous vous répondrons par WhatsApp dans les plus brefs délais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Colonne gauche - Informations de contact */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 h-full">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"
              style={{ fontFamily: 'Georgia, serif' }}>
              <MapPin size={22} className="text-[#c4a35a]" />
              Nos coordonnées
            </h3>
            
            <div className="space-y-6">
              {/* Adresse */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#c4a35a]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c4a35a] transition-colors duration-300">
                  <MapPin size={18} className="text-[#c4a35a] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Adresse</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    L&apos;hivernage, Marrakech, Morocco
                  </p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#c4a35a]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c4a35a] transition-colors duration-300">
                  <Phone size={18} className="text-[#c4a35a] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Téléphone</h4>
                  <p className="text-gray-500 text-sm">
                    +212 6 66 44 46 55
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#c4a35a]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c4a35a] transition-colors duration-300">
                  <MessageCircle size={18} className="text-[#c4a35a] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">WhatsApp</h4>
                  <a 
                    href="https://wa.me/212666444655" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c4a35a] text-sm hover:underline"
                  >
                    +212 6 66 44 46 55
                  </a>
                  <p className="text-gray-400 text-xs mt-1">Disponible 24h/24</p>
                </div>
              </div>

              {/* Horaires */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-[#c4a35a]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c4a35a] transition-colors duration-300">
                  <Clock size={18} className="text-[#c4a35a] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Horaires d&apos;ouverture</h4>
                  <p className="text-gray-500 text-sm">
                    Lundi - Dimanche: 9h00 - 23h00<br />
                    Réservation WhatsApp: 24h/24
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Formulaire de contact */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 h-full">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"
              style={{ fontFamily: 'Georgia, serif' }}>
              <Send size={22} className="text-[#c4a35a]" />
              Envoyez-nous un message
            </h3>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-in fade-in slide-in-from-top-5 duration-500">
                <p className="text-green-700 text-sm">✅ Message envoyé avec succès ! WhatsApp s&apos;ouvre pour finaliser l&apos;envoi.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-in fade-in slide-in-from-top-5 duration-500">
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
                      focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 
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
                      focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 
                      transition-all duration-200 bg-gray-50 text-gray-800"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2 font-medium">
                    Téléphone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm 
                      focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 
                      transition-all duration-200 bg-gray-50 text-gray-800"
                    placeholder="+212 6 66 44 46 55"
                  />
                  <p className="text-xs text-gray-400 mt-1">Nous vous répondrons sur ce numéro WhatsApp</p>
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
                      focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 
                      transition-all duration-200 bg-gray-50 text-gray-800"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="Réservation">🚗 Réservation</option>
                    <option value="Demande d&apos;information">ℹ️ Demande d&apos;information</option>
                    <option value="Demande de devis">💰 Demande de devis</option>
                    <option value="Réclamation">⚠️ Réclamation</option>
                    <option value="Autre">📝 Autre</option>
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
                    focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 
                    transition-all duration-200 bg-gray-50 text-gray-800 resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden bg-gradient-to-r from-[#c4a35a] to-[#e6c97a] 
                  text-white py-4 rounded-xl text-sm tracking-[3px] uppercase font-semibold
                  hover:shadow-xl hover:shadow-[#c4a35a]/30 transition-all duration-300
                  disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer via WhatsApp'}
                  {!isSubmitting && <MessageCircle size={16} className="group-hover:translate-x-1 transition-transform" />}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#d4b574] to-[#b3924a] 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </form>

            {/* Note supplémentaire */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
                <MessageCircle size={14} className="text-[#c4a35a]" />
                En cliquant sur &quot;Envoyer via WhatsApp&quot;, vous serez redirigé vers WhatsApp pour finaliser l&apos;envoi de votre message.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}