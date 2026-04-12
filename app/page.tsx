import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import ProjectList from './components/ProjectList'
import NewsFeed from './components/NewsFeed'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />
      <Hero />
      <StatsBar />
      <ProjectList />
      <NewsFeed />
      <Footer />
    </main>
  )
}