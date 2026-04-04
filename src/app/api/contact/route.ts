import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nom, email, telephone, sujet, message } = body

    // Validation des champs requis
    if (!nom || !email || !sujet || !message) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      )
    }

    // Pour l'instant, on simule l'envoi d'email
    // Vous pourrez ajouter Resend plus tard
    console.log('📧 Nouveau message reçu:', {
      nom,
      email,
      telephone,
      sujet,
      message,
      date: new Date().toISOString()
    })

    // Simuler un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message reçu avec succès. Nous vous répondrons sous 24h.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur API contact:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// Option GET pour tester que l'API existe
export async function GET() {
  return NextResponse.json(
    { status: 'ok', message: 'API Contact est opérationnelle' },
    { status: 200 }
  )
}