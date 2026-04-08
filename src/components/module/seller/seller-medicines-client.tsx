"use client"

import { useState } from "react"
import { Medicine, Category } from "@/types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Pencil, Trash2, Plus } from "lucide-react"
import MedicineForm from "./medicine-form"
import DeleteMedicineButton from "./delete-medicine-button"
//import DeleteMedicineButton from "./delete-medicine-button"

interface Props {
  medicines: Medicine[]
  categories: Category[]
}

export default function SellerMedicinesClient({ medicines, categories }: Props) {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Medicine | undefined>()

  function openCreate() {
    setEditing(undefined)
    setOpen(true)
  }

  function openEdit(medicine: Medicine) {
    setEditing(medicine)
    setOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Medicines</h1>
        <Button onClick={openCreate}>
          <Plus className="w-4 h-4 mr-1" /> Add Medicine
        </Button>
      </div>

      {medicines.length === 0 ? (
        <p className="text-muted-foreground">No medicines yet. Add your first one!</p>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Price</th>
                <th className="text-left px-4 py-3">Stock</th>
                <th className="text-left px-4 py-3">Manufacturer</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{medicine.name}</td>
                  <td className="px-4 py-3">৳{medicine.price.toFixed(2)}</td>
                  <td className="px-4 py-3">{medicine.stock}</td>
                  <td className="px-4 py-3 text-muted-foreground">{medicine.manufacturer}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(medicine)}>
                        <Pencil className="w-3 h-3" />
                      </Button>
                      <DeleteMedicineButton id={medicine.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Medicine" : "Add Medicine"}</DialogTitle>
          </DialogHeader>
          <MedicineForm
            categories={categories}
            medicine={editing}
            onDone={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}