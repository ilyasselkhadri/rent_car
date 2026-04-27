import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Hero from '@/components/Hero'
import CarsSection from '@/components/CarsSection'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: initialCars } = await payload.find({
    collection: 'cars',
    where: { disponible: { equals: true } },
    sort: '-featured',
    limit: 10000000000000,
    depth: 1,
  })

  return (
    <main>
      <Hero />
      <CarsSection initialCars={initialCars as any} />
      <AboutSection />
      <ContactSection />
    </main>
  )
}