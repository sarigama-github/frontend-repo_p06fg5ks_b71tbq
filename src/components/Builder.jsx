import { useEffect, useState, useRef } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Builder() {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [imageUrls, setImageUrls] = useState([])
  const [title, setTitle] = useState('New Property Reel')
  const [description, setDescription] = useState('Spacious, modern, and move-in ready.')
  const [scenes, setScenes] = useState([])
  const [project, setProject] = useState(null)
  const [rendering, setRendering] = useState(false)
  const [videoUrl, setVideoUrl] = useState(null)

  const fileInputRef = useRef(null)

  useEffect(() => {
    if (imageUrls.length) {
      // Initialize scenes when images are available
      const initScenes = imageUrls.map((url, idx) => ({
        image_url: url,
        caption: `Scene ${idx + 1}`,
        duration: 3,
        ken_burns: true,
      }))
      setScenes(initScenes)
    }
  }, [imageUrls])

  const handleFiles = async (e) => {
    const selected = Array.from(e.target.files || [])
    if (selected.length === 0) return

    setUploading(true)
    try {
      const form = new FormData()
      selected.forEach(f => form.append('files', f))
      const res = await fetch(`${API_BASE}/api/upload`, { method: 'POST', body: form })
      const data = await res.json()
      setImageUrls(data.urls)
    } catch (err) {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const createProject = async () => {
    const payload = { title, description, scenes }
    const res = await fetch(`${API_BASE}/api/projects`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    })
    const data = await res.json()
    setProject(data)
  }

  const saveEdits = async () => {
    if (!project) return
    const payload = { title, description, scenes }
    const res = await fetch(`${API_BASE}/api/projects/${project.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    })
    const data = await res.json()
    setProject(data)
  }

  const renderVideo = async () => {
    if (!project) return
    setRendering(true)
    const res = await fetch(`${API_BASE}/api/render`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ project_id: project.id })
    })
    const data = await res.json()
    setRendering(false)
    setVideoUrl(data.output_url)
  }

  const moveScene = (from, to) => {
    const copy = [...scenes]
    const [moved] = copy.splice(from, 1)
    copy.splice(to, 0, moved)
    setScenes(copy)
  }

  const updateScene = (idx, key, value) => {
    const copy = scenes.map((s, i) => i === idx ? { ...s, [key]: value } : s)
    setScenes(copy)
  }

  return (
    <section id="builder" className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold">Build your cinematic video</h2>
        <p className="text-slate-400 mt-2">Upload images, reorder scenes, edit captions and durations, then render.</p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-800/40 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-transparent text-2xl font-semibold outline-none" />
                <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-transparent text-slate-400 outline-none" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => fileInputRef.current?.click()} className="px-3 py-2 bg-white/10 rounded hover:bg-white/20">Add Photos</button>
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
                <button onClick={createProject} disabled={!scenes.length} className="px-3 py-2 bg-blue-500 rounded disabled:opacity-50">Save Project</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenes.map((scene, idx) => (
                <div key={idx} className="bg-slate-900/50 rounded-lg border border-white/10 p-3">
                  <img src={scene.image_url} alt="scene" className="w-full h-40 object-cover rounded" />
                  <div className="mt-3 space-y-2">
                    <input value={scene.caption || ''} onChange={(e) => updateScene(idx, 'caption', e.target.value)} placeholder="Caption" className="w-full bg-slate-800/60 rounded px-3 py-2 outline-none" />
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-slate-400">Duration</label>
                      <input type="number" step="0.5" min="1" value={scene.duration} onChange={(e) => updateScene(idx, 'duration', parseFloat(e.target.value || '1'))} className="w-24 bg-slate-800/60 rounded px-2 py-1 outline-none" />
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={scene.ken_burns} onChange={(e) => updateScene(idx, 'ken_burns', e.target.checked)} />
                        Ken Burns
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <button disabled={idx===0} onClick={() => moveScene(idx, idx-1)} className="px-2 py-1 bg-white/10 rounded disabled:opacity-50">↑</button>
                      <button disabled={idx===scenes.length-1} onClick={() => moveScene(idx, idx+1)} className="px-2 py-1 bg-white/10 rounded disabled:opacity-50">↓</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/40 border border-white/10 rounded-xl p-4">
            <h3 className="font-medium mb-3">Preview</h3>
            {scenes.length ? (
              <div className="aspect-video bg-black/50 rounded overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-slate-400">Interactive preview placeholder</div>
              </div>
            ) : (
              <div className="aspect-video bg-black/20 rounded flex items-center justify-center text-slate-500">No scenes yet</div>
            )}

            <div className="mt-4 space-y-2">
              <button onClick={saveEdits} disabled={!project} className="w-full px-3 py-2 bg-white/10 rounded disabled:opacity-50">Save Edits</button>
              <button onClick={renderVideo} disabled={!project} className="w-full px-3 py-2 bg-blue-500 rounded disabled:opacity-50">Render Video</button>
              {rendering && <p className="text-sm text-slate-400">Rendering...</p>}
              {videoUrl && (
                <a href={videoUrl} target="_blank" className="block text-blue-400 underline">Open rendered video</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Builder