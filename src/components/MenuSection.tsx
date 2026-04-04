'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  X, ChevronLeft, ChevronRight,
  Search, Star, Utensils,
  ShoppingCart, ChevronDown,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type MediaDoc = {
  id: number
  url: string
  filename?: string
  alt?: string
  sizes?: {
    thumbnail?: { url: string }
    card?: { url: string }
    full?: { url: string }
  }
}

type PlatImage = { url: string; legende?: string }

type Plat = {
  id: number
  nom: string
  categorie: string
  prix: number
  prixPromotion?: number
  description: string
  options?: { nomOption: string; prixOption: number }[]
  disponible?: boolean
  popularite?: number
  featured?: boolean
  image?: MediaDoc
  galerie?: { image?: MediaDoc; legende?: string }[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const BUCKET = 'smoky-burgers-media'

/**
 * Nettoie un chemin d'image en enlevant les préfixes indésirables
 */
function cleanImagePath(path: string): string {
  if (!path) return ''
  
  let cleaned = path
  
  // Enlever le préfixe de l'API Payload si présent
  cleaned = cleaned.replace(/^\/api\/media\/file\//, '')
  
  // Enlever les slashes en trop
  cleaned = cleaned.replace(/^\/+/, '').replace(/\/+$/, '')
  
  // Si c'est un chemin complet Supabase, extraire juste le filename
  if (cleaned.includes('supabase.co')) {
    const parts = cleaned.split('/')
    cleaned = parts[parts.length - 1]
  }
  
  // Si le chemin contient encore des slashes, prendre le dernier segment
  if (cleaned.includes('/')) {
    const parts = cleaned.split('/')
    cleaned = parts[parts.length - 1]
  }
  
  return cleaned
}

/**
 * Résout l'URL publique d'une image stockée dans Supabase Storage.
 */
function resolveImageUrl(media: MediaDoc | undefined | null, size: 'thumbnail' | 'card' | 'full' | 'original' = 'original'): string | null {
  if (!media) return null

  // Cas 1: Si on a une URL complète Supabase
  if (media.url && media.url.includes('supabase.co')) {
    // Vérifier si on veut une taille spécifique
    if (size !== 'original' && media.sizes?.[size]?.url) {
      const sizedUrl = media.sizes[size]!.url
      if (sizedUrl.includes('supabase.co')) return sizedUrl
      
      // Nettoyer le chemin de la taille
      const cleanedSizedPath = cleanImagePath(sizedUrl)
      if (cleanedSizedPath) {
        return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${cleanedSizedPath}`
      }
    }
    return media.url
  }

  // Cas 2: Obtenir le filename depuis différents champs
  let filename = media.filename || media.url
  
  if (!filename) return null
  
  // Nettoyer le filename
  filename = cleanImagePath(filename)
  
  if (!filename) return null

  // Cas 3: Si on demande une taille spécifique
  if (size !== 'original' && media.sizes?.[size]?.url) {
    const sizedPath = cleanImagePath(media.sizes[size]!.url)
    if (sizedPath) {
      return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${sizedPath}`
    }
  }

  // Retourner l'URL de l'image originale
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filename}`
}

// Catégories complètes
const categories = [
  { label: 'Top des ventes', value: 'top_ventes' },
  { label: 'Entrées', value: 'entrees' },
  { label: 'Burgers Beef Seul', value: 'burgers_beef_seul' },
  { label: 'Burger Beef Menu', value: 'burger_beef_menu' },
  { label: 'Burgers Chicken Seul', value: 'burgers_chicken_seul' },
  { label: 'Burger Chicken Menu', value: 'burger_chicken_menu' },
  { label: 'Burgers Veggie Seul', value: 'burgers_veggie_seul' },
  { label: 'Burger Veggie Menu', value: 'burger_veggie_menu' },
  { label: 'Frites', value: 'frites' },
  { label: 'Homemade Sauce (50gr)', value: 'homemade_sauce' },
  { label: 'Desserts', value: 'desserts' },
  { label: 'Boissons & Jus', value: 'boissons_jus' },
]

const ITEMS_PER_PAGE = 8

const cap = (s: string): string => {
  const map: Record<string, string> = {
    top_ventes: 'Top des ventes',
    entrees: 'Entrées',
    burgers_beef_seul: 'Burgers Beef Seul',
    burger_beef_menu: 'Burger Beef Menu',
    burgers_chicken_seul: 'Burgers Chicken Seul',
    burger_chicken_menu: 'Burger Chicken Menu',
    burgers_veggie_seul: 'Burgers Veggie Seul',
    burger_veggie_menu: 'Burger Veggie Menu',
    frites: 'Frites',
    homemade_sauce: 'Homemade Sauce',
    desserts: 'Desserts',
    boissons_jus: 'Boissons & Jus',
  }
  return map[s] ?? s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, ' ')
}

// ─── Composant Image avec fallback ────────────────────────────────────────────

function SafeImage({ src, alt, className, fill = false, sizes = "100vw" }: { 
  src: string | null, 
  alt: string, 
  className?: string,
  fill?: boolean,
  sizes?: string
}) {
  const [error, setError] = useState(false)
  
  if (!src || error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className || ''}`}>
        <Utensils size={48} className="text-gray-300" />
      </div>
    )
  }
  
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        onError={() => setError(true)}
        unoptimized={src.includes('supabase.co')}
      />
    )
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      className={className}
      onError={() => setError(true)}
      unoptimized={src.includes('supabase.co')}
    />
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function PlatModal({ plat, onClose }: { plat: Plat; onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Construire la liste de toutes les images du plat
  const allImages: PlatImage[] = [
    ...(plat.image ? [{
      url: resolveImageUrl(plat.image, 'full') ?? resolveImageUrl(plat.image) ?? '',
      legende: plat.nom,
    }] : []),
    ...(plat.galerie ?? [])
      .filter(g => g.image)
      .map(g => ({
        url: resolveImageUrl(g.image!, 'full') ?? resolveImageUrl(g.image!) ?? '',
        legende: g.legende ?? '',
      })),
  ].filter(img => img.url && img.url.length > 0)

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

  const handleCommander = () => {
    window.open('https://glovoapp.com/fr/ma/casablanca/stores/smoky-burgers', '_blank')
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
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-red-600 hover:text-white
            text-gray-700 w-10 h-10 rounded-full flex items-center justify-center
            transition-all duration-300 shadow-md hover:scale-110"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Galerie */}
          <div className="bg-gradient-to-br from-red-900 to-orange-800">
            <div className="relative w-full h-72 sm:h-96 lg:h-80 xl:h-96 overflow-hidden">
              {allImages[activeIdx]?.url ? (
                <SafeImage
                  src={allImages[activeIdx].url}
                  alt={plat.nom}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Utensils size={80} className="text-gray-300" />
                </div>
              )}

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600
                      text-white w-10 h-10 rounded-full flex items-center justify-center
                      transition-all duration-300 backdrop-blur-sm hover:scale-110"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600
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

            {allImages.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden
                      border-2 transition-all duration-200 hover:scale-105
                      ${i === activeIdx ? 'border-red-500 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <SafeImage src={img.url} alt={`thumb ${i}`} fill sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Infos */}
          <div className="p-8 space-y-6 overflow-y-auto">
            <div className="animate-in slide-in-from-right-5 duration-500">
              <p className="text-red-600 text-xs tracking-[4px] uppercase mb-2 font-semibold">
                {cap(plat.categorie)}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                {plat.nom}
              </h2>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-5 border border-red-200 shadow-lg">
              <div className="flex items-end gap-3">
                {plat.prixPromotion ? (
                  <>
                    <span className="text-4xl md:text-5xl font-bold text-red-600 leading-none">
                      {plat.prixPromotion}
                    </span>
                    <span className="text-gray-400 text-sm mb-1">MAD</span>
                    <span className="text-gray-400 line-through text-lg ml-2">{plat.prix} MAD</span>
                  </>
                ) : (
                  <>
                    <span className="text-4xl md:text-5xl font-bold text-red-600 leading-none">
                      {plat.prix}
                    </span>
                    <span className="text-gray-400 text-sm mb-1">MAD</span>
                  </>
                )}
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-xs tracking-[3px] uppercase mb-4 pb-2 border-b border-gray-100">
                Description
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">{plat.description}</p>
            </div>

            {plat.options && plat.options.length > 0 && (
              <div>
                <p className="text-gray-500 text-xs tracking-[3px] uppercase mb-3 pb-2 border-b border-gray-100">
                  Options disponibles
                </p>
                <div className="space-y-2">
                  {plat.options.map((opt, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{opt.nomOption}</span>
                      <span className="text-red-600 font-semibold">+{opt.prixOption} MAD</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={handleCommander}
                className="w-full text-center text-white bg-gradient-to-r from-red-600 to-orange-500 py-4 rounded-xl
                  text-sm tracking-[3px] uppercase font-semibold hover:shadow-xl hover:shadow-red-500/30
                  transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Commander sur Glovo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section principale ───────────────────────────────────────────────────────

export default function MenuSection({ initialPlats }: { initialPlats: Plat[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategorie, setSelectedCategorie] = useState('')
  const [plats, setPlats] = useState<Plat[]>(initialPlats)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Plat | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const autoRotateInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const [totalPages, setTotalPages] = useState(Math.max(1, Math.ceil(initialPlats.length / ITEMS_PER_PAGE)))

  const stopAutoRotation = () => {
    if (autoRotateInterval.current) {
      clearInterval(autoRotateInterval.current)
      autoRotateInterval.current = null
    }
    setIsAutoRotating(false)
  }

  const startAutoRotation = () => {
    if (autoRotateInterval.current) clearInterval(autoRotateInterval.current)
    autoRotateInterval.current = setInterval(() => {
      setCurrentPage(prev => (prev >= totalPages ? 1 : prev + 1))
    }, 5000)
    setIsAutoRotating(true)
  }

  useEffect(() => {
    const newTotal = Math.max(1, Math.ceil(plats.length / ITEMS_PER_PAGE))
    setTotalPages(newTotal)
    if (currentPage > newTotal) setCurrentPage(newTotal)
  }, [plats.length, currentPage])

  useEffect(() => {
    if (!searchTerm && !selectedCategorie && totalPages > 1 && isAutoRotating) {
      startAutoRotation()
    } else {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current)
        autoRotateInterval.current = null
      }
    }
    return () => { if (autoRotateInterval.current) clearInterval(autoRotateInterval.current) }
  }, [searchTerm, selectedCategorie, totalPages, isAutoRotating])

  // Filtrage avec debounce
  useEffect(() => {
    const fetchPlats = async () => {
      if (!searchTerm && !selectedCategorie) {
        setPlats(initialPlats)
        setLoading(false)
        setCurrentPage(1)
        return
      }

      stopAutoRotation()
      setLoading(true)

      try {
        const params = new URLSearchParams()
        if (searchTerm.trim()) params.set('nom', searchTerm.trim())
        if (selectedCategorie) params.set('categorie', selectedCategorie)

        const res = await fetch(`/api/menu-filter?${params.toString()}`)
        const data = await res.json()
        setPlats(data.docs ?? [])
        setCurrentPage(1)
      } catch {
        setPlats([])
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(fetchPlats, 300)
    return () => clearTimeout(timer)
  }, [searchTerm, selectedCategorie, initialPlats])

  const handleCategorieSelect = (categorie: string) => {
    setSelectedCategorie(categorie)
    setIsMenuOpen(false)
    stopAutoRotation()
  }

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategorie('')
    if (totalPages > 1) setIsAutoRotating(true)
  }

  const getCurrentCategoryLabel = () => {
    if (!selectedCategorie) return 'Toutes les catégories'
    return categories.find(c => c.value === selectedCategorie)?.label ?? 'Toutes les catégories'
  }

  const hasActiveFilters = searchTerm || selectedCategorie
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentPlats = plats.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const goToPreviousPage = () => {
    stopAutoRotation()
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const goToNextPage = () => {
    stopAutoRotation()
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handlePageClick = (pageNum: number) => {
    stopAutoRotation()
    setCurrentPage(pageNum)
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section id="menu" ref={sectionRef} className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

          {/* Titre */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="border-b-2 border-red-600 pb-1">Notre Menu</span>
            </h2>
            <div className="flex justify-center gap-2 mt-4">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
            </div>
          </div>

          {/* Filtres */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Recherche */}
              <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-red-600 to-orange-500">
                <div className="relative bg-white rounded-2xl">
                  <input
                    type="text"
                    placeholder="Rechercher un plat par nom..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 pl-14 text-base rounded-2xl focus:outline-none bg-white text-gray-900 placeholder:text-gray-400"
                  />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600">
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Catégories */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 text-base font-semibold
                    bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-2xl
                    shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <span className="flex items-center gap-2">
                    <Utensils size={20} />
                    {getCurrentCategoryLabel()}
                  </span>
                  <ChevronDown className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} size={20} />
                </button>

                {isMenuOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl
                    border border-gray-100 overflow-hidden z-20 animate-in slide-in-from-top-2 duration-200 max-h-96 overflow-y-auto">
                    <button
                      onClick={() => handleCategorieSelect('')}
                      className={`w-full text-left px-6 py-3 transition-all duration-200 hover:bg-red-50
                        ${!selectedCategorie ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-700'}`}
                    >
                      Toutes les catégories
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat.value}
                        onClick={() => handleCategorieSelect(cat.value)}
                        className={`w-full text-left px-6 py-3 transition-all duration-200 hover:bg-red-50
                          ${selectedCategorie === cat.value ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-700'}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex items-center justify-between mt-4 px-2">
                <p className="text-sm text-gray-500">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600" />
                      Recherche en cours...
                    </span>
                  ) : (
                    `${plats.length} plat${plats.length > 1 ? 's' : ''} trouvé${plats.length > 1 ? 's' : ''}`
                  )}
                </p>
                <button onClick={resetFilters} className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1">
                  <X size={14} /> Effacer les filtres
                </button>
              </div>
            )}
          </div>

          {/* Grille */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
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
          ) : currentPlats.length === 0 ? (
            <div className="text-center py-32 animate-in zoom-in duration-500">
              <div className="text-gray-300 text-6xl mb-6 animate-bounce">🍔</div>
              <p className="text-gray-400 text-sm tracking-[3px] uppercase mb-4">Aucun plat trouvé</p>
              <button onClick={resetFilters} className="text-sm text-red-600 hover:text-red-700 underline">
                Effacer tous les filtres
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentPlats.map((plat, index) => {
                  // Résolution URL image depuis Supabase
                  const imgUrl = resolveImageUrl(plat.image, 'card')
                  const nbPhotos = 1 + (plat.galerie?.length ?? 0)
                  const hasPromo = !!plat.prixPromotion

                  return (
                    <div
                      key={plat.id}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-in fade-in zoom-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setSelected(plat)}
                    >
                      <div className="relative w-full h-52 overflow-hidden bg-gray-100">
                        {plat.featured && (
                          <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-600 to-orange-500 text-white
                            text-[10px] tracking-[2px] uppercase px-3 py-1.5 rounded-full shadow-lg">
                            <Star size={10} className="inline mr-1" />
                            Top vente
                          </div>
                        )}
                        {hasPromo && (
                          <div className="absolute top-3 right-3 z-10 bg-red-500 text-white
                            text-[10px] tracking-[2px] uppercase px-3 py-1.5 rounded-full shadow-lg">
                            -{Math.round((1 - plat.prixPromotion! / plat.prix) * 100)}%
                          </div>
                        )}

                        <SafeImage
                          src={imgUrl}
                          alt={plat.image?.alt ?? plat.nom}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />

                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">
                          📷 {nbPhotos}
                        </div>
                      </div>

                      <div className="p-5">
                        <p className="text-red-600 text-[10px] tracking-[3px] uppercase mb-2 font-semibold">
                          {cap(plat.categorie)}
                        </p>
                        <h3 className="text-gray-800 mb-2 leading-snug font-bold text-lg line-clamp-1">
                          {plat.nom}
                        </h3>
                        <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                          {plat.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div>
                            {hasPromo ? (
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-red-600">{plat.prixPromotion}</span>
                                <span className="text-gray-400 text-xs line-through">{plat.prix}</span>
                                <span className="text-gray-400 text-xs ml-1">MAD</span>
                              </div>
                            ) : (
                              <div>
                                <span className="text-2xl font-bold text-red-600">{plat.prix}</span>
                                <span className="text-gray-400 text-xs ml-1">MAD</span>
                              </div>
                            )}
                          </div>
                          <button className="text-[11px] tracking-[1.5px] uppercase text-white
                            bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600
                            px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:scale-105">
                            Détails
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <>
                  <div className="flex items-center justify-center gap-4 mt-12">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300
                        ${currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-600 to-orange-500 text-white hover:shadow-lg hover:scale-105'
                        }`}
                    >
                      <ChevronLeft size={18} />
                      Précédent
                    </button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageClick(pageNum)}
                          className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300
                            ${currentPage === pageNum
                              ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md scale-110'
                              : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 border border-gray-200'
                            }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300
                        ${currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-600 to-orange-500 text-white hover:shadow-lg hover:scale-105'
                        }`}
                    >
                      Suivant
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  <div className="text-center mt-4 text-sm text-gray-500">
                    Page {currentPage} sur {totalPages} • {plats.length} plat{plats.length > 1 ? 's' : ''} au total
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {selected && <PlatModal plat={selected} onClose={() => setSelected(null)} />}
    </>
  )
}