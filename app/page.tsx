import Navbar from '@/app/components/Navbar'
import Hero from '@/app/components/Hero'
import StatsBar from '@/app/components/StatsBar'
import NewsFeed from '@/app/components/NewsFeed'
import ProjectList from '@/app/components/ProjectList'
import QuickSwap from '@/app/components/QuickSwap'
import Footer from '@/app/components/Footer'

export default function Home() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />
      <Hero />
      <StatsBar />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <NewsFeed />
        <ProjectList />
      </div>
      <QuickSwap />
      <Footer />
    </main>
  )
}