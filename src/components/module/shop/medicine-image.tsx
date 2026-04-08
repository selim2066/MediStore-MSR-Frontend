"use client"

import Image from "next/image"
import { useState } from "react"

type MedicineImageProps = {
  src?: string | null
  alt: string
  className?: string   // ✅ allow custom styles
}

export function MedicineImage({
  src,
  alt,
  className = "",
}: MedicineImageProps) {
  const [imgSrc, setImgSrc] = useState(src || "/medi02.avif")

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      onError={() => setImgSrc("/medi02.avif")}
      className={`object-contain p-4 transition-transform duration-700 ${className} hover:scale-110`}
    />
  )
}