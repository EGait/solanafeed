import Navbar from '../components/Navbar'
import NewsFeed from '../components/NewsFeed'
import Footer from '../components/Footer'

export default function NewsPage() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />
      <NewsFeed />
      <Footer />
    </main>
  )
}