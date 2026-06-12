import * as React from "react"
import type { Skill } from "@prisma/client"

export function SkillMatrix({ skills }: { skills: Skill[] }) {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="rounded-lg border border-border p-5 bg-accent/30">
          <h4 className="font-semibold text-foreground mb-3">{category}</h4>
          <div className="flex flex-wrap gap-2">
            {categorySkills.map((skill) => (
              <span 
                key={skill.id} 
                className="inline-flex items-center rounded-md bg-background px-2.5 py-1 text-sm font-medium text-muted-foreground shadow-sm ring-1 ring-inset ring-border transition-colors hover:text-foreground hover:bg-accent"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
