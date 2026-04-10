// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { authClient } from "@/lib/auth-client"
// import { User } from "@/types"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { toast } from "sonner"

// export default function ProfileForm({ user }: { user: User }) {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [form, setForm] = useState({
//     name: user.name ?? "",
//     phone: user.phone ?? "",
//     address: user.address ?? "",
//   })

//   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   async function handleSubmit() {
//     setLoading(true)
//     const { error } = await authClient.updateUser({
//       name: form.name,
//       phone: form.phone,
//       address: form.address,
//     })
//     setLoading(false)

//     if (error) {
//       toast.error("Failed to update profile")
//       return
//     }

//     toast.success("Profile updated successfully")
//     router.refresh()
//   }

//   return (
//     <div className="space-y-4">
//       {/* Read-only fields */}
//       <div className="space-y-1">
//         <Label>Email</Label>
//         <Input value={user.email} disabled />
//       </div>
//       <div className="space-y-1">
//         <Label>Role</Label>
//         <Input value={user.role} disabled />
//       </div>

//       {/* Editable fields */}
//       <div className="space-y-1">
//         <Label htmlFor="name">Name</Label>
//         <Input
//           id="name"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Your name"
//         />
//       </div>
//       <div className="space-y-1">
//         <Label htmlFor="phone">Phone</Label>
//         <Input
//           id="phone"
//           name="phone"
//           value={form.phone}
//           onChange={handleChange}
//           placeholder="Your phone number"
//         />
//       </div>
//       <div className="space-y-1">
//         <Label htmlFor="address">Address</Label>
//         <Input
//           id="address"
//           name="address"
//           value={form.address}
//           onChange={handleChange}
//           placeholder="Your address"
//         />
//       </div>

//       <Button onClick={handleSubmit} disabled={loading} className="w-full">
//         {loading ? "Saving..." : "Save Changes"}
//       </Button>
//     </div>
//   )
// }

// ! updated profile form 
"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { User } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  Camera,
  Pencil,
  X,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  UserCircle,
} from "lucide-react"

type ProfileUser = {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  image?: string
  role: string
}

// Initials fallback when no image
function Avatar({
  image,
  name,
  size = 96,
}: {
  image?: string
  name: string
  size?: number
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <div
      className="rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-2xl"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  )
}

const roleBadgeVariant: Record<string, "default" | "secondary" | "destructive"> = {
  ADMIN: "destructive",
  SELLER: "default",
  CUSTOMER: "secondary",
}

export default function ProfileForm({ user }: { user: ProfileUser }) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [mode, setMode] = useState<"view" | "edit">("view")
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const [form, setForm] = useState({
    name: user.name ?? "",
    phone: user.phone ?? "",
    address: user.address ?? "",
    image: user.image ?? "",
  })

  // Preview before upload completes
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Show local preview immediately
    setPreviewUrl(URL.createObjectURL(file))

    try {
      setUploadingImage(true)
      const url = await uploadToCloudinary(file)
      setForm((prev) => ({ ...prev, image: url }))
      toast.success("Image uploaded")
    } catch {
      toast.error("Image upload failed")
      setPreviewUrl(null)
    } finally {
      setUploadingImage(false)
    }
  }

  function handleCancel() {
    // Reset everything back to server values
    setForm({
      name: user.name ?? "",
      phone: user.phone ?? "",
      address: user.address ?? "",
      image: user.image ?? "",
    })
    setPreviewUrl(null)
    setMode("view")
  }

  async function handleSave() {
    setSaving(true)
    const { error } = await authClient.updateUser({
      name: form.name,
      phone: form.phone,
      address: form.address,
      image: form.image || undefined,
    })
    setSaving(false)

    if (error) {
      toast.error("Failed to update profile")
      return
    }

    toast.success("Profile updated")
    setPreviewUrl(null)
    setMode("view")
    router.refresh()
  }

  const displayImage = previewUrl || form.image || user.image

  // ─── VIEW MODE ──────────────────────────────────────────────────────────────
  if (mode === "view") {
    return (
      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        {/* Top card */}
        <div className="rounded-2xl border bg-card p-6 flex flex-col items-center gap-4 text-center shadow-sm">
          <Avatar image={user.image} name={user.name} size={96} />
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <Badge
              variant={roleBadgeVariant[user.role] ?? "secondary"}
              className="mt-2"
            >
              {user.role}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setMode("edit")}
          >
            <Pencil className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>

        {/* Info rows */}
        <div className="rounded-2xl border bg-card shadow-sm divide-y">
          <InfoRow icon={<Mail className="w-4 h-4" />} label="Email" value={user.email} />
          <InfoRow
            icon={<Phone className="w-4 h-4" />}
            label="Phone"
            value={user.phone || "Not provided"}
            muted={!user.phone}
          />
          <InfoRow
            icon={<MapPin className="w-4 h-4" />}
            label="Address"
            value={user.address || "Not provided"}
            muted={!user.address}
          />
          <InfoRow
            icon={<ShieldCheck className="w-4 h-4" />}
            label="Role"
            value={user.role}
          />
        </div>
      </div>
    )
  }

  // ─── EDIT MODE ───────────────────────────────────────────────────────────────
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Edit Profile</h1>
          <p className="text-sm text-muted-foreground">Update your information</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <Separator />

      {/* Avatar upload */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative group">
          {displayImage ? (
            <img
              src={displayImage}
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full object-cover w-24 h-24"
            />
          ) : (
            <Avatar name={form.name || user.name} size={96} />
          )}

          {/* Overlay */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingImage}
            className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <Camera className="w-5 h-5 text-white" />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadingImage}
          className="gap-2"
        >
          <Camera className="w-4 h-4" />
          {uploadingImage ? "Uploading..." : "Change Photo"}
        </Button>
      </div>

      <Separator />

      {/* Read-only fields */}
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs uppercase tracking-wide">Email</Label>
        <Input value={user.email} disabled className="bg-muted" />
      </div>
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs uppercase tracking-wide">Role</Label>
        <Input value={user.role} disabled className="bg-muted" />
      </div>

      {/* Editable fields */}
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Your phone number"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Your address"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex-1" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          className="flex-1"
          onClick={handleSave}
          disabled={saving || uploadingImage}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}

// ─── Helper component ──────────────────────────────────────────────────────────
function InfoRow({
  icon,
  label,
  value,
  muted = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <span className="text-muted-foreground">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className={`text-sm font-medium truncate ${muted ? "text-muted-foreground italic" : ""}`}>
          {value}
        </p>
      </div>
    </div>
  )
}