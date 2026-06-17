"use client"

import { useRef, useState, useTransition } from "react"
import { updateContentBlock } from "@/lib/cms-client"

/**
 * Click-to-edit text. Render-only for visitors; contentEditable for the
 * logged-in author (the server wrapper decides via the auth cookie).
 */
export function EditableText({
  blockKey,
  value,
  editable,
  as: Tag = "span",
  className,
}: {
  blockKey: string
  value: string
  editable: boolean
  as?: "span" | "p" | "h1" | "h2" | "h3" | "blockquote"
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle")
  const [isPending, startTransition] = useTransition()

  if (!editable) return <Tag className={className}>{value}</Tag>

  function save() {
    const next = ref.current?.innerText ?? ""
    if (next.trim() === value.trim()) return
    startTransition(async () => {
      const res = await updateContentBlock(blockKey, next)
      setStatus(res.ok ? "saved" : "error")
      setTimeout(() => setStatus("idle"), 2000)
    })
  }

  return (
    <Tag
      ref={ref as React.Ref<never>}
      contentEditable
      suppressContentEditableWarning
      onBlur={save}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Escape") (e.target as HTMLElement).blur()
      }}
      className={`${className ?? ""} outline-none rounded-md transition-shadow cursor-text
        hover:ring-2 hover:ring-primary/30 focus:ring-2 focus:ring-primary/60
        ${isPending ? "opacity-60" : ""}
        ${status === "saved" ? "ring-2 ring-green-400" : ""}
        ${status === "error" ? "ring-2 ring-red-400" : ""}`}
    >
      {value}
    </Tag>
  )
}
