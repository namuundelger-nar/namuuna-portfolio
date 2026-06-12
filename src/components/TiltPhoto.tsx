"use client"

import React from "react"
import Tilt from "react-parallax-tilt"
import Image from "next/image"

interface TiltPhotoProps {
  imageUrl: string
  alt: string
}

export function TiltPhoto({ imageUrl, alt }: TiltPhotoProps) {
  return (
    <Tilt
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      perspective={1000}
      scale={1.05}
      transitionSpeed={1500}
      className="relative w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden border border-border shadow-2xl ring-1 ring-primary/10 cursor-pointer"
    >
      {/* 
        This is the 3D animated tilt effect container. 
        It responds to mouse movements dynamically.
      */}
      <Image 
        src={imageUrl} 
        alt={alt}
        fill
        className="object-cover"
        priority
      />
      {/* Inner glare effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Tilt>
  )
}
