import { prisma } from "@/lib/prisma"
import { isAdmin } from "@/lib/auth"
import { EditableText } from "./EditableText"

/**
 * Server wrapper: resolves the stored value for a content block (falling back
 * to the hardcoded default) and enables inline editing for the author.
 *
 * Usage: <Editable blockKey="home.quote" fallback="..." as="blockquote" />
 */
export async function Editable({
  blockKey,
  fallback,
  as,
  className,
}: {
  blockKey: string
  fallback: string
  as?: "span" | "p" | "h1" | "h2" | "h3" | "blockquote"
  className?: string
}) {
  let value = fallback
  let editable = false
  try {
    const [block, admin] = await Promise.all([
      prisma.contentBlock.findUnique({ where: { key: blockKey } }),
      isAdmin(),
    ])
    value = block?.value ?? fallback
    editable = admin
  } catch {
    // Missing table at build time — fall back to static content.
  }
  return <EditableText blockKey={blockKey} value={value} editable={editable} as={as} className={className} />
}
