"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { User } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ProfileForm({ user }: { user: User }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: user.name ?? "",
    phone: user.phone ?? "",
    address: user.address ?? "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit() {
    setLoading(true)
    const { error } = await authClient.updateUser({
      name: form.name,
      phone: form.phone,
      address: form.address,
    })
    setLoading(false)

    if (error) {
      toast.error("Failed to update profile")
      return
    }

    toast.success("Profile updated successfully")
    router.refresh()
  }

  return (
    <div className="space-y-4">
      {/* Read-only fields */}
      <div className="space-y-1">
        <Label>Email</Label>
        <Input value={user.email} disabled />
      </div>
      <div className="space-y-1">
        <Label>Role</Label>
        <Input value={user.role} disabled />
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

      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  )
}