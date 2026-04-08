"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createMedicineAction, updateMedicineAction } from "@/actions/medicine.action"
import { Category, Medicine } from "@/types"
import { toast } from "sonner"

interface Props {
  categories: Category[]
  medicine?: Medicine // if provided → edit mode
  onDone: () => void
}

export default function MedicineForm({ categories, medicine, onDone }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categoryId, setCategoryId] = useState(medicine?.categoryId ?? "")
  const [image, setImage] = useState<File | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.set("categoryId", categoryId)
    if (image) formData.set("image", image)
//!debug
      for (const [key, value] of formData.entries()) {
  console.log(key, value)
}

    const result = medicine
      ? await updateMedicineAction(medicine.id, formData)
      : await createMedicineAction(formData)

    setLoading(false)

    if (result.error) {
      toast.error(result.error.message)
      return
    }

    toast.success(medicine ? "Medicine updated" : "Medicine created")
    router.refresh()
    onDone()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={medicine?.name} required />
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={medicine?.description} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="price">Price (৳)</Label>
          <Input id="price" name="price" type="number" step="0.01" defaultValue={medicine?.price} required />
        </div>
        <div className="space-y-1">
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" name="stock" type="number" defaultValue={medicine?.stock} required />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="manufacturer">Manufacturer</Label>
        <Input id="manufacturer" name="manufacturer" defaultValue={medicine?.manufacturer} required />
      </div>

      <div className="space-y-1">
        <Label>Category</Label>
        <Select value={categoryId} onValueChange={setCategoryId} required>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : medicine ? "Update Medicine" : "Create Medicine"}
      </Button>
    </form>
  )
}