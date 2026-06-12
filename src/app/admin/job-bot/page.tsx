"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const applicationData = [
  { name: "Applied", value: 100000, color: "#94a3b8" },
  { name: "Rejected", value: 82000, color: "#ef4444" },
  { name: "Interviews", value: 15000, color: "#eab308" },
  { name: "Offers", value: 3000, color: "#22c55e" },
]

const timelineData = [
  { day: "Day 1", applied: 15000 },
  { day: "Day 2", applied: 35000 },
  { day: "Day 3", applied: 65000 },
  { day: "Day 4", applied: 85000 },
  { day: "Day 5", applied: 100000 },
]

export default function JobBotDashboard() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleSimulate = () => {
    setIsRunning(true)
    setProgress(0)
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunning(false)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Bot Analytics</h1>
          <p className="text-muted-foreground">Automated Resume & LinkedIn Application Engine</p>
        </div>
        <button 
          onClick={handleSimulate}
          disabled={isRunning}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-white shadow-md transition-all ${isRunning ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 hover:scale-105'}`}
        >
          <span className="material-symbols-outlined">{isRunning ? 'hourglass_empty' : 'rocket_launch'}</span>
          {isRunning ? `Running (${progress}%)` : 'Run 100k Simulator'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm text-center">
          <div className="text-4xl font-bold text-foreground mb-2">100,000</div>
          <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Applications</div>
        </div>
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm text-center">
          <div className="text-4xl font-bold text-yellow-500 mb-2">15%</div>
          <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Interview Rate</div>
        </div>
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm text-center">
          <div className="text-4xl font-bold text-green-500 mb-2">3%</div>
          <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Offer Rate</div>
        </div>
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm text-center">
          <div className="text-4xl font-bold text-red-500 mb-2">82%</div>
          <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Rejection Rate</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm h-[400px]">
          <h3 className="text-lg font-bold mb-6 text-foreground">Funnel Conversion</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={applicationData.slice(1)} // exclude total applied from pie
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {applicationData.slice(1).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border p-6 rounded-2xl shadow-sm h-[400px]">
          <h3 className="text-lg font-bold mb-6 text-foreground">Application Velocity (15 Hours)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applied" fill="#00668a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Mock Emails section */}
      <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
        <h3 className="text-lg font-bold mb-4 text-foreground">Recent Scraped Responses (Gmail Bot)</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <span className="material-symbols-outlined text-green-500">mail</span>
            <div className="flex-1">
              <div className="font-bold text-foreground">Tech Innovations Inc.</div>
              <div className="text-sm text-muted-foreground">"We would love to invite you for an interview..."</div>
            </div>
            <div className="text-xs font-bold bg-green-500/20 text-green-600 px-3 py-1 rounded-full">INTERVIEW</div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <span className="material-symbols-outlined text-red-500">mail</span>
            <div className="flex-1">
              <div className="font-bold text-foreground">Global Systems Corp</div>
              <div className="text-sm text-muted-foreground">"Unfortunately, we will not be moving forward..."</div>
            </div>
            <div className="text-xs font-bold bg-red-500/20 text-red-600 px-3 py-1 rounded-full">REJECTED</div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <span className="material-symbols-outlined text-yellow-500">mail</span>
            <div className="flex-1">
              <div className="font-bold text-foreground">NextGen Data Solutions</div>
              <div className="text-sm text-muted-foreground">"Please complete this coding assessment..."</div>
            </div>
            <div className="text-xs font-bold bg-yellow-500/20 text-yellow-600 px-3 py-1 rounded-full">ASSESSMENT</div>
          </div>
        </div>
      </div>
    </div>
  )
}
