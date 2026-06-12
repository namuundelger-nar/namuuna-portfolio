import { prisma } from "@/lib/prisma"
import Link from "next/link"
import BlogInteractiveClient from "./BlogInteractiveClient"

export default async function BlogIndex() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  })

  // To simulate the beautiful staggered grid from the design even if there are few posts,
  // we'll assign different aesthetic card styles to them based on their index.
  const getCardStyle = (index: number) => {
    const styles = [
      // 1: Ocean (Vertical)
      { wrapper: "aspect-[3/4]", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD__jMh6LPEZ9ec5EkCvfw3mZB8ScB8Xk-MAjQUqzqbDPmJUoN6H3PvybmIVYgMQvUyan8eXX0AeviTNceN5lRGA7ALh4PfdhSz4fxVZrZQvw-R18fz3D5ym7iSpEHRHmO7bQAdpCOzkDWkhg3ongliNMtgy0tZ0Rz9UCtv84PIWLzlxa27ljhfahu3t3Dhgu88zZs-akVAfAsqLivF__NFsgo2rZnoOYIsaQK9gVWTjb1DLz55tniy_F4clFtsdkvQvAjAR0NyXTA", label: "Ocean", icon: "water" },
      // 2: Cloud (Square-ish, text first)
      { wrapper: "aspect-video", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC04dQ4IPZgEqvSw9a_8f6aBWD0H5TXqDYacLPP9qTdsCRMttgE0a5vAvb9M8DFpkhn0c51zza2l16Hq4yq5TWZGsih1rB86Vf3drMzIJ28L1Z_1nJMnW_4pzuiUvKsasRawNNJaeRxMPGK2s2qdUikS4IHs76B0XqObLHYU2Mk3SobBXEKTuTzvgBBq93LJWF2tprmVIGbvY_Zt9WBD6cs9uCr1_AgxzqQ_7LHakwHNWFOCFjO5inM5Or2aqzbXRVCd54hYBBKs_o", label: "Cloudscapes", icon: "cloudy", isTextFirst: true },
      // 3: Waterfall (Tall)
      { wrapper: "aspect-[4/5]", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1LFFXakPKD8aA4w18XbcqnK6kBfO-dgO_jwKmwwWTT4vsBJESMtClOQJ7-7kRXDYryZOBbCC3gmJaRhIywrBz8rj1oTnWI3OQEhoTFPo_l1Nqc0WCZs11-uINnWQfaai-jh1bfpUBpR1N-8wyiozmQKfbQxrtTLNxhzgME1UhJ9FPzj2CjucvbghWCnHBGc0Z-KbznzD_DQC8d7tXLzfjyVuEko6mZj2ucTXou2Fw_hxq8EEk94XdpZ88ETuJFtLyxuMCqGrHUpM", label: "Gravity & Grace", icon: "nature", overlay: true }
    ]
    return styles[index % styles.length]
  }

  return <BlogInteractiveClient posts={posts} />
}
