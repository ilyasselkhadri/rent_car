'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronDown, ChevronUp, Check, Loader2, RotateCcw } from 'lucide-react'

// ─── Config langues ────────────────────────────────────────
const languages = [
  { code: 'fr', label: 'Français', short: 'FR', flag: 'https://flagcdn.com/w40/fr.png', dir: 'ltr' },
  { code: 'en', label: 'English',  short: 'EN', flag: 'https://flagcdn.com/w40/gb.png', dir: 'ltr' },
  { code: 'es', label: 'Español',  short: 'ES', flag: 'https://flagcdn.com/w40/es.png', dir: 'ltr' },
  { code: 'ar', label: 'العربية', short: 'AR', flag: 'https://flagcdn.com/w40/sa.png', dir: 'rtl' },
]

// Fonction pour formater le label (première lettre en majuscule, reste en minuscule)
const formatLabel = (label: string) => {
  if (label === 'العربية') return label // Ne pas formater l'arabe
  return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()
}

// ─── Cache persistant localStorage ────────────────────────
const CACHE_KEY = 'vitrine_translations'

function loadCache(): Record<string, Record<string, string>> {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function saveCache(cache: Record<string, Record<string, string>>) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)) } catch {}
}

// ─── API de traduction avec double fallback ────────────────
async function translateText(text: string, from: string, to: string): Promise<string> {
  if (!text.trim() || from === to) return text

  // Fallback 1 : MyMemory (fiable, gratuit 5000 mots/jour)
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`,
      { signal: AbortSignal.timeout(5000) }
    )
    const data = await res.json()
    if (data?.responseStatus === 200 && data?.responseData?.translatedText) {
      const translated = data.responseData.translatedText
      // MyMemory retourne parfois le texte en majuscules si quota dépassé
      if (translated !== text.toUpperCase()) return translated
    }
  } catch {}

  // Fallback 2 : LibreTranslate public instance
  try {
    const res = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, source: from, target: to, format: 'text' }),
      signal: AbortSignal.timeout(5000),
    })
    const data = await res.json()
    if (data?.translatedText) return data.translatedText
  } catch {}

  // Fallback 3 : Lingva (instance alternative libre)
  try {
    const res = await fetch(
      `https://lingva.ml/api/v1/${from}/${to}/${encodeURIComponent(text)}`,
      { signal: AbortSignal.timeout(5000) }
    )
    const data = await res.json()
    if (data?.translation) return data.translation
  } catch {}

  return text // Retourner l'original si tout échoue
}

// ─── Collecte des nœuds texte du DOM ──────────────────────
const SKIP_TAGS = new Set(['script','style','noscript','code','pre','textarea','input','select'])
const originalMap = new WeakMap<Text, string>()

function collectTextNodes(root: Element): Text[] {
  const nodes: Text[] = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement
      if (!parent) return NodeFilter.FILTER_REJECT
      if (SKIP_TAGS.has(parent.tagName.toLowerCase())) return NodeFilter.FILTER_REJECT
      if (parent.closest('#floating-widgets')) return NodeFilter.FILTER_REJECT
      if (parent.closest('[data-no-translate]')) return NodeFilter.FILTER_REJECT
      const text = node.textContent?.trim()
      if (!text || text.length < 2) return NodeFilter.FILTER_REJECT
      // Ignorer les textes qui sont juste des chiffres / symboles
      if (/^[\d\s\.,€$%+\-/:]+$/.test(text)) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    },
  })
  let n: Node | null
  while ((n = walker.nextNode())) nodes.push(n as Text)
  return nodes
}

// ─── Composant principal ───────────────────────────────────
export default function FloatingWidgets() {
  const [currentLang, setCurrentLang] = useState(languages[0])
  const [open, setOpen]               = useState(false)
  const [status, setStatus]           = useState<'idle'|'loading'|'done'|'error'>('idle')
  const [progress, setProgress]       = useState(0)
  const dropdownRef                   = useRef<HTMLDivElement>(null)
  const cacheRef                      = useRef<Record<string, Record<string, string>>>(loadCache())

  // Fermer dropdown au clic extérieur
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Appliquer direction RTL/LTR
  useEffect(() => {
    document.documentElement.dir  = currentLang.dir
    document.documentElement.lang = currentLang.code
  }, [currentLang])

  // Sauvegarder les originaux au montage
  useEffect(() => {
    const nodes = collectTextNodes(document.body)
    nodes.forEach(node => {
      if (!originalMap.has(node)) {
        originalMap.set(node, node.textContent ?? '')
      }
    })
  }, [])

  const restoreOriginals = useCallback(() => {
    const nodes = collectTextNodes(document.body)
    nodes.forEach(node => {
      const orig = originalMap.get(node)
      if (orig !== undefined) node.textContent = orig
    })
  }, [])

  const translatePage = useCallback(async (targetCode: string) => {
    if (targetCode === 'fr') {
      restoreOriginals()
      return
    }

    setStatus('loading')
    setProgress(0)

    const nodes    = collectTextNodes(document.body)
    const cache    = cacheRef.current
    const langKey  = targetCode
    if (!cache[langKey]) cache[langKey] = {}

    // Séparer nœuds cachés / à traduire
    const toTranslate: { node: Text; orig: string }[] = []

    nodes.forEach(node => {
      const orig = originalMap.get(node) ?? node.textContent ?? ''
      if (!originalMap.has(node)) originalMap.set(node, orig)

      if (cache[langKey][orig]) {
        node.textContent = cache[langKey][orig]
      } else {
        toTranslate.push({ node, orig })
      }
    })

    // Traduire par batch de 10 en parallèle
    const BATCH = 10
    let done = 0
    const total = toTranslate.length

    for (let i = 0; i < total; i += BATCH) {
      const batch = toTranslate.slice(i, i + BATCH)

      await Promise.all(
        batch.map(async ({ node, orig }) => {
          try {
            const translated = await translateText(orig, 'fr', targetCode)
            node.textContent = translated
            cache[langKey][orig] = translated
          } catch {
            // Garder l'original si erreur
          }
          done++
          setProgress(Math.round((done / total) * 100))
        })
      )
    }

    // Persister le cache
    saveCache(cache)
    setStatus('done')

    // Reset status après 2s
    setTimeout(() => setStatus('idle'), 2000)
  }, [restoreOriginals])

  const handleSelect = async (lang: typeof languages[0]) => {
    if (lang.code === currentLang.code) { setOpen(false); return }
    setCurrentLang(lang)
    setOpen(false)
    await translatePage(lang.code)
  }

  return (
    <div id="floating-widgets" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* ── Barre de progression ── */}
      {status === 'loading' && (
        <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-3 w-52">
          <div className="flex items-center gap-2 mb-2">
            <Loader2 size={14} className="text-red-500 animate-spin flex-shrink-0" />
            <span className="text-xs text-gray-600">Traduction… {progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Succès ── */}
      {status === 'done' && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2
          shadow-lg text-xs text-green-700 flex items-center gap-2">
          <Check size={13} />
          Page traduite en {formatLabel(currentLang.label)}
        </div>
      )}
      
      {/* ── Sélecteur langue ── */}
      <div className="relative" ref={dropdownRef}>

        {open && (
          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg
            shadow-xl border border-gray-100 overflow-hidden min-w-[170px]
            origin-bottom-right animate-in zoom-in-95 duration-150">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className={`w-full flex items-center gap-3 px-4 py-3
                  transition-colors duration-150 text-left border-b border-gray-50 last:border-0
                  ${lang.code === currentLang.code
                    ? 'bg-[#faf9f6] cursor-default'
                    : 'hover:bg-gray-50'
                  }`}
              >
                <img 
                  src={lang.flag} 
                  alt={lang.label} 
                  className="w-5 h-5 object-cover rounded-sm"
                />
                <span className={`text-sm flex-1 ${
                  lang.code === currentLang.code ? 'text-red-500 font-semibold' : 'text-gray-700'
                }`}>
                  {formatLabel(lang.label)}
                </span>
                {lang.code === currentLang.code && (
                  <Check size={13} className="text-red-500" />
                )}
              </button>
            ))}

            {/* Bouton reset si pas en français */}
            {currentLang.code !== 'fr' && (
              <div className="border-t border-gray-100 px-4 py-2.5">
                <button
                  onClick={() => handleSelect(languages[0])}
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  <RotateCcw size={11} />
                  Revenir au français
                </button>
              </div>
            )}
          </div>
        )}

        {/* Bouton principal */}
        <button
          onClick={() => !status.includes('loading') && setOpen(!open)}
          disabled={status === 'loading'}
          className={`flex items-center gap-2 bg-white/95 backdrop-blur-sm
            border rounded-lg px-3 py-2.5 shadow-lg transition-all duration-300
            ${status === 'loading'
              ? 'border-gray-100 opacity-60 cursor-not-allowed'
              : 'border-gray-200 hover:shadow-xl hover:border-red-500/50 cursor-pointer'
            }`}
        >
          {status === 'loading'
            ? <Loader2 size={18} className="text-red-500 animate-spin" />
            : <img 
                src={currentLang.flag} 
                alt={currentLang.label} 
                className="w-5 h-5 object-cover rounded-sm"
              />
          }
          <span className="text-sm font-semibold text-gray-700 tracking-wider">
            {currentLang.short}
          </span>
          {status !== 'loading' && (
            open
              ? <ChevronUp  size={14} className="text-gray-400" />
              : <ChevronDown size={14} className="text-gray-400" />
          )}
        </button>
      </div>
    </div>
  )
}