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

// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { createMedicineAction, updateMedicineAction } from "@/actions/medicine.action"
// import { Category, Medicine } from "@/types"
// import { toast } from "sonner"
// import { uploadToCloudinary } from "@/lib/cloudinary"
// import { ImageIcon, X } from "lucide-react"

// interface Props {
//   categories: Category[]
//   medicine?: Medicine
//   onDone: () => void
// }

// export default function MedicineForm({ categories, medicine, onDone }: Props) {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [categoryId, setCategoryId] = useState(medicine?.categoryId ?? "")

//   // imageFile  → the new File the seller picked (not yet uploaded)
//   // preview    → local blob URL for immediate visual feedback
//   // existingUrl → the already-saved Cloudinary URL (edit mode only)
//   const [imageFile, setImageFile] = useState<File | null>(null)
//   const [preview, setPreview] = useState<string | null>(null)
//   const existingUrl = medicine?.image ?? null

//   // The URL we'll actually show: new preview takes priority over saved URL
//   const displayImage = preview ?? existingUrl

//   function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0] ?? null
//     setImageFile(file)

//     if (file) {
//       // URL.createObjectURL creates a temporary local URL so the user sees
//       // the image instantly without waiting for an upload
//       setPreview(URL.createObjectURL(file))
//     } else {
//       setPreview(null)
//     }
//   }

//   function clearImage() {
//     setImageFile(null)
//     setPreview(null)
//   }

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const form = e.currentTarget
//       const formData = new FormData(form)
//       formData.set("categoryId", categoryId)

//       // Step 1: If a new file was picked, upload it to Cloudinary first
//       if (imageFile) {
//         const imageUrl = await uploadToCloudinary(imageFile)
//         // Replace the File object with the string URL
//         formData.set("image", imageUrl)
//       } else if (existingUrl && !imageFile) {
//         // Edit mode, no new file chosen → keep the existing URL
//         formData.set("image", existingUrl)
//       } else {
//         // No image at all → remove the key so backend treats it as null
//         formData.delete("image")
//       }

//       const result = medicine
//         ? await updateMedicineAction(medicine.id, formData)
//         : await createMedicineAction(formData)

//       if (result.error) {
//         toast.error(result.error.message)
//         return
//       }

//       toast.success(medicine ? "Medicine updated" : "Medicine created")
//       router.refresh()
//       onDone()
//     } catch (err) {
//       // Catches uploadToCloudinary failures
//       toast.error(err instanceof Error ? err.message : "Something went wrong")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="space-y-1">
//         <Label htmlFor="name">Name</Label>
//         <Input id="name" name="name" defaultValue={medicine?.name} required />
//       </div>

//       <div className="space-y-1">
//         <Label htmlFor="description">Description</Label>
//         <Textarea
//           id="description"
//           name="description"
//           defaultValue={medicine?.description}
//           required
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-1">
//           <Label htmlFor="price">Price (৳)</Label>
//           <Input
//             id="price"
//             name="price"
//             type="number"
//             step="0.01"
//             defaultValue={medicine?.price}
//             required
//           />
//         </div>
//         <div className="space-y-1">
//           <Label htmlFor="stock">Stock</Label>
//           <Input
//             id="stock"
//             name="stock"
//             type="number"
//             defaultValue={medicine?.stock}
//             required
//           />
//         </div>
//       </div>

//       <div className="space-y-1">
//         <Label htmlFor="manufacturer">Manufacturer</Label>
//         <Input
//           id="manufacturer"
//           name="manufacturer"
//           defaultValue={medicine?.manufacturer}
//           required
//         />
//       </div>

//       <div className="space-y-1">
//         <Label>Category</Label>
//         <Select value={categoryId} onValueChange={setCategoryId} required>
//           <SelectTrigger>
//             <SelectValue placeholder="Select category" />
//           </SelectTrigger>
//           <SelectContent>
//             {categories.map((c) => (
//               <SelectItem key={c.id} value={c.id}>
//                 {c.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Image upload section */}
//       <div className="space-y-2">
//         <Label htmlFor="image">Medicine Image</Label>

//         {/* Preview box — shows either the new pick or the existing saved image */}
//         {displayImage ? (
//           <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
//             <Image
//               src={displayImage}
//               alt="Medicine preview"
//               fill
//               className="object-contain p-3"
//             />
//             {/* X button clears the selection (only removes local pick, not DB value) */}
//             <button
//               type="button"
//               onClick={clearImage}
//               className="absolute top-2 right-2 bg-white dark:bg-slate-800 rounded-full p-1 shadow hover:bg-red-50 transition-colors"
//             >
//               <X className="w-4 h-4 text-red-500" />
//             </button>
//           </div>
//         ) : (
//           // Placeholder shown when no image exists yet
//           <div className="w-full h-40 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2 text-slate-400">
//             <ImageIcon className="w-8 h-8" />
//             <p className="text-sm">No image selected</p>
//           </div>
//         )}

//         <Input
//           id="image"
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           // Don't mark required — medicine can exist without an image
//         />
//         {imageFile && (
//           <p className="text-xs text-emerald-600">
//             ✓ New image selected — will upload on save
//           </p>
//         )}
//         {!imageFile && existingUrl && (
//           <p className="text-xs text-slate-400">
//             Current image will be kept unless you pick a new one
//           </p>
//         )}
//       </div>

//       <Button type="submit" disabled={loading} className="w-full">
//         {loading
//           ? imageFile
//             ? "Uploading image…"
//             : "Saving…"
//           : medicine
//           ? "Update Medicine"
//           : "Create Medicine"}
//       </Button>
//     </form>
//   )
// }





// ! better ui ux:

// src/components/module/seller/medicine-form.tsx
"use client"

import { useState, useRef, useCallback } from "react"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { toast } from "sonner"
import { Medicine, Category } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { uploadToCloudinary } from "@/lib/cloudinary"
// ✦ CHANGED: import server actions instead of medicineService directly
import { createMedicineAction, updateMedicineAction } from "@/actions/medicine.action"
import {
  X,
  Package2,
  CircleDollarSign,
  Boxes,
  Building2,
  LayoutGrid,
  CheckCircle2,
  AlertCircle,
  CloudUpload,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const medicineSchema = z.object({
  name: z.string().min(2, "At least 2 characters required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, "Must be greater than 0"),
  stock: z.coerce.number().int().min(0, "Cannot be negative"),
  manufacturer: z.string().min(2, "Manufacturer name required"),
  categoryId: z.string().min(1, "Please select a category"),
})

interface Props {
  categories: Category[]
  medicine?: Medicine
  onDone: () => void
}

export default function MedicineForm({ categories, medicine, onDone }: Props) {
  // ✦ REMOVED: useRouter — revalidatePath inside actions handles cache refresh

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(medicine?.image ?? "")
  const [isDragging, setIsDragging] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm({
    defaultValues: {
      name: medicine?.name ?? "",
      description: medicine?.description ?? "",
      price: medicine?.price ?? ("" as unknown as number),
      stock: medicine?.stock ?? ("" as unknown as number),
      manufacturer: medicine?.manufacturer ?? "",
      categoryId: medicine?.categoryId ?? "",
    },
    onSubmit: async ({ value }) => {
      const parsed = medicineSchema.safeParse(value)
      if (!parsed.success) {
        toast.error(parsed.error.issues[0].message)
        return
      }

      try {
        // ✦ CHANGED: image upload isolated with its own loading flag
        setIsUploadingImage(true)
        let imageUrl = medicine?.image ?? ""
        if (imageFile) {
          imageUrl = await uploadToCloudinary(imageFile)
        }
        setIsUploadingImage(false)

        const formData = new FormData()
        formData.append("name", parsed.data.name)
        formData.append("description", parsed.data.description ?? "")
        formData.append("price", String(parsed.data.price))
        formData.append("stock", String(parsed.data.stock))
        formData.append("manufacturer", parsed.data.manufacturer)
        formData.append("categoryId", parsed.data.categoryId)
        if (imageUrl) formData.append("image", imageUrl)

        // ✦ CHANGED: call server actions, check their returned error shape
        if (medicine) {
          const { error } = await updateMedicineAction(medicine.id, formData)
          if (error) { toast.error(error.message); return }
          toast.success("Medicine updated successfully")
        } else {
          const { error } = await createMedicineAction(formData)
          if (error) { toast.error(error.message); return }
          toast.success("Medicine created!")
        }

        // ✦ REMOVED: router.refresh() — actions call revalidateTag + revalidatePath
        onDone()
      } catch {
        setIsUploadingImage(false)
        toast.error("Something went wrong. Please try again.")
      }
    },
  })

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file")
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB")
      return
    }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const removeImage = () => {
    setImageFile(null)
    setImagePreview("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const isEditing = !!medicine

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="flex flex-col"
    >
      <div className="px-6 py-5 flex flex-col gap-5 overflow-y-auto max-h-[60vh]">

        <SectionLabel>Basic Information</SectionLabel>

        {/* Name */}
        <form.Field name="name">
          {(field) => (
            <FieldWrapper
              label="Medicine Name"
              icon={<Package2 className="w-3.5 h-3.5" />}
              error={
                touched.name && field.state.meta.errors[0] != null
                  ? String(field.state.meta.errors[0])
                  : undefined
              }
            >
              <Input
                placeholder="e.g. Paracetamol 500mg"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={() => {
                  field.handleBlur()
                  setTouched((t) => ({ ...t, name: true }))
                }}
                className={cn(
                  "h-10 transition-colors",
                  touched.name &&
                    field.state.meta.errors[0] != null &&
                    "border-destructive focus-visible:ring-destructive/30"
                )}
              />
            </FieldWrapper>
          )}
        </form.Field>

        {/* Description */}
        <form.Field name="description">
          {(field) => (
            <FieldWrapper
              label="Description"
              icon={<LayoutGrid className="w-3.5 h-3.5" />}
              hint="Optional — dosage, usage, notes"
            >
              <Textarea
                placeholder="Brief description of the medicine, usage, dosage..."
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                rows={3}
                className="resize-none text-sm leading-relaxed"
              />
            </FieldWrapper>
          )}
        </form.Field>

        <SectionLabel>Pricing & Inventory</SectionLabel>

        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <form.Field name="price">
            {(field) => (
              <FieldWrapper
                label="Price (৳)"
                icon={<CircleDollarSign className="w-3.5 h-3.5" />}
                error={
                  touched.price && field.state.meta.errors[0] != null
                    ? String(field.state.meta.errors[0])
                    : undefined
                }
              >
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    ৳
                  </span>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={field.state.value ?? ""}
                    onChange={(e) =>
                      field.handleChange(e.target.value as unknown as number)
                    }
                    onBlur={() => {
                      field.handleBlur()
                      setTouched((t) => ({ ...t, price: true }))
                    }}
                    className={cn(
                      "h-10 pl-7",
                      touched.price &&
                        field.state.meta.errors[0] != null &&
                        "border-destructive"
                    )}
                  />
                </div>
              </FieldWrapper>
            )}
          </form.Field>

          {/* Stock */}
          <form.Field name="stock">
            {(field) => (
              <FieldWrapper
                label="Stock Units"
                icon={<Boxes className="w-3.5 h-3.5" />}
                error={
                  touched.stock && field.state.meta.errors[0] != null
                    ? String(field.state.meta.errors[0])
                    : undefined
                }
              >
                <Input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={field.state.value ?? ""}
                  onChange={(e) =>
                    field.handleChange(e.target.value as unknown as number)
                  }
                  onBlur={() => {
                    field.handleBlur()
                    setTouched((t) => ({ ...t, stock: true }))
                  }}
                  className={cn(
                    "h-10",
                    touched.stock &&
                      field.state.meta.errors[0] != null &&
                      "border-destructive"
                  )}
                />
              </FieldWrapper>
            )}
          </form.Field>
        </div>

        <SectionLabel>Classification</SectionLabel>

        {/* Manufacturer */}
        <form.Field name="manufacturer">
          {(field) => (
            <FieldWrapper
              label="Manufacturer"
              icon={<Building2 className="w-3.5 h-3.5" />}
              error={
                touched.manufacturer && field.state.meta.errors[0] != null
                  ? String(field.state.meta.errors[0])
                  : undefined
              }
            >
              <Input
                placeholder="e.g. Square Pharmaceuticals Ltd."
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={() => {
                  field.handleBlur()
                  setTouched((t) => ({ ...t, manufacturer: true }))
                }}
                className={cn(
                  "h-10",
                  touched.manufacturer &&
                    field.state.meta.errors[0] != null &&
                    "border-destructive"
                )}
              />
            </FieldWrapper>
          )}
        </form.Field>

        {/* Category */}
        <form.Field name="categoryId">
          {(field) => (
            <FieldWrapper
              label="Category"
              icon={<LayoutGrid className="w-3.5 h-3.5" />}
              error={
                touched.categoryId && field.state.meta.errors[0] != null
                  ? String(field.state.meta.errors[0])
                  : undefined
              }
            >
              <Select
                value={field.state.value}
                onValueChange={(v) => {
                  field.handleChange(v)
                  setTouched((t) => ({ ...t, categoryId: true }))
                }}
              >
                <SelectTrigger
                  className={cn(
                    "h-10",
                    touched.categoryId &&
                      field.state.meta.errors[0] != null &&
                      "border-destructive"
                  )}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldWrapper>
          )}
        </form.Field>

        <SectionLabel>Medicine Image</SectionLabel>

        <div className="flex flex-col gap-2">
          {imagePreview ? (
            <div className="relative rounded-xl overflow-hidden border bg-muted/20 group aspect-video">
              <img
                src={imagePreview}
                alt="Medicine preview"
                className="w-full h-full object-contain p-6 transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                  onClick={removeImage}
                >
                  <X className="w-3.5 h-3.5 mr-1.5" />
                  Remove Image
                </Button>
              </div>
              {imageFile && (
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm truncate max-w-[200px]">
                  {imageFile.name}
                </div>
              )}
            </div>
          ) : (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragEnter={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer select-none transition-all duration-200 py-8",
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.01] shadow-sm shadow-primary/20"
                  : "border-border hover:border-primary/40 hover:bg-muted/30"
              )}
            >
              <div className={cn(
                "rounded-2xl p-3.5 transition-all duration-200",
                isDragging ? "bg-primary/10 scale-110" : "bg-muted"
              )}>
                <CloudUpload className={cn(
                  "w-6 h-6 transition-colors duration-200",
                  isDragging ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <div className="text-center px-4">
                <p className={cn(
                  "text-sm font-medium transition-colors",
                  isDragging ? "text-primary" : "text-foreground"
                )}>
                  {isDragging ? "Release to upload" : "Drag & drop image here"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  or{" "}
                  <span className="text-primary font-medium underline underline-offset-2">
                    click to browse
                  </span>{" "}
                  — PNG, JPG, WebP up to 10MB
                </p>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFile(file)
            }}
          />
        </div>
      </div>

      {/* Sticky footer */}
      <div className="border-t bg-muted/20 px-6 py-4 flex items-center gap-3 rounded-b-xl">
        <Button type="button" variant="outline" onClick={onDone} className="flex-1 h-10">
          Cancel
        </Button>

        <form.Subscribe selector={(s) => s.isSubmitting}>
          {(isSubmitting) => {
            const busy = isSubmitting || isUploadingImage
            return (
              <Button type="submit" disabled={busy} className="flex-1 h-10 font-medium shadow-sm">
                {busy ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isUploadingImage ? "Uploading image..." : "Saving..."}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {isEditing ? "Update Medicine" : "Create Medicine"}
                  </span>
                )}
              </Button>
            )
          }}
        </form.Subscribe>
      </div>
    </form>
  )
}

function FieldWrapper({
  label,
  icon,
  error,
  hint,
  children,
}: {
  label: string
  icon?: React.ReactNode
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
        {icon}
        {label}
      </Label>
      {children}
      {error ? (
        <p className="flex items-center gap-1 text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-150">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground/70">{hint}</p>
      ) : null}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 -mb-1">
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60">
        {children}
      </span>
      <div className="flex-1 h-px bg-border/60" />
    </div>
  )
}