function HowItWorks() {
  const steps = [
    { title: 'Upload photos', desc: 'Drop in your property images or select from your device.' },
    { title: 'Edit scenes', desc: 'Reorder, tweak durations, and add captions for each room or exterior.' },
    { title: 'Render', desc: 'Export a cinematic video ready for listings and social.' },
  ]
  return (
    <section id="how" className="bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {steps.map((s, i) => (
            <div key={i} className="bg-slate-900/60 border border-white/10 rounded-xl p-6">
              <div className="text-5xl font-bold text-blue-500/60">{i+1}</div>
              <h3 className="mt-3 text-xl font-medium">{s.title}</h3>
              <p className="mt-2 text-slate-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks