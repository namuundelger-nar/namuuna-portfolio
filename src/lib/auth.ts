import { cookies } from "next/headers"

// Single source of truth for the admin session check used by server
// components and server actions. The proxy guard (src/proxy.ts) only protects
// /admin routes; mutations must re-check on the server.
export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get("admin_auth")?.value === "authenticated"
}
