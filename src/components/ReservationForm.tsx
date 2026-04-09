// components/ReservationForm.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Send, Phone, User, MessageSquare, Car, Calendar, Clock, CheckCircle, X } from 'lucide-react'

type Car = {
  id: number
  nom: string
  brand: string
  type: string
  transmission: string
  carburant: string
  prix: number
  imageprincipale?: { url: string }
  details?: {
    annee?: number
    places?: number
  }
}

interface ReservationFormProps {
  carId?: string | null
  onClose: () => void
}

export default function ReservationForm({ carId, onClose }: ReservationFormProps) {
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const [formData, setFormData] = useState({
    nomComplet: '',
    tel: '',
    dateDebut: '',
    dateFin: '',
    message: ''
  })

  // Récupérer les informations de la voiture
  useEffect(() => {
    if (carId) {
      fetch(`/api/cars/${carId}`)
        .then(res => res.json())
        .then(data => {
          setCar(data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Erreur:', error)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [carId])

  // Empêcher le scroll du body quand le modal est ouvert
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Envoyer le message WhatsApp sans photo
  const sendWhatsAppMessage = () => {
    const numeroWhatsApp = '212666444655'
    
    // Calculer le nombre de jours et le prix total
    let totalPrice = ''
    if (formData.dateDebut && formData.dateFin && car?.prix) {
      const start = new Date(formData.dateDebut)
      const end = new Date(formData.dateFin)
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      const total = days * car.prix
      totalPrice = `\n\n*📊 RÉCAPITULATIF* :\n*📆 Durée* : ${days} jour(s)\n*💰 Total* : ${total} MAD`
    }
    
    const message = `*🏁 NOUVELLE RÉSERVATION DE VÉHICULE 🏁*\n\n` +
      `*🚗 VÉHICULE* : ${car?.nom || 'N/A'} (${car?.brand || 'N/A'})\n` +
      `*📅 ANNÉE* : ${car?.details?.annee || 'N/A'}\n` +
      `*⚙️ TRANSMISSION* : ${car?.transmission || 'N/A'}\n` +
      `*⛽ CARBURANT* : ${car?.carburant || 'N/A'}\n` +
      `*💰 PRIX* : ${car?.prix || 'N/A'} MAD/jour\n\n` +
      `*👤 NOM COMPLET* : ${formData.nomComplet}\n` +
      `*📞 TÉLÉPHONE* : ${formData.tel}\n\n` +
      `*📅 DATE DÉBUT* : ${new Date(formData.dateDebut).toLocaleDateString('fr-FR') || 'Non spécifiée'}\n` +
      `*📅 DATE FIN* : ${new Date(formData.dateFin).toLocaleDateString('fr-FR') || 'Non spécifiée'}${totalPrice}\n\n` +
      `*💬 MESSAGE* :\n${formData.message || 'Aucun message'}\n\n` +
      `*🕐 DATE DE DEMANDE* : ${new Date().toLocaleString('fr-FR')}\n\n` +
      `_✅ En attente de confirmation_`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${numeroWhatsApp}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      sendWhatsAppMessage()
      setTimeout(() => {
        setSubmitted(true)
      }, 500)
    } catch (error) {
      console.error('Erreur:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c4a35a] mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement des informations...</p>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center relative animate-in zoom-in duration-300">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Réservation envoyée !</h2>
          <p className="text-gray-500 mb-4">
            Votre demande de réservation a été envoyée avec succès.
          </p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-[#c4a35a] to-[#e6c97a] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all w-full"
          >
            Fermer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-[#c4a35a] hover:text-white
            text-gray-700 w-10 h-10 rounded-full flex items-center justify-center
            transition-all duration-300 shadow-md hover:scale-110"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Colonne gauche - Informations voiture */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
            <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-6">
              {car?.imageprincipale?.url ? (
                <Image
                  src={car.imageprincipale.url}
                  alt={car.nom}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <Car size={48} className="text-gray-500" />
                </div>
              )}
            </div>
            
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              {car?.nom}
            </h3>
            <p className="text-[#c4a35a] text-xs tracking-[3px] uppercase mb-4">
              {car?.brand?.toUpperCase()} · {car?.type}
            </p>
            
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-[#c4a35a]">{car?.prix}</span>
              <span className="text-gray-400 text-sm">MAD / jour</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Car size={14} className="text-[#c4a35a]" />
                <span>{car?.carburant}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Calendar size={14} className="text-[#c4a35a]" />
                <span>{car?.details?.annee || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <User size={14} className="text-[#c4a35a]" />
                <span>{car?.details?.places || 5} places</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock size={14} className="text-[#c4a35a]" />
                <span>{car?.transmission}</span>
              </div>
            </div>
          </div>
          
          {/* Colonne droite - Formulaire de réservation */}
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MessageSquare size={20} className="text-[#c4a35a]" />
              Formulaire de réservation
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nom Complet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User size={16} className="text-[#c4a35a]" />
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="nomComplet"
                  required
                  value={formData.nomComplet}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 transition-all duration-200 bg-white text-gray-900"
                  placeholder="Jean Dupont"
                />
              </div>
              
              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Phone size={16} className="text-[#c4a35a]" />
                  Téléphone (WhatsApp) *
                </label>
                <input
                  type="tel"
                  name="tel"
                  required
                  value={formData.tel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 transition-all duration-200 bg-white text-gray-900"
                  placeholder="+212 6 12 34 56 78"
                />
                <p className="text-xs text-gray-400 mt-1">Nous vous contacterons sur ce numéro WhatsApp</p>
              </div>
              
              {/* Dates de location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} className="text-[#c4a35a]" />
                    Date début *
                  </label>
                  <input
                    type="date"
                    name="dateDebut"
                    required
                    value={formData.dateDebut}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 transition-all duration-200 bg-white text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} className="text-[#c4a35a]" />
                    Date fin *
                  </label>
                  <input
                    type="date"
                    name="dateFin"
                    required
                    value={formData.dateFin}
                    onChange={handleChange}
                    min={formData.dateDebut || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 transition-all duration-200 bg-white text-gray-900"
                  />
                </div>
              </div>
              
              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MessageSquare size={16} className="text-[#c4a35a]" />
                  Message (optionnel)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 transition-all duration-200 resize-none bg-white text-gray-900"
                  placeholder="Informations supplémentaires, questions, etc..."
                />
              </div>
              
              {/* Bouton de soumission */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#c4a35a] to-[#e6c97a] text-white py-4 rounded-xl
                  font-semibold text-sm tracking-[2px] uppercase hover:shadow-xl hover:shadow-[#c4a35a]/30
                  transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Confirmer la réservation
                  </>
                )}
              </button>
            </form>
            
            {/* Informations supplémentaires */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">
                En soumettant ce formulaire, vous acceptez nos conditions générales de location.<br />
                Un message WhatsApp sera envoyé au fournisseur pour confirmer votre réservation.
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Phone size={12} className="text-[#c4a35a]" />
                <p className="text-[10px] text-gray-400">Contact fournisseur: 06 66 44 46 55</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}