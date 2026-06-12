"use client"

import { useState } from "react"

export default function SyncDashboard() {
  const [githubUser, setGithubUser] = useState("")
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState("")

  const handleGithubSync = async () => {
    if (!githubUser) return
    setIsSyncing(true)
    setSyncMessage("")
    try {
      const res = await fetch("/api/sync/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: githubUser })
      })
      const data = await res.json()
      if (res.ok) {
        setSyncMessage(`✅ ${data.message}`)
      } else {
        setSyncMessage(`❌ Error: ${data.error}`)
      }
    } catch (err) {
      setSyncMessage("❌ Network error.")
    }
    setIsSyncing(false)
  }

  const handleUploadClick = () => {
    alert("In a production environment, this would open a file picker and upload the PDF to the public/certs/ directory.")
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Data Sync</h1>
        <p className="text-muted-foreground">Keep your portfolio up to date automatically.</p>
      </div>

      <div className="grid gap-8">
        
        {/* GitHub Sync */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">code</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">GitHub Projects Sync</h2>
              <p className="text-sm text-muted-foreground">Pull your latest public repositories into your Projects page.</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
            <input 
              type="text" 
              placeholder="Enter GitHub Username (e.g. namuuna)" 
              value={githubUser}
              onChange={(e) => setGithubUser(e.target.value)}
              className="flex-1 bg-background border border-input rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button 
              onClick={handleGithubSync}
              disabled={isSyncing || !githubUser}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">{isSyncing ? "sync" : "cloud_download"}</span>
              {isSyncing ? "Syncing..." : "Sync Projects"}
            </button>
          </div>
          {syncMessage && <p className="mt-4 text-sm font-medium">{syncMessage}</p>}
        </div>

        {/* LinkedIn Sync */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">work</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">LinkedIn Profile Sync</h2>
              <p className="text-sm text-muted-foreground">Upload your exported LinkedIn PDF to update your experience and bio.</p>
            </div>
          </div>
          <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-accent/50 transition-colors" onClick={handleUploadClick}>
            <span className="material-symbols-outlined text-4xl text-muted-foreground mb-4">upload_file</span>
            <p className="font-medium text-foreground">Click to upload LinkedIn PDF</p>
            <p className="text-sm text-muted-foreground mt-1">We will extract your latest roles automatically.</p>
          </div>
        </div>

        {/* Credly Sync */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Credly Certifications Sync</h2>
              <p className="text-sm text-muted-foreground">Automatically transfer your certification PDF files and data from your Credly profile.</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <input 
              type="text" 
              placeholder="Enter Credly URL (e.g. https://www.credly.com/users/namuundelger-narmandakh)" 
              className="flex-1 bg-background border border-input rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button 
              onClick={() => alert("In a production environment, this would securely scrape the Credly API to transfer your badge PDFs directly into your portfolio's database.")}
              className="bg-amber-500 text-white px-6 py-2 rounded-md font-medium hover:bg-amber-600 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">sync</span>
              Sync Certifications
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
