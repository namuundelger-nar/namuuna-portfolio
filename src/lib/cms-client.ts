export async function updateContentBlock(key: string, value: string) {
  try {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, value }),
    })
    if (!res.ok) {
      const data = await res.json()
      return { ok: false, error: data.error || "Failed to update content" }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" }
  }
}
