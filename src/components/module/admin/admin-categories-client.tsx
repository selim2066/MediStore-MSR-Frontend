"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { createCategoryAction, deleteCategoryAction } from "@/actions/category.action"
import type { Category } from "@/types"

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string(),
})

export default function AdminCategoriesClient({
  categories: initial,
}: {
  categories: Category[]
}) {
  const [categories, setCategories] = useState<Category[]>(initial)

  const form = useForm({
    defaultValues: { name: "", description: "" },
    onSubmit: async ({ value }) => {
      const parsed = schema.safeParse(value)
      if (!parsed.success) {
        toast.error(parsed.error.issues[0].message)
        return
      }
      const { data, error } = await createCategoryAction({
        name: parsed.data.name,
        description: parsed.data.description || undefined,
      })
      if (error || !data) {
        toast.error(error?.message ?? "Failed to create category")
        return
      }
      toast.success("Category created")
      setCategories((prev) => [...prev, data.data])
      form.reset()
    },
  })

  const handleDelete = async (id: string) => {
    const { error } = await deleteCategoryAction(id)
    if (error) {
      toast.error(error.message ?? "Failed to delete category")
      return
    }
    toast.success("Category deleted")
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage medicine categories for your store
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Form Card */}
        <Card className="md:col-span-1 shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Add Category</CardTitle>
            <CardDescription>Create a new medicine category</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="space-y-4"
            >
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) => {
                    const r = schema.shape.name.safeParse(value)
                    return r.success ? undefined : r.error.issues[0].message
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      placeholder="e.g. Antibiotics"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="focus-visible:ring-2"
                    />
                    {field.state.meta.errors[0] && (
                      <p className="text-destructive text-xs">
                        {field.state.meta.errors[0].toString()}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="description">
                {(field) => (
                  <div className="space-y-1">
                    <label className="text-sm font-medium">
                      Description <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <Input
                      placeholder="Short description"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </div>
                )}
              </form.Field>

              <form.Subscribe selector={(s) => s.isSubmitting}>
                {(isSubmitting) => (
                  <Button className="w-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating…" : "Create Category"}
                  </Button>
                )}
              </form.Subscribe>
            </form>
          </CardContent>
        </Card>

        {/* Table Card */}
        <Card className="md:col-span-2 shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle>All Categories</CardTitle>
            <CardDescription>
              View and manage your existing categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-20 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center text-muted-foreground py-10"
                      >
                        No categories yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories.map((cat) => (
                      <TableRow key={cat.id} className="hover:bg-muted/50 transition">
                        <TableCell className="font-medium">
                          {cat.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {cat.description ?? "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete `{cat.name}`?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. Medicines in this category may be affected.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => handleDelete(cat.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
