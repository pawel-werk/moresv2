import { useHashRoute } from './hooks/useHashRoute'
import { HomePage } from './components/HomePage'
import { GalleryPage } from './components/GalleryPage'
import { CatalogPage } from './components/CatalogPage'
import { CncPage } from './components/CncPage'
import { TopBar } from './components/TopBar'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Contact } from './components/Contact'

function App() {
  const { path } = useHashRoute()

  const renderPage = () => {
    switch (path) {
      case 'galeria':
        return <GalleryPage />
      case 'katalog':
        return <CatalogPage />
      case 'cnc':
        return <CncPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-surface focus:text-copper"
      >
        Przejdź do treści
      </a>
      <TopBar />
      <Navbar />
      <main id="main-content" className="flex-grow flex flex-col">
        {renderPage()}
      </main>
      
      {/* Globalna sekcja kontaktu (renderowana na dole każdej strony), 
          dzięki czemu anchor link #kontakt płynnie przewija stronę z dowolnego miejsca */}
      <Contact />
      
      <Footer />
    </div>
  )
}

export default App