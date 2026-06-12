import * as React from "react"
import type { Experience } from "@prisma/client"

export function ExperienceCard({ experience }: { experience: Experience }) {
  const tags = experience.techStack.split(',').map(tag => tag.trim()).filter(Boolean)

  return (
    <div className="mb-4 sm:mb-0 transition-all hover:translate-x-1 duration-300">
      <div className="mb-0.5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
        <h4 className="font-bold text-base text-foreground">{experience.role}</h4>
        <div className="mt-1 text-left text-muted-foreground text-sm sm:mt-0 sm:text-right">
          <div>
            {experience.startDate} &mdash; {experience.endDate || "Present"}
          </div>
        </div>
      </div>
      <div className="flex flex-col text-sm sm:flex-row sm:items-baseline sm:justify-between">
        <div className="flex flex-wrap items-baseline text-muted-foreground">
          <span className="font-medium text-foreground">{experience.company}</span>
          {experience.location && (
            <>
              <span className="mx-2">&bull;</span>
              <span>{experience.location}</span>
            </>
          )}
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
        {experience.description}
      </p>
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="inline-flex items-center rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground ring-1 ring-inset ring-border">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
