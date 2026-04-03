import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import StatsBar from "./components/StatsBar"
import NewsFeed from "./components/NewsFeed"
import ProjectList from "./components/ProjectList"
import QuickSwap from "./components/QuickSwap"
import Footer from "./components/Footer"

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