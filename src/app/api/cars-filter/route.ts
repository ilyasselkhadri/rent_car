// app/api/cars-filter/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const nom = searchParams.get('nom')
  const brand = searchParams.get('brand')
  const transmission = searchParams.get('transmission')
  const kilometrageMax = searchParams.get('kilometrageMax')
  const anneeMin = searchParams.get('anneeMin')
  const anneeMax = searchParams.get('anneeMax')

  const payload = await getPayload({ config: configPromise })

  // Construire les conditions avec 'and'
  const conditions: any[] = [
    { disponible: { equals: true } }
  ]

  // Recherche par nom
  if (nom && nom.trim()) {
    conditions.push({ nom: { contains: nom.trim() } })
  }

  // Filtre par marque
  if (brand && brand.trim()) {
    conditions.push({ brand: { equals: brand.trim() } })
  }

  // Filtre par transmission
  if (transmission && transmission.trim()) {
    conditions.push({ transmission: { equals: transmission.trim() } })
  }

  // Filtre par kilométrage max
  if (kilometrageMax && !isNaN(parseInt(kilometrageMax))) {
    conditions.push({ 
      'details.kilometrage': { less_than_equal: parseInt(kilometrageMax) } 
    })
  }

  // ⚠️ IMPORTANT: Utiliser 'and' pour combiner année min ET année max
  if ((anneeMin && !isNaN(parseInt(anneeMin))) || (anneeMax && !isNaN(parseInt(anneeMax)))) {
    const anneeConditions: any[] = []
    
    if (anneeMin && !isNaN(parseInt(anneeMin))) {
      anneeConditions.push({ 
        'details.annee': { greater_than_equal: parseInt(anneeMin) } 
      })
    }
    
    if (anneeMax && !isNaN(parseInt(anneeMax))) {
      anneeConditions.push({ 
        'details.annee': { less_than_equal: parseInt(anneeMax) } 
      })
    }
    
    // Ajouter les conditions d'année comme un bloc 'and'
    if (anneeConditions.length > 0) {
      conditions.push({ and: anneeConditions })
    }
  }

  try {
    const { docs, totalDocs } = await payload.find({
      collection: 'cars',
      where: { and: conditions },
      sort: '-featured',
      limit: 100,
      depth: 1,
    })

    console.log(`Filtres appliqués:`, { anneeMin, anneeMax, totalDocs })
    console.log(`Années des voitures trouvées:`, docs.map(c => c.details?.annee))

    return NextResponse.json({ docs, totalDocs, success: true })
  } catch (error) {
    console.error('Erreur lors du filtrage:', error)
    return NextResponse.json(
      { error: 'Erreur lors du filtrage des voitures', docs: [], totalDocs: 0, success: false },
      { status: 500 }
    )
  }
}