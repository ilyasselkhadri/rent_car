'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { 
  X, ChevronLeft, ChevronRight, Fuel, Users, Gauge, Check, 
  SlidersHorizontal, Award, Calendar, DoorOpen, ChevronDown, 
  ChevronUp 
} from 'lucide-react'

// Types
type CarImage = { url: string; legende?: string }
type Car = {
  id: number
  nom: string
  brand: string
  type: string
  transmission: string
  carburant: string
  couleur?: string
  prix: number
  prixSemaine?: number
  prixMois?: number
  description?: string
  details?: {
    annee?: number
    kilometrage?: number
    places?: number
    portes?: number
    climatisation?: boolean
    gps?: boolean
    bluetooth?: boolean
    camera?: boolean
    toitOuvrant?: boolean
    siegesChauffants?: boolean
  }
  featured?: boolean
  disponible?: boolean
  imageprincipale?: { url: string }
  galerie?: { image?: { url: string }; legende?: string }[]
}

// Liste complète des marques
const brandOptions = [
  // Françaises
  'dacia', 'renault', 'peugeot', 'citroen', 'ds', 'bugatti',
  // Allemandes
  'volkswagen', 'bmw', 'mercedes', 'audi', 'porsche', 'opel', 'smart',
  // Britanniques
  'landrover', 'rangerover', 'jaguar', 'bentley', 'rollsroyce', 'mini', 'lotus', 'astonmartin', 'mclaren',
  // Japonaises
  'toyota', 'honda', 'nissan', 'mazda', 'mitsubishi', 'subaru', 'suzuki', 'lexus', 'infiniti',
  // Coréennes
  'hyundai', 'kia', 'genesis',
  // Américaines
  'ford', 'chevrolet', 'tesla', 'jeep', 'dodge', 'cadillac', 'lincoln', 'gmc', 'rivian',
  // Italiennes
  'fiat', 'ferrari', 'lamborghini', 'maserati', 'alfaromeo', 'lancia',
  // Espagnoles
  'seat', 'cupra',
  // Tchèques
  'skoda',
  // Suédoises
  'volvo', 'polestar',
  // Chinoises
  'byd', 'mg', 'greatwall', 'nio', 'xpeng',
  // Autre
  'autre'
]

// Labels des marques
const getBrandLabel = (brandValue: string): string => {
  const brands: Record<string, string> = {
    // Françaises
    'dacia': 'Dacia', 'renault': 'Renault', 'peugeot': 'Peugeot', 'citroen': 'Citroën', 'ds': 'DS Automobiles', 'bugatti': 'Bugatti',
    // Allemandes
    'volkswagen': 'Volkswagen', 'bmw': 'BMW', 'mercedes': 'Mercedes-Benz', 'audi': 'Audi', 'porsche': 'Porsche', 'opel': 'Opel', 'smart': 'Smart',
    // Britanniques
    'landrover': 'Land Rover', 'rangerover': 'Range Rover', 'jaguar': 'Jaguar', 'bentley': 'Bentley', 'rollsroyce': 'Rolls-Royce', 'mini': 'Mini', 'lotus': 'Lotus', 'astonmartin': 'Aston Martin', 'mclaren': 'McLaren',
    // Japonaises
    'toyota': 'Toyota', 'honda': 'Honda', 'nissan': 'Nissan', 'mazda': 'Mazda', 'mitsubishi': 'Mitsubishi', 'subaru': 'Subaru', 'suzuki': 'Suzuki', 'lexus': 'Lexus', 'infiniti': 'Infiniti',
    // Coréennes
    'hyundai': 'Hyundai', 'kia': 'Kia', 'genesis': 'Genesis',
    // Américaines
    'ford': 'Ford', 'chevrolet': 'Chevrolet', 'tesla': 'Tesla', 'jeep': 'Jeep', 'dodge': 'Dodge', 'cadillac': 'Cadillac', 'lincoln': 'Lincoln', 'gmc': 'GMC', 'rivian': 'Rivian',
    // Italiennes
    'fiat': 'Fiat', 'ferrari': 'Ferrari', 'lamborghini': 'Lamborghini', 'maserati': 'Maserati', 'alfaromeo': 'Alfa Romeo', 'lancia': 'Lancia',
    // Espagnoles
    'seat': 'Seat', 'cupra': 'Cupra',
    // Tchèques
    'skoda': 'Skoda',
    // Suédoises
    'volvo': 'Volvo', 'polestar': 'Polestar',
    // Chinoises
    'byd': 'BYD', 'mg': 'MG', 'greatwall': 'Great Wall', 'nio': 'Nio', 'xpeng': 'Xpeng',
    // Autre
    'autre': 'Autre'
  }
  return brands[brandValue] || brandValue.charAt(0).toUpperCase() + brandValue.slice(1)
}

const transmissionOptions = ['manuelle', 'automatique']

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// Icône Odometer
const OdometerIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

// Modal Détail Voiture
function CarModal({ car, onClose }: { car: Car; onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Récupérer toutes les images (principale + galerie)
  const allImages: CarImage[] = [
    ...(car.imageprincipale?.url ? [{ url: car.imageprincipale.url, legende: 'Vue principale' }] : []),
    ...(car.galerie ?? []).filter(g => g.image?.url).map(g => ({
      url: g.image!.url,
      legende: g.legende ?? '',
    })),
  ]

  const prev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIdx(i => (i === 0 ? allImages.length - 1 : i - 1))
    setTimeout(() => setIsAnimating(false), 300)
  }

  const next = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIdx(i => (i === allImages.length - 1 ? 0 : i + 1))
    setTimeout(() => setIsAnimating(false), 300)
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleReserver = () => {
    window.open('https://wa.me/212666444655', '_blank')
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
          {/* Galerie d'images */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="relative w-full h-72 sm:h-96 lg:h-80 xl:h-96 overflow-hidden">
              {allImages[activeIdx]?.url ? (
                <Image
                  src={allImages[activeIdx].url}
                  alt={car.nom}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-300 text-7xl">🚗</span>
                </div>
              )}

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#c4a35a]
                      text-white w-10 h-10 rounded-full flex items-center justify-center
                      transition-all duration-300 backdrop-blur-sm hover:scale-110"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#c4a35a]
                      text-white w-10 h-10 rounded-full flex items-center justify-center
                      transition-all duration-300 backdrop-blur-sm hover:scale-110"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white
                text-xs px-3 py-1.5 rounded-full tracking-wide">
                {activeIdx + 1} / {Math.max(allImages.length, 1)}
              </div>
            </div>

            {/* Miniatures de la galerie */}
            {allImages.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden
                      border-2 transition-all duration-200 hover:scale-105
                      ${i === activeIdx ? 'border-[#c4a35a] shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <Image src={img.url} alt={`thumb ${i}`} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations */}
          <div className="p-8 space-y-6 overflow-y-auto">
            <div className="animate-in slide-in-from-right-5 duration-500">
              <p className="text-[#c4a35a] text-xs tracking-[4px] uppercase mb-2 font-semibold">
                {getBrandLabel(car.brand)} · {cap(car.type)}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight"
                style={{ fontFamily: 'Georgia, serif' }}>
                {car.nom}
              </h2>
              {car.couleur && (
                <p className="text-gray-400 text-sm mt-2">Couleur : {car.couleur}</p>
              )}
            </div>

            {/* Prix */}
            <div className="bg-gradient-to-br from-[#faf9f6] to-white rounded-xl p-5 border border-[#c4a35a]/20 shadow-lg">
              <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl md:text-5xl font-bold text-[#c4a35a] leading-none">
                  {car.prix}
                </span>
                <span className="text-gray-400 text-sm mb-1">MAD / jour</span>
              </div>
              <div className="flex gap-6">
                {car.prixSemaine && (
                  <div>
                    <p className="text-gray-400 text-[10px] tracking-[1px] uppercase">Semaine</p>
                    <p className="text-gray-700 text-base font-semibold">{car.prixSemaine} MAD</p>
                  </div>
                )}
                {car.prixMois && (
                  <div>
                    <p className="text-gray-400 text-[10px] tracking-[1px] uppercase">Mois</p>
                    <p className="text-gray-700 text-base font-semibold">{car.prixMois} MAD</p>
                  </div>
                )}
              </div>
            </div>

            {/* Détails techniques */}
            <div>
              <p className="text-gray-500 text-xs tracking-[3px] uppercase mb-4 pb-2 border-b border-gray-100">
                Détails techniques
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                  <Fuel size={18} className="text-[#c4a35a]" />
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase">Carburant</p>
                    <p className="text-gray-700 text-sm font-semibold">{cap(car.carburant)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                  <Gauge size={18} className="text-[#c4a35a]" />
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase">Transmission</p>
                    <p className="text-gray-700 text-sm font-semibold">{cap(car.transmission)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                  <Users size={18} className="text-[#c4a35a]" />
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase">Places</p>
                    <p className="text-gray-700 text-sm font-semibold">{car.details?.places ?? 5}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                  <DoorOpen size={18} className="text-[#c4a35a]" />
                  <div>
                    <p className="text-gray-400 text-[10px] uppercase">Portes</p>
                    <p className="text-gray-700 text-sm font-semibold">{car.details?.portes ?? 4}</p>
                  </div>
                </div>
                
                {car.details?.annee && (
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                    <Calendar size={18} className="text-[#c4a35a]" />
                    <div>
                      <p className="text-gray-400 text-[10px] uppercase">Année</p>
                      <p className="text-gray-700 text-sm font-semibold">{car.details.annee}</p>
                    </div>
                  </div>
                )}
                
                {car.details?.kilometrage && car.details.kilometrage > 0 && (
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                    <OdometerIcon size={18} className="text-[#c4a35a]" />
                    <div>
                      <p className="text-gray-400 text-[10px] uppercase">Kilométrage</p>
                      <p className="text-gray-700 text-sm font-semibold">{car.details.kilometrage.toLocaleString()} km</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Équipements */}
            <div>
              <p className="text-gray-500 text-xs tracking-[3px] uppercase mb-4 pb-2 border-b border-gray-100">
                Équipements
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Climatisation', v: car.details?.climatisation },
                  { label: 'GPS', v: car.details?.gps },
                  { label: 'Bluetooth', v: car.details?.bluetooth },
                  { label: 'Caméra recul', v: car.details?.camera },
                  { label: 'Toit ouvrant', v: car.details?.toitOuvrant },
                  { label: 'Sièges chauffants', v: car.details?.siegesChauffants },
                ].map((eq, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105
                      ${eq.v ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-100'}`}
                  >
                    <Check size={16} className={eq.v ? 'text-green-500' : 'text-gray-300'} />
                    <span className={`text-sm font-medium ${eq.v ? 'text-green-700' : 'text-gray-400'}`}>
                      {eq.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {car.description && (
              <div>
                <p className="text-gray-500 text-xs tracking-[3px] uppercase mb-3 pb-2 border-b border-gray-100">
                  Description
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{car.description}</p>
              </div>
            )}

            <button
              onClick={handleReserver}
              className="w-full text-center text-white bg-gradient-to-r from-[#c4a35a] to-[#e6c97a] py-4 rounded-xl
                text-sm tracking-[3px] uppercase font-semibold hover:shadow-xl hover:shadow-[#c4a35a]/30
                transition-all duration-300 hover:scale-105"
            >
              Réserver sur WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Section Principale
export default function CarsSection({ initialCars }: { initialCars: Car[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [nom, setNom] = useState('')
  const [brand, setBrand] = useState('')
  const [transmission, setTransmission] = useState('')
  const [kilometrageMax, setKilometrageMax] = useState('')
  const [anneeMin, setAnneeMin] = useState('')
  const [anneeMax, setAnneeMax] = useState('')
  const [cars, setCars] = useState<Car[]>(initialCars)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Car | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)

  // Filtrage
  useEffect(() => {
    const hasFilter = nom || brand || transmission || kilometrageMax || anneeMin || anneeMax
    if (!hasFilter) { 
      setCars(initialCars)
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (nom) params.set('nom', nom)
        if (brand) params.set('brand', brand)
        if (transmission) params.set('transmission', transmission)
        if (kilometrageMax) params.set('kilometrageMax', kilometrageMax)
        if (anneeMin) params.set('anneeMin', anneeMin)
        if (anneeMax) params.set('anneeMax', anneeMax)
        
        const res = await fetch(`/api/cars-filter?${params.toString()}`)
        const data = await res.json()
        setCars(data.docs ?? [])
      } catch (error) {
        console.error('Erreur filtrage:', error)
        setCars([])
      } finally {
        setLoading(false)
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [nom, brand, transmission, kilometrageMax, anneeMin, anneeMax, initialCars])

  const resetFilters = () => {
    setNom('')
    setBrand('')
    setTransmission('')
    setKilometrageMax('')
    setAnneeMin('')
    setAnneeMax('')
  }

  const hasFilter = !!(nom || brand || transmission || kilometrageMax || anneeMin || anneeMax)

  // Grouper les marques par catégorie pour le select
  const brandGroups = [
    { label: "Françaises", brands: ['dacia', 'renault', 'peugeot', 'citroen', 'ds', 'bugatti'] },
    { label: "Allemandes", brands: ['volkswagen', 'bmw', 'mercedes', 'audi', 'porsche', 'opel', 'smart'] },
    { label: "Britanniques", brands: ['landrover', 'rangerover', 'jaguar', 'bentley', 'rollsroyce', 'mini', 'lotus', 'astonmartin', 'mclaren'] },
    { label: "Japonaises", brands: ['toyota', 'honda', 'nissan', 'mazda', 'mitsubishi', 'subaru', 'suzuki', 'lexus', 'infiniti'] },
    { label: "Coréennes", brands: ['hyundai', 'kia', 'genesis'] },
    { label: "Américaines", brands: ['ford', 'chevrolet', 'tesla', 'jeep', 'dodge', 'cadillac', 'lincoln', 'gmc', 'rivian'] },
    { label: "Italiennes", brands: ['fiat', 'ferrari', 'lamborghini', 'maserati', 'alfaromeo', 'lancia'] },
    { label: "Espagnoles", brands: ['seat', 'cupra'] },
    { label: "Tchèques", brands: ['skoda'] },
    { label: "Suédoises", brands: ['volvo', 'polestar'] },
    { label: "Chinoises", brands: ['byd', 'mg', 'greatwall', 'nio', 'xpeng'] },
    { label: "Autres", brands: ['autre'] },
  ]

  return (
    <>
      <section id="voitures" ref={sectionRef} className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        
        {/* Décorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#c4a35a]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#c4a35a]/5 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

          {/* Titre */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-3 mb-4">
              <span className="text-[#c4a35a] text-xl">✦</span>
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400">Notre Parc Auto</span>
              <span className="text-[#c4a35a] text-xl">✦</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
              style={{ fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>
              <span className="border-b-2 border-[#c4a35a] pb-2">Location de Véhicules</span>
            </h2>
            <div className="flex justify-center gap-2 mt-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c4a35a]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#c4a35a]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#c4a35a]" />
            </div>
          </div>

          {/* Filtres */}
          <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border border-gray-200
            rounded-2xl shadow-xl mb-12 animate-in slide-in-from-top-5 duration-500 overflow-hidden">
            
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-[#c4a35a]" />
                <span className="text-sm tracking-[3px] uppercase text-gray-600 font-semibold">
                  Filtrer les véhicules
                </span>
                {hasFilter && (
                  <span className="ml-2 text-xs bg-[#c4a35a] text-white px-2 py-1 rounded-full">
                    Actif
                  </span>
                )}
              </div>
              <div className="text-[#c4a35a]">
                {filterOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>

            <div 
              className={`transition-all duration-500 ease-in-out ${
                filterOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-6 pt-0 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2 font-medium">
                      Nom
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ex: Duster, Clio..." 
                      value={nom} 
                      onChange={e => setNom(e.target.value)} 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm 
                        focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 
                        transition-all duration-200 bg-white text-gray-800"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2 font-medium">
                      Marque
                    </label>
                    <select 
                      value={brand} 
                      onChange={e => setBrand(e.target.value)} 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm 
                        focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 
                        transition-all duration-200 bg-white text-gray-800"
                    >
                      <option value="">Toutes les marques</option>
                      {brandGroups.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                          {group.brands.map(b => (
                            <option key={b} value={b}>{getBrandLabel(b)}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2 font-medium">
                      Transmission
                    </label>
                    <select 
                      value={transmission} 
                      onChange={e => setTransmission(e.target.value)} 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm 
                        focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 
                        transition-all duration-200 bg-white text-gray-800"
                    >
                      <option value="">Toutes</option>
                      {transmissionOptions.map(t => <option key={t} value={t}>{cap(t)}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2 font-medium">
                      Kilométrage max (km)
                    </label>
                    <select 
                      value={kilometrageMax} 
                      onChange={e => setKilometrageMax(e.target.value)} 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm 
                        focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 
                        transition-all duration-200 bg-white text-gray-800"
                    >
                      <option value="">Tous</option>
                      <option value="10000">Moins de 10 000 km</option>
                      <option value="20000">Moins de 20 000 km</option>
                      <option value="30000">Moins de 30 000 km</option>
                      <option value="50000">Moins de 50 000 km</option>
                      <option value="75000">Moins de 75 000 km</option>
                      <option value="100000">Moins de 100 000 km</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2 font-medium">
                      Année (min)
                    </label>
                    <input 
                      type="number" 
                      placeholder="Ex: 2020" 
                      value={anneeMin} 
                      onChange={e => setAnneeMin(e.target.value)} 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm 
                        focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 
                        transition-all duration-200 bg-white text-gray-800"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs tracking-[2px] uppercase text-gray-500 mb-2 font-medium">
                      Année (max)
                    </label>
                    <input 
                      type="number" 
                      placeholder="Ex: 2025" 
                      value={anneeMax} 
                      onChange={e => setAnneeMax(e.target.value)} 
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm 
                        focus:border-[#c4a35a] focus:ring-2 focus:ring-[#c4a35a]/20 
                        transition-all duration-200 bg-white text-gray-800"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#c4a35a]"></span>
                        Recherche...
                      </span>
                    ) : (
                      `${cars.length} véhicule${cars.length > 1 ? 's' : ''} trouvé${cars.length > 1 ? 's' : ''}`
                    )}
                  </span>
                  {hasFilter && (
                    <button 
                      onClick={resetFilters} 
                      className="text-sm text-[#c4a35a] hover:text-[#b3924a] transition-colors flex items-center gap-1"
                    >
                      <X size={14} /> Effacer tous les filtres
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Grille des voitures */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                  <div className="w-full h-52 bg-gradient-to-r from-gray-200 to-gray-300" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 rounded w-2/3" />
                    <div className="h-8 bg-gray-200 rounded w-full mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-32 animate-in zoom-in duration-500">
              <div className="text-gray-300 text-6xl mb-6 animate-bounce">🚗</div>
              <p className="text-gray-400 text-sm tracking-[3px] uppercase mb-4">Aucun véhicule trouvé</p>
              <button onClick={resetFilters} className="text-sm text-[#c4a35a] hover:underline">
                Effacer les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cars.map((car, index) => {
                const img = car.imageprincipale?.url ?? null
                const nbPhotos = 1 + (car.galerie?.length ?? 0)

                return (
                  <div
                    key={car.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-in fade-in zoom-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelected(car)}
                  >
                    <div className="relative w-full h-52 overflow-hidden bg-gray-100">
                      {car.featured && (
                        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#c4a35a] to-[#e6c97a] text-white
                          text-[10px] tracking-[2px] uppercase px-3 py-1.5 rounded-full shadow-lg">
                          <Award size={10} className="inline mr-1" />
                          Populaire
                        </div>
                      )}
                      {img ? (
                        <Image 
                          src={img} 
                          alt={car.nom} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110" 
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                          <span className="text-gray-300 text-5xl">🚗</span>
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">
                        📷 {nbPhotos}
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-[#c4a35a] text-[10px] tracking-[3px] uppercase mb-2 font-semibold">
                        {getBrandLabel(car.brand).toUpperCase()}
                      </p>
                      <h3 className="text-gray-800 mb-2 leading-snug font-bold text-lg" 
                          style={{ fontFamily: 'Georgia, serif' }}>
                        {car.nom}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Fuel size={12} /> {cap(car.carburant)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Gauge size={12} /> {cap(car.transmission)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} /> {car.details?.places ?? 5}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-[#c4a35a]">{car.prix}</span>
                          <span className="text-gray-400 text-xs ml-1">MAD/j</span>
                        </div>
                        <button className="text-[11px] tracking-[1.5px] uppercase text-white
                          bg-gradient-to-r from-gray-800 to-gray-700 hover:from-[#c4a35a] hover:to-[#e6c97a]
                          px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:scale-105">
                          Détails
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {selected && <CarModal car={selected} onClose={() => setSelected(null)} />}
    </>
  )
}