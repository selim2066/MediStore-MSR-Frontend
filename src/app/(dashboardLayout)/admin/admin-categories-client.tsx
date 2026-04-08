"use client"

import { useState } from "react"
import { Category } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { createCategoryAction, deleteCategoryAction } from "@/actions/category.action"

export default function AdminCategoriesClient({ categories: initial }: { categories: Category[] }) {
  const [categories, setCategories] = useState(initial)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleCreate() {
    if (!name.trim()) { toast.error("Name is required"); return }
    setLoading(true)
    const { data, error } = await createCategoryAction({ name, description })
    setLoading(false)
    if (error) { toast.error(error.message); return }
    toast.success("Category created")
    setCategories((prev) => [...prev, data.data])
    setName("")
    setDescription("")
  }

  async function handleDelete(id: string) {
    const { error } = await deleteCategoryAction(id)
    if (error) { toast.error(error.message); return }
    toast.success("Category deleted")
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Categories</h1>

      {/* Create form */}
      <div className="rounded-lg border p-4 space-y-3">
        <h2 className="font-semibold">Add New Category</h2>
        <Input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
        <Button onClick={handleCreate} disabled={loading}>
          {loading ? "Creating..." : "Create Category"}
        </Button>
      </div>

      {/* Categories list */}
      <div className="space-y-2">
        {categories.length === 0 ? (
          <p className="text-muted-foreground">No categories yet.</p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="font-medium">{cat.name}</p>
                {cat.description && (
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(cat.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}