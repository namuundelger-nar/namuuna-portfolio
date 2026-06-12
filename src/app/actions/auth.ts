"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
  const passcode = formData.get("passcode")
  
  if (passcode === process.env.ADMIN_PASSCODE) {
    const cookieStore = await cookies()
    cookieStore.set("admin_auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    })
    
    redirect("/admin")
  }
  
  return { error: "Invalid passcode" }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_auth")
  redirect("/admin/login")
}
