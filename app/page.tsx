import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TopTokensTable from './components/TopTokensTable'
import FeaturedResearch from './components/FeaturedResearch'
import ProjectList from './components/ProjectList'
import NewsFeed from './components/NewsFeed'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen text-gray-100">
      <Navbar />
      <Hero />
      <TopTokensTable />
      <FeaturedResearch />
      <ProjectList />
      <NewsFeed />
      <Footer />
    </main>
  )
}