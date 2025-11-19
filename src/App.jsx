import Hero from './components/Hero'
import Builder from './components/Builder'
import HowItWorks from './components/HowItWorks'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <Builder />
      <HowItWorks />
      <footer className="text-center text-slate-400 py-8 border-t border-white/10 bg-slate-950">
        Built for real estate creators • Edit before you export
      </footer>
    </div>
  )
}

export default App