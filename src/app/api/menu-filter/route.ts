// app/api/menu-filter/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const nom = searchParams.get('nom')
  const categorie = searchParams.get('categorie')

  const payload = await getPayload({ config: configPromise })

  // Construire les conditions dynamiquement
  const andConditions: any[] = [{ disponible: { equals: true } }]

  // Recherche par nom (recherche floue)
  if (nom && nom.trim()) {
    andConditions.push({ nom: { like: nom } })
  }

  // Filtre par catégorie
  if (categorie && categorie.trim()) {
    andConditions.push({ categorie: { equals: categorie } })
  }

  try {
    const { docs, totalDocs } = await payload.find({
      collection: 'menu',
      where: { and: andConditions },
      sort: '-featured',
      limit: 100,
      depth: 1,
    })

    return NextResponse.json({ docs, totalDocs })
  } catch (error) {
    console.error('Erreur lors du filtrage:', error)
    return NextResponse.json(
      { error: 'Erreur lors du filtrage des plats', docs: [], totalDocs: 0 },
      { status: 500 }
    )
  }
}