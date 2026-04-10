// "use client"

// import Image from "next/image"
// import { useState } from "react"

// type MedicineImageProps = {
//   src?: string | null
//   alt: string
//   className?: string   // ✅ allow custom styles
// }

// export function MedicineImage({
//   src,
//   alt,
//   className = "",
// }: MedicineImageProps) {
//   const [imgSrc, setImgSrc] = useState(src || "/medi02.avif")

//   return (
//     <Image
//       src={imgSrc}
//       alt={alt}
//       fill
//       onError={() => setImgSrc("/medi02.avif")}
//       className={`object-contain p-4 transition-transform duration-700 ${className} hover:scale-110`}
//     />
//   )
// }

// ! coudinary img fix
"use client"

import Image from "next/image"
import { useState } from "react"

type MedicineImageProps = {
  src?: string | null
  alt: string
  className?: string
}

const FALLBACK = "/medi02.avif"

// Why: medicine.image can be null, undefined, OR "" (empty string from DB).
// "" is falsy so `src || FALLBACK` catches it, but we also guard against
// any non-http string (e.g. a partial write) with the startsWith check.
function isValidSrc(src?: string | null): src is string {
  return !!src && src.startsWith("http")
}

export function MedicineImage({ src, alt, className = "" }: MedicineImageProps) {
  const [imgSrc, setImgSrc] = useState(isValidSrc(src) ? src : FALLBACK)

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      onError={() => setImgSrc(FALLBACK)}
      className={`object-contain p-4 transition-transform duration-700 ${className} hover:scale-110`}
    />
  )
}