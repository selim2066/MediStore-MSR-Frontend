"use client"
import Image from "next/image"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import {
  Camera,
  Pencil,
  X,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Save,
  ArrowLeft,
  Loader2,
} from "lucide-react"

// ─── TYPES (unchanged) ──────────────────────────────────────────────────────
type ProfileUser = {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  image?: string
  role: string
}

// ─── AVATAR (unchanged logic, new styling) ───────────────────────────────────
function Avatar({
  image,
  name,
  size = 96,
  className = "",
}: {
  image?: string
  name: string
  size?: number
  className?: string
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={size}
        height={size}
        className={`rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <div
      className={`rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-bold text-white ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.3 }}
    >
      {initials}
    </div>
  )
}

// ─── ROLE CONFIG ─────────────────────────────────────────────────────────────
const ROLE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  ADMIN:    { label: "Admin",    color: "text-rose-400",    bg: "bg-rose-500/10 border-rose-500/20" },
  SELLER:   { label: "Seller",   color: "text-amber-400",   bg: "bg-amber-500/10 border-amber-500/20" },
  CUSTOMER: { label: "Customer", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ProfileForm({ user }: { user: ProfileUser }) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── All original state (unchanged) ──
  const [mode, setMode] = useState<"view" | "edit">("view")
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const [form, setForm] = useState({
    name: user.name ?? "",
    phone: user.phone ?? "",
    address: user.address ?? "",
    image: user.image ?? "",
  })

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // ── All original handlers (unchanged) ──
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
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
  const roleConfig = ROLE_CONFIG[user.role] ?? ROLE_CONFIG.CUSTOMER

  return (
    <div className="min-h-screen bg-[#f0fdf8] dark:bg-[#020810]">
      {/* ── Ambient background orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-400/10 dark:bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal-400/10 dark:bg-teal-500/5 blur-[100px]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">

          {/* ════════════════════════════════════════════════════════
              VIEW MODE
          ════════════════════════════════════════════════════════ */}
          {mode === "view" && (
            <motion.div
              key="view"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-4"
            >
              {/* ── Hero Card ── */}
              <div className="relative rounded-3xl overflow-hidden border border-black/[0.06] dark:border-white/[0.06] shadow-xl shadow-black/5 dark:shadow-black/40">
                {/* Gradient banner */}
                <div className="h-32 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 relative">
                  {/* Mesh overlay */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                                        radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)`,
                    }}
                  />
                  {/* Grid texture */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  />
                </div>

                {/* Card body */}
                <div className="bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl px-8 pb-8">
                  {/* Avatar — overlaps banner */}
                  <div className="flex items-end justify-between -mt-12 mb-5">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.04 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="p-1 rounded-full bg-white dark:bg-[#020810] shadow-lg">
                        <Avatar
                          image={user.image}
                          name={user.name}
                          size={88}
                          className="ring-2 ring-emerald-400/40"
                        />
                      </div>
                      {/* Online dot */}
                      <span className="absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-[#020810] shadow" />
                    </motion.div>

                    {/* Role badge */}
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${roleConfig.bg} ${roleConfig.color}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {roleConfig.label}
                    </span>
                  </div>

                  {/* Name & email */}
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                      {user.name}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  {/* Edit button */}
                  <motion.button
                    onClick={() => setMode("edit")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit Profile
                  </motion.button>
                </div>
              </div>

              {/* ── Info Grid ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoCard
                  icon={<Mail className="w-4 h-4" />}
                  label="Email Address"
                  value={user.email}
                  iconColor="text-blue-400"
                  iconBg="bg-blue-500/10"
                />
                <InfoCard
                  icon={<Phone className="w-4 h-4" />}
                  label="Phone Number"
                  value={user.phone || "Not provided"}
                  muted={!user.phone}
                  iconColor="text-emerald-400"
                  iconBg="bg-emerald-500/10"
                />
                <InfoCard
                  icon={<MapPin className="w-4 h-4" />}
                  label="Address"
                  value={user.address || "Not provided"}
                  muted={!user.address}
                  iconColor="text-amber-400"
                  iconBg="bg-amber-500/10"
                />
                <InfoCard
                  icon={<ShieldCheck className="w-4 h-4" />}
                  label="Account Role"
                  value={roleConfig.label}
                  iconColor={roleConfig.color}
                  iconBg={roleConfig.bg}
                />
              </div>
            </motion.div>
          )}

          {/* ════════════════════════════════════════════════════════
              EDIT MODE
          ════════════════════════════════════════════════════════ */}
          {mode === "edit" && (
            <motion.div
              key="edit"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-5"
            >
              {/* ── Edit Header ── */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={handleCancel}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </motion.button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Update your personal information</p>
                </div>
              </div>

              {/* ── Avatar Upload Card ── */}
              <div className="rounded-3xl border border-black/[0.06] dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl p-8 flex flex-col items-center gap-4 shadow-sm">
                <div className="relative group">
                  {/* Spinning ring on hover */}
                  <motion.div
                    className="absolute -inset-2 rounded-full border-2 border-dashed border-emerald-400/40 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="p-1.5 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20">
                    {displayImage ? (
                      <Image
                        src={displayImage}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="rounded-full object-cover ring-2 ring-emerald-400/30"
                        style={{ width: 96, height: 96 }}
                      />
                    ) : (
                      <Avatar name={form.name || user.name} size={96} />
                    )}
                  </div>

                  {/* Camera overlay */}
                  <motion.button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    whileHover={{ scale: 1.05 }}
                    className="absolute inset-0 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    {uploadingImage
                      ? <Loader2 className="w-5 h-5 text-white animate-spin" />
                      : <Camera className="w-5 h-5 text-white" />
                    }
                  </motion.button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="text-sm font-medium text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  {uploadingImage ? "Uploading…" : "Change photo"}
                </button>
              </div>

              {/* ── Form Fields Card ── */}
              <div className="rounded-3xl border border-black/[0.06] dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl shadow-sm overflow-hidden">
                {/* Read-only fields */}
                <div className="px-6 pt-6 pb-4 space-y-4 border-b border-black/[0.06] dark:border-white/[0.06]">
                  <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    Account Info
                  </p>
                  <FieldRow
                    icon={<Mail className="w-4 h-4" />}
                    iconColor="text-blue-400"
                    label="Email"
                    value={user.email}
                    readOnly
                  />
                  <FieldRow
                    icon={<ShieldCheck className="w-4 h-4" />}
                    iconColor={roleConfig.color}
                    label="Role"
                    value={roleConfig.label}
                    readOnly
                  />
                </div>

                {/* Editable fields */}
                <div className="px-6 pt-4 pb-6 space-y-4">
                  <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    Personal Details
                  </p>
                  <EditField
                    id="name"
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                  <EditField
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXX XXXXXX"
                  />
                  <EditField
                    id="address"
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Your full address"
                  />
                </div>
              </div>

              {/* ── Action Buttons ── */}
              <div className="flex gap-3">
                <motion.button
                  onClick={handleCancel}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.04] text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-white dark:hover:bg-white/[0.08] transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </motion.button>

                <motion.button
                  onClick={handleSave}
                  disabled={saving || uploadingImage}
                  whileHover={{ scale: saving ? 1 : 1.01 }}
                  whileTap={{ scale: saving ? 1 : 0.98 }}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                >
                  {saving
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                    : <><Save className="w-4 h-4" /> Save Changes</>
                  }
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── INFO CARD (View mode) ────────────────────────────────────────────────────
function InfoCard({
  icon,
  label,
  value,
  muted = false,
  iconColor,
  iconBg,
}: {
  icon: React.ReactNode
  label: string
  value: string
  muted?: boolean
  iconColor: string
  iconBg: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] backdrop-blur-xl p-5 shadow-sm"
    >
      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${iconBg} ${iconColor} mb-3`}>
        {icon}
      </div>
      <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className={`text-sm font-semibold truncate ${muted ? "text-gray-400 dark:text-gray-500 italic font-normal" : "text-gray-900 dark:text-white"}`}>
        {value}
      </p>
    </motion.div>
  )
}

// ─── FIELD ROW (read-only in edit mode) ──────────────────────────────────────
function FieldRow({
  icon,
  iconColor,
  label,
  value,
  readOnly,
}: {
  icon: React.ReactNode
  iconColor: string
  label: string
  value: string
  readOnly?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={`${iconColor} flex-shrink-0`}>{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{value}</p>
      </div>
      {readOnly && (
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/[0.06] text-gray-400 dark:text-gray-500 font-medium flex-shrink-0">
          locked
        </span>
      )}
    </div>
  )
}

// ─── EDIT FIELD ───────────────────────────────────────────────────────────────
function EditField({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  id: string
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-semibold text-gray-600 dark:text-gray-300">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-11 rounded-xl border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-white/[0.04] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 transition-colors"
      />
    </div>
  )
}