// app/page.tsx
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import MenuSection from '@/components/MenuSection'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: initialPlats } = await payload.find({
    collection: 'menu',
    where: { disponible: { equals: true } },
    sort: '-featured',
    limit: 10000000,
    depth: 1,
  })

  return (
    <main>
      <Hero />
      <MenuSection initialPlats={initialPlats as any} />
      <AboutSection />
      <ContactSection />
    </main>
  )
}