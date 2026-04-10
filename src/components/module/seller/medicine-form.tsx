// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { createMedicineAction, updateMedicineAction } from "@/actions/medicine.action"
// import { Category, Medicine } from "@/types"
// import { toast } from "sonner"

// interface Props {
//   categories: Category[]
//   medicine?: Medicine // if provided → edit mode
//   onDone: () => void
// }

// export default function MedicineForm({ categories, medicine, onDone }: Props) {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [categoryId, setCategoryId] = useState(medicine?.categoryId ?? "")
//   const [image, setImage] = useState<File | null>(null)

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     setLoading(true)

//     const form = e.currentTarget
//     const formData = new FormData(form)
//     formData.set("categoryId", categoryId)
//     if (image) formData.set("image", image)
// //!debug
//       for (const [key, value] of formData.entries()) {
//   console.log(key, value)
// }

//     const result = medicine
//       ? await updateMedicineAction(medicine.id, formData)
//       : await createMedicineAction(formData)

//     setLoading(false)

//     if (result.error) {
//       toast.error(result.error.message)
//       return
//     }

//     toast.success(medicine ? "Medicine updated" : "Medicine created")
//     router.refresh()
//     onDone()
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="space-y-1">
//         <Label htmlFor="name">Name</Label>
//         <Input id="name" name="name" defaultValue={medicine?.name} required />
//       </div>

//       <div className="space-y-1">
//         <Label htmlFor="description">Description</Label>
//         <Textarea id="description" name="description" defaultValue={medicine?.description} required />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-1">
//           <Label htmlFor="price">Price (৳)</Label>
//           <Input id="price" name="price" type="number" step="0.01" defaultValue={medicine?.price} required />
//         </div>
//         <div className="space-y-1">
//           <Label htmlFor="stock">Stock</Label>
//           <Input id="stock" name="stock" type="number" defaultValue={medicine?.stock} required />
//         </div>
//       </div>

//       <div className="space-y-1">
//         <Label htmlFor="manufacturer">Manufacturer</Label>
//         <Input id="manufacturer" name="manufacturer" defaultValue={medicine?.manufacturer} required />
//       </div>

//       <div className="space-y-1">
//         <Label>Category</Label>
//         <Select value={categoryId} onValueChange={setCategoryId} required>
//           <SelectTrigger>
//             <SelectValue placeholder="Select category" />
//           </SelectTrigger>
//           <SelectContent>
//             {categories.map((c) => (
//               <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="space-y-1">
//         <Label htmlFor="image">Image</Label>
//         <Input
//           id="image"
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] ?? null)}
//         />
//       </div>

//       <Button type="submit" disabled={loading} className="w-full">
//         {loading ? "Saving..." : medicine ? "Update Medicine" : "Create Medicine"}
//       </Button>
//     </form>
//   )
// }


// ! cloudinary 

// What: Seller medicine create/edit form with Cloudinary image upload.
// Why:  The old form sent a raw File through the server action — that works
//       for local disk but not for cloud storage. The new flow uploads the
//       image directly to Cloudinary from the browser, gets back a permanent
//       URL string, and sends ONLY that URL to the server action.
//       This is the "direct upload" pattern — the backend never touches
//       binary file data, it just stores a URL string.
// How:
//   1. User picks a file  → local preview shown via URL.createObjectURL()
//   2. On submit         → uploadToCloudinary(file) → secure_url string
//   3. formData          → imageUrl string replaces the File object
//   4. Server action     → receives string, saves to Medicine.image in DB
//   5. Everywhere else   → just <img src={medicine.image} /> works instantly

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createMedicineAction, updateMedicineAction } from "@/actions/medicine.action"
import { Category, Medicine } from "@/types"
import { toast } from "sonner"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { ImageIcon, X } from "lucide-react"

interface Props {
  categories: Category[]
  medicine?: Medicine
  onDone: () => void
}

export default function MedicineForm({ categories, medicine, onDone }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categoryId, setCategoryId] = useState(medicine?.categoryId ?? "")

  // imageFile  → the new File the seller picked (not yet uploaded)
  // preview    → local blob URL for immediate visual feedback
  // existingUrl → the already-saved Cloudinary URL (edit mode only)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const existingUrl = medicine?.image ?? null

  // The URL we'll actually show: new preview takes priority over saved URL
  const displayImage = preview ?? existingUrl

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setImageFile(file)

    if (file) {
      // URL.createObjectURL creates a temporary local URL so the user sees
      // the image instantly without waiting for an upload
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }
  }

  function clearImage() {
    setImageFile(null)
    setPreview(null)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      formData.set("categoryId", categoryId)

      // Step 1: If a new file was picked, upload it to Cloudinary first
      if (imageFile) {
        const imageUrl = await uploadToCloudinary(imageFile)
        // Replace the File object with the string URL
        formData.set("image", imageUrl)
      } else if (existingUrl && !imageFile) {
        // Edit mode, no new file chosen → keep the existing URL
        formData.set("image", existingUrl)
      } else {
        // No image at all → remove the key so backend treats it as null
        formData.delete("image")
      }

      const result = medicine
        ? await updateMedicineAction(medicine.id, formData)
        : await createMedicineAction(formData)

      if (result.error) {
        toast.error(result.error.message)
        return
      }

      toast.success(medicine ? "Medicine updated" : "Medicine created")
      router.refresh()
      onDone()
    } catch (err) {
      // Catches uploadToCloudinary failures
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={medicine?.name} required />
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={medicine?.description}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="price">Price (৳)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            defaultValue={medicine?.price}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            defaultValue={medicine?.stock}
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="manufacturer">Manufacturer</Label>
        <Input
          id="manufacturer"
          name="manufacturer"
          defaultValue={medicine?.manufacturer}
          required
        />
      </div>

      <div className="space-y-1">
        <Label>Category</Label>
        <Select value={categoryId} onValueChange={setCategoryId} required>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Image upload section */}
      <div className="space-y-2">
        <Label htmlFor="image">Medicine Image</Label>

        {/* Preview box — shows either the new pick or the existing saved image */}
        {displayImage ? (
          <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
            <Image
              src={displayImage}
              alt="Medicine preview"
              fill
              className="object-contain p-3"
            />
            {/* X button clears the selection (only removes local pick, not DB value) */}
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-2 right-2 bg-white dark:bg-slate-800 rounded-full p-1 shadow hover:bg-red-50 transition-colors"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ) : (
          // Placeholder shown when no image exists yet
          <div className="w-full h-40 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2 text-slate-400">
            <ImageIcon className="w-8 h-8" />
            <p className="text-sm">No image selected</p>
          </div>
        )}

        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          // Don't mark required — medicine can exist without an image
        />
        {imageFile && (
          <p className="text-xs text-emerald-600">
            ✓ New image selected — will upload on save
          </p>
        )}
        {!imageFile && existingUrl && (
          <p className="text-xs text-slate-400">
            Current image will be kept unless you pick a new one
          </p>
        )}
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? imageFile
            ? "Uploading image…"
            : "Saving…"
          : medicine
          ? "Update Medicine"
          : "Create Medicine"}
      </Button>
    </form>
  )
}