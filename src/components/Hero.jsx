import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VyGeZv58yuk8j7Yy/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="backdrop-blur-sm bg-slate-900/40 rounded-2xl p-8 border border-white/10">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Cinematic Property Videos from Your Photos</h1>
          <p className="mt-4 text-slate-300 max-w-2xl">Upload your property images and instantly generate a sleek, cinematic reel. Rearrange scenes, edit captions, and fine-tune timings before exporting.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#builder" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">Create a Video</a>
            <a href="#how" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">How it works</a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/60 to-slate-950" />
    </section>
  )
}

export default Hero