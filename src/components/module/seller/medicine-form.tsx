// // ! better ui ux:

// // src/components/module/seller/medicine-form.tsx
// "use client"

// import { useState, useRef, useCallback } from "react"
// import { useForm } from "@tanstack/react-form"
// import { z } from "zod"
// import { toast } from "sonner"
// import { Medicine, Category } from "@/types"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { uploadToCloudinary } from "@/lib/cloudinary"
// // ✦ CHANGED: import server actions instead of medicineService directly
// import { createMedicineAction, updateMedicineAction } from "@/actions/medicine.action"
// import {
//   X,
//   Package2,
//   CircleDollarSign,
//   Boxes,
//   Building2,
//   LayoutGrid,
//   CheckCircle2,
//   AlertCircle,
//   CloudUpload,
//   Loader2,
// } from "lucide-react"
// import { cn } from "@/lib/utils"

// const medicineSchema = z.object({
//   name: z.string().min(2, "At least 2 characters required"),
//   description: z.string().optional(),
//   price: z.coerce.number().min(0.01, "Must be greater than 0"),
//   stock: z.coerce.number().int().min(0, "Cannot be negative"),
//   manufacturer: z.string().min(2, "Manufacturer name required"),
//   categoryId: z.string().min(1, "Please select a category"),
// })

// interface Props {
//   categories: Category[]
//   medicine?: Medicine
//   onDone: () => void
// }

// export default function MedicineForm({ categories, medicine, onDone }: Props) {
//   // ✦ REMOVED: useRouter — revalidatePath inside actions handles cache refresh

//   const [imageFile, setImageFile] = useState<File | null>(null)
//   const [imagePreview, setImagePreview] = useState<string>(medicine?.image ?? "")
//   const [isDragging, setIsDragging] = useState(false)
//   const [isUploadingImage, setIsUploadingImage] = useState(false)
//   const [touched, setTouched] = useState<Record<string, boolean>>({})
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const form = useForm({
//     defaultValues: {
//       name: medicine?.name ?? "",
//       description: medicine?.description ?? "",
//       price: medicine?.price ?? ("" as unknown as number),
//       stock: medicine?.stock ?? ("" as unknown as number),
//       manufacturer: medicine?.manufacturer ?? "",
//       categoryId: medicine?.categoryId ?? "",
//     },
//     onSubmit: async ({ value }) => {
//       const parsed = medicineSchema.safeParse(value)
//       if (!parsed.success) {
//         toast.error(parsed.error.issues[0].message)
//         return
//       }

//       try {
//         // ✦ CHANGED: image upload isolated with its own loading flag
//         setIsUploadingImage(true)
//         let imageUrl = medicine?.image ?? ""
//         if (imageFile) {
//           imageUrl = await uploadToCloudinary(imageFile)
//         }
//         setIsUploadingImage(false)

//         const formData = new FormData()
//         formData.append("name", parsed.data.name)
//         formData.append("description", parsed.data.description ?? "")
//         formData.append("price", String(parsed.data.price))
//         formData.append("stock", String(parsed.data.stock))
//         formData.append("manufacturer", parsed.data.manufacturer)
//         formData.append("categoryId", parsed.data.categoryId)
//         if (imageUrl) formData.append("image", imageUrl)

//         // ✦ CHANGED: call server actions, check their returned error shape
//         if (medicine) {
//           const { error } = await updateMedicineAction(medicine.id, formData)
//           if (error) { toast.error(error.message); return }
//           toast.success("Medicine updated successfully")
//         } else {
//           const { error } = await createMedicineAction(formData)
//           if (error) { toast.error(error.message); return }
//           toast.success("Medicine created!")
//         }

//         // ✦ REMOVED: router.refresh() — actions call revalidateTag + revalidatePath
//         onDone()
//       } catch {
//         setIsUploadingImage(false)
//         toast.error("Something went wrong. Please try again.")
//       }
//     },
//   })

//   const handleFile = useCallback((file: File) => {
//     if (!file.type.startsWith("image/")) {
//       toast.error("Please select a valid image file")
//       return
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       toast.error("Image must be under 10MB")
//       return
//     }
//     setImageFile(file)
//     setImagePreview(URL.createObjectURL(file))
//   }, [])

//   const handleDrop = useCallback(
//     (e: React.DragEvent) => {
//       e.preventDefault()
//       setIsDragging(false)
//       const file = e.dataTransfer.files[0]
//       if (file) handleFile(file)
//     },
//     [handleFile]
//   )

//   const removeImage = () => {
//     setImageFile(null)
//     setImagePreview("")
//     if (fileInputRef.current) fileInputRef.current.value = ""
//   }

//   const isEditing = !!medicine

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault()
//         form.handleSubmit()
//       }}
//       className="flex flex-col"
//     >
//       <div className="px-6 py-5 flex flex-col gap-5 overflow-y-auto max-h-[60vh]">

//         <SectionLabel>Basic Information</SectionLabel>

//         {/* Name */}
//         <form.Field name="name">
//           {(field) => (
//             <FieldWrapper
//               label="Medicine Name"
//               icon={<Package2 className="w-3.5 h-3.5" />}
//               error={
//                 touched.name && field.state.meta.errors[0] != null
//                   ? String(field.state.meta.errors[0])
//                   : undefined
//               }
//             >
//               <Input
//                 placeholder="e.g. Paracetamol 500mg"
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//                 onBlur={() => {
//                   field.handleBlur()
//                   setTouched((t) => ({ ...t, name: true }))
//                 }}
//                 className={cn(
//                   "h-10 transition-colors",
//                   touched.name &&
//                     field.state.meta.errors[0] != null &&
//                     "border-destructive focus-visible:ring-destructive/30"
//                 )}
//               />
//             </FieldWrapper>
//           )}
//         </form.Field>

//         {/* Description */}
//         <form.Field name="description">
//           {(field) => (
//             <FieldWrapper
//               label="Description"
//               icon={<LayoutGrid className="w-3.5 h-3.5" />}
//               hint="Optional — dosage, usage, notes"
//             >
//               <Textarea
//                 placeholder="Brief description of the medicine, usage, dosage..."
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//                 rows={3}
//                 className="resize-none text-sm leading-relaxed"
//               />
//             </FieldWrapper>
//           )}
//         </form.Field>

//         <SectionLabel>Pricing & Inventory</SectionLabel>

//         <div className="grid grid-cols-2 gap-4">
//           {/* Price */}
//           <form.Field name="price">
//             {(field) => (
//               <FieldWrapper
//                 label="Price (৳)"
//                 icon={<CircleDollarSign className="w-3.5 h-3.5" />}
//                 error={
//                   touched.price && field.state.meta.errors[0] != null
//                     ? String(field.state.meta.errors[0])
//                     : undefined
//                 }
//               >
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
//                     ৳
//                   </span>
//                   <Input
//                     type="number"
//                     step="0.01"
//                     min="0"
//                     placeholder="0.00"
//                     value={field.state.value ?? ""}
//                     onChange={(e) =>
//                       field.handleChange(e.target.value as unknown as number)
//                     }
//                     onBlur={() => {
//                       field.handleBlur()
//                       setTouched((t) => ({ ...t, price: true }))
//                     }}
//                     className={cn(
//                       "h-10 pl-7",
//                       touched.price &&
//                         field.state.meta.errors[0] != null &&
//                         "border-destructive"
//                     )}
//                   />
//                 </div>
//               </FieldWrapper>
//             )}
//           </form.Field>

//           {/* Stock */}
//           <form.Field name="stock">
//             {(field) => (
//               <FieldWrapper
//                 label="Stock Units"
//                 icon={<Boxes className="w-3.5 h-3.5" />}
//                 error={
//                   touched.stock && field.state.meta.errors[0] != null
//                     ? String(field.state.meta.errors[0])
//                     : undefined
//                 }
//               >
//                 <Input
//                   type="number"
//                   min="0"
//                   placeholder="0"
//                   value={field.state.value ?? ""}
//                   onChange={(e) =>
//                     field.handleChange(e.target.value as unknown as number)
//                   }
//                   onBlur={() => {
//                     field.handleBlur()
//                     setTouched((t) => ({ ...t, stock: true }))
//                   }}
//                   className={cn(
//                     "h-10",
//                     touched.stock &&
//                       field.state.meta.errors[0] != null &&
//                       "border-destructive"
//                   )}
//                 />
//               </FieldWrapper>
//             )}
//           </form.Field>
//         </div>

//         <SectionLabel>Classification</SectionLabel>

//         {/* Manufacturer */}
//         <form.Field name="manufacturer">
//           {(field) => (
//             <FieldWrapper
//               label="Manufacturer"
//               icon={<Building2 className="w-3.5 h-3.5" />}
//               error={
//                 touched.manufacturer && field.state.meta.errors[0] != null
//                   ? String(field.state.meta.errors[0])
//                   : undefined
//               }
//             >
//               <Input
//                 placeholder="e.g. Square Pharmaceuticals Ltd."
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//                 onBlur={() => {
//                   field.handleBlur()
//                   setTouched((t) => ({ ...t, manufacturer: true }))
//                 }}
//                 className={cn(
//                   "h-10",
//                   touched.manufacturer &&
//                     field.state.meta.errors[0] != null &&
//                     "border-destructive"
//                 )}
//               />
//             </FieldWrapper>
//           )}
//         </form.Field>

//         {/* Category */}
//         <form.Field name="categoryId">
//           {(field) => (
//             <FieldWrapper
//               label="Category"
//               icon={<LayoutGrid className="w-3.5 h-3.5" />}
//               error={
//                 touched.categoryId && field.state.meta.errors[0] != null
//                   ? String(field.state.meta.errors[0])
//                   : undefined
//               }
//             >
//               <Select
//                 value={field.state.value}
//                 onValueChange={(v) => {
//                   field.handleChange(v)
//                   setTouched((t) => ({ ...t, categoryId: true }))
//                 }}
//               >
//                 <SelectTrigger
//                   className={cn(
//                     "h-10",
//                     touched.categoryId &&
//                       field.state.meta.errors[0] != null &&
//                       "border-destructive"
//                   )}
//                 >
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((cat) => (
//                     <SelectItem key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </FieldWrapper>
//           )}
//         </form.Field>

//         <SectionLabel>Medicine Image</SectionLabel>

//         <div className="flex flex-col gap-2">
//           {imagePreview ? (
//             <div className="relative rounded-xl overflow-hidden border bg-muted/20 group aspect-video">
//               <img
//                 src={imagePreview}
//                 alt="Medicine preview"
//                 className="w-full h-full object-contain p-6 transition-transform group-hover:scale-105 duration-300"
//               />
//               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
//                 <Button
//                   type="button"
//                   size="sm"
//                   variant="destructive"
//                   className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
//                   onClick={removeImage}
//                 >
//                   <X className="w-3.5 h-3.5 mr-1.5" />
//                   Remove Image
//                 </Button>
//               </div>
//               {imageFile && (
//                 <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm truncate max-w-[200px]">
//                   {imageFile.name}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div
//               onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
//               onDragEnter={(e) => { e.preventDefault(); setIsDragging(true) }}
//               onDragLeave={() => setIsDragging(false)}
//               onDrop={handleDrop}
//               onClick={() => fileInputRef.current?.click()}
//               className={cn(
//                 "border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer select-none transition-all duration-200 py-8",
//                 isDragging
//                   ? "border-primary bg-primary/5 scale-[1.01] shadow-sm shadow-primary/20"
//                   : "border-border hover:border-primary/40 hover:bg-muted/30"
//               )}
//             >
//               <div className={cn(
//                 "rounded-2xl p-3.5 transition-all duration-200",
//                 isDragging ? "bg-primary/10 scale-110" : "bg-muted"
//               )}>
//                 <CloudUpload className={cn(
//                   "w-6 h-6 transition-colors duration-200",
//                   isDragging ? "text-primary" : "text-muted-foreground"
//                 )} />
//               </div>
//               <div className="text-center px-4">
//                 <p className={cn(
//                   "text-sm font-medium transition-colors",
//                   isDragging ? "text-primary" : "text-foreground"
//                 )}>
//                   {isDragging ? "Release to upload" : "Drag & drop image here"}
//                 </p>
//                 <p className="text-xs text-muted-foreground mt-1">
//                   or{" "}
//                   <span className="text-primary font-medium underline underline-offset-2">
//                     click to browse
//                   </span>{" "}
//                   — PNG, JPG, WebP up to 10MB
//                 </p>
//               </div>
//             </div>
//           )}

//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={(e) => {
//               const file = e.target.files?.[0]
//               if (file) handleFile(file)
//             }}
//           />
//         </div>
//       </div>

//       {/* Sticky footer */}
//       <div className="border-t bg-muted/20 px-6 py-4 flex items-center gap-3 rounded-b-xl">
//         <Button type="button" variant="outline" onClick={onDone} className="flex-1 h-10">
//           Cancel
//         </Button>

//         <form.Subscribe selector={(s) => s.isSubmitting}>
//           {(isSubmitting) => {
//             const busy = isSubmitting || isUploadingImage
//             return (
//               <Button type="submit" disabled={busy} className="flex-1 h-10 font-medium shadow-sm">
//                 {busy ? (
//                   <span className="flex items-center gap-2">
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     {isUploadingImage ? "Uploading image..." : "Saving..."}
//                   </span>
//                 ) : (
//                   <span className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4" />
//                     {isEditing ? "Update Medicine" : "Create Medicine"}
//                   </span>
//                 )}
//               </Button>
//             )
//           }}
//         </form.Subscribe>
//       </div>
//     </form>
//   )
// }

// function FieldWrapper({
//   label,
//   icon,
//   error,
//   hint,
//   children,
// }: {
//   label: string
//   icon?: React.ReactNode
//   error?: string
//   hint?: string
//   children: React.ReactNode
// }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <Label className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
//         {icon}
//         {label}
//       </Label>
//       {children}
//       {error ? (
//         <p className="flex items-center gap-1 text-xs text-destructive animate-in fade-in slide-in-from-top-1 duration-150">
//           <AlertCircle className="w-3 h-3 shrink-0" />
//           {error}
//         </p>
//       ) : hint ? (
//         <p className="text-xs text-muted-foreground/70">{hint}</p>
//       ) : null}
//     </div>
//   )
// }

// function SectionLabel({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex items-center gap-3 -mb-1">
//       <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60">
//         {children}
//       </span>
//       <div className="flex-1 h-px bg-border/60" />
//     </div>
//   )
// }

// !stn

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
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { createMedicineAction, updateMedicineAction } from "@/actions/medicine.action"
import {
  X, Package2, CircleDollarSign, Boxes, Building2, LayoutGrid,
  CheckCircle2, AlertCircle, CloudUpload, Loader2, Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

const medicineSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01),
  stock: z.coerce.number().int().min(0),
  manufacturer: z.string().min(2),
  categoryId: z.string().min(1),
})

interface Props {
  categories: Category[]
  medicine?: Medicine
  onDone: () => void
}

export default function MedicineForm({ categories, medicine, onDone }: Props) {

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState(medicine?.image ?? "")
  const [extraImages, setExtraImages] = useState<string[]>(medicine?.images ?? [])

  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const extraInputRef = useRef<HTMLInputElement>(null)

  const form = useForm({
    defaultValues: {
      name: medicine?.name ?? "",
      description: medicine?.description ?? "",
      price: medicine?.price ?? ("" as any),
      stock: medicine?.stock ?? ("" as any),
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
        setIsUploading(true)

        let imageUrl = imagePreview
        if (imageFile) {
          imageUrl = await uploadToCloudinary(imageFile)
        }

        const formData = new FormData()
        Object.entries(parsed.data).forEach(([k, v]) =>
          formData.append(k, String(v))
        )

        if (imageUrl) formData.append("image", imageUrl)
        extraImages.forEach((img) => formData.append("images", img))

        const action = medicine
          ? updateMedicineAction(medicine.id, formData)
          : createMedicineAction(formData)

        const { error } = await action
        if (error) return toast.error(error.message)

        toast.success(medicine ? "Updated!" : "Created!")
        onDone()
      } catch {
        toast.error("Something went wrong")
      } finally {
        setIsUploading(false)
      }
    },
  })

  const handleMainImage = (file: File) => {
    if (!file.type.startsWith("image/")) return toast.error("Invalid file")
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const addExtraImage = async (file: File) => {
    if (extraImages.length >= 3) return toast.error("Max 3 images")

    const url = await uploadToCloudinary(file)
    setExtraImages((prev) => [...prev, url])
  }

  const removeExtra = (i: number) => {
    setExtraImages((prev) => prev.filter((_, idx) => idx !== i))
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="flex flex-col h-[80vh]"
    >

      {/* 🔥 SCROLLABLE BODY */}
      <div
        className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5"
        onWheel={(e) => e.stopPropagation()}
      >

        <SectionLabel>Basic Info</SectionLabel>

        <form.Field name="name">
          {(field) => (
            <FieldWrapper label="Name">
              <Input value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)} />
            </FieldWrapper>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <FieldWrapper label="Description">
              <Textarea value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)} />
            </FieldWrapper>
          )}
        </form.Field>

        <SectionLabel>Pricing</SectionLabel>

        <form.Field name="price">
          {(field) => (
            <FieldWrapper label="Price">
              <Input type="number"
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value as any)} />
            </FieldWrapper>
          )}
        </form.Field>

        <form.Field name="stock">
          {(field) => (
            <FieldWrapper label="Stock">
              <Input type="number"
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value as any)} />
            </FieldWrapper>
          )}
        </form.Field>

        <SectionLabel>Details</SectionLabel>

        <form.Field name="manufacturer">
          {(field) => (
            <FieldWrapper label="Manufacturer">
              <Input value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)} />
            </FieldWrapper>
          )}
        </form.Field>

        <form.Field name="categoryId">
          {(field) => (
            <Select onValueChange={field.handleChange} value={field.state.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </form.Field>

        {/* MAIN IMAGE */}
        <SectionLabel>Main Image</SectionLabel>

        <div onClick={() => fileInputRef.current?.click()}
          className="border-dashed border rounded-xl p-6 text-center cursor-pointer">
          {imagePreview ? (
            <img src={imagePreview} className="h-40 mx-auto object-contain" />
          ) : "Upload image"}
        </div>

        <input ref={fileInputRef} type="file" hidden
          onChange={(e) => e.target.files?.[0] && handleMainImage(e.target.files[0])}
        />

        {/* EXTRA IMAGES */}
        <SectionLabel>Gallery</SectionLabel>

        <div className="grid grid-cols-3 gap-3">
          {extraImages.map((img, i) => (
            <div key={i} className="relative">
              <img src={img} className="h-24 w-full object-cover rounded-lg" />
              <button onClick={() => removeExtra(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                <X size={12} />
              </button>
            </div>
          ))}

          {extraImages.length < 3 && (
            <button type="button"
              onClick={() => extraInputRef.current?.click()}
              className="border-dashed border rounded-lg flex items-center justify-center">
              <Plus />
            </button>
          )}
        </div>

        <input ref={extraInputRef} type="file" hidden
          onChange={(e) => e.target.files?.[0] && addExtraImage(e.target.files[0])}
        />

      </div>

      {/* FOOTER */}
      <div className="border-t px-6 py-4 flex gap-3">
        <Button type="button" variant="outline" onClick={onDone} className="flex-1">
          Cancel
        </Button>

        <Button type="submit" disabled={isUploading} className="flex-1">
          {isUploading ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </div>

    </form>
  )
}

function FieldWrapper({ label, children }: any) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      {children}
    </div>
  )
}

function SectionLabel({ children }: any) {
  return (
    <div className="text-xs font-bold text-muted-foreground uppercase">
      {children}
    </div>
  )
}