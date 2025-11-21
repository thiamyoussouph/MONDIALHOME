import Header from '../components/Header'
import Footer from '../components/Footer'

// Si tes composants sont dans "app/components", le chemin "../../components" est correct depuis "(public)".
// Sinon essaie : import Header from '@/app/components/Header'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* ✅ Le Menu apparaît ici pour les clients */}
      <Header />
      
      <main className="min-h-screen">
        {children}
      </main>
      
      {/* ✅ Le Pied de page apparaît ici pour les clients */}
      <Footer />
    </>
  )
}