// "use client"

// import { useState } from "react"
// import { Medicine, Category } from "@/types"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Pencil, Trash2, Plus } from "lucide-react"
// import MedicineForm from "./medicine-form"
// import DeleteMedicineButton from "./delete-medicine-button"
// //import DeleteMedicineButton from "./delete-medicine-button"

// interface Props {
//   medicines: Medicine[]
//   categories: Category[]
// }

// export default function SellerMedicinesClient({ medicines, categories }: Props) {
//   const [open, setOpen] = useState(false)
//   const [editing, setEditing] = useState<Medicine | undefined>()

//   function openCreate() {
//     setEditing(undefined)
//     setOpen(true)
//   }

//   function openEdit(medicine: Medicine) {
//     setEditing(medicine)
//     setOpen(true)
//   }

//   return (
//     <div className="space-y-6 py-10">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">My Medicines</h1>
//         <Button onClick={openCreate}>
//           <Plus className="w-4 h-4 mr-1" /> Add Medicine
//         </Button>
//       </div>

//       {medicines.length === 0 ? (
//         <p className="text-muted-foreground">No medicines yet. Add your first one!</p>
//       ) : (
//         <div className="rounded-lg border overflow-hidden py-10">
//           <table className="w-full text-sm">
//             <thead className="bg-muted text-muted-foreground">
//               <tr>
//                 <th className="text-left px-4 py-3">Name</th>
//                 <th className="text-left px-4 py-3">Price</th>
//                 <th className="text-left px-4 py-3">Stock</th>
//                 <th className="text-left px-4 py-3">Manufacturer</th>
//                 <th className="text-right px-4 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {medicines.map((medicine) => (
//                 <tr key={medicine.id} className="border-t">
//                   <td className="px-4 py-3 font-medium">{medicine.name}</td>
//                   <td className="px-4 py-3">৳{medicine.price.toFixed(2)}</td>
//                   <td className="px-4 py-3">{medicine.stock}</td>
//                   <td className="px-4 py-3 text-muted-foreground">{medicine.manufacturer}</td>
//                   <td className="px-4 py-3">
//                     <div className="flex items-center justify-end gap-2">
//                       <Button size="sm" variant="outline" onClick={() => openEdit(medicine)}>
//                         <Pencil className="w-3 h-3" />
//                       </Button>
//                       <DeleteMedicineButton id={medicine.id} />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <Dialog  open={open} onOpenChange={setOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{editing ? "Edit Medicine" : "Add Medicine"}</DialogTitle>
//           </DialogHeader>
//           <MedicineForm
//             categories={categories}
//             medicine={editing}
//             onDone={() => setOpen(false)}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }


// ! updated 
// src/components/module/seller/seller-medicines-client.tsx
"use client"

import { useState } from "react"
import { Medicine, Category } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Pencil, Trash2, Plus, Pill, PackageSearch } from "lucide-react" // ✦ CHANGED: added Pill, PackageSearch
import MedicineForm from "./medicine-form"
import DeleteMedicineButton from "./delete-medicine-button"
import { Badge } from "@/components/ui/badge" // ✦ NEW

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
    <div className="space-y-6 py-10">
      <div className="flex items-center justify-between">
        <div> {/* ✦ NEW: subtitle under heading */}
          <h1 className="text-2xl font-bold">My Medicines</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your medicine inventory
          </p>
        </div>
        <Button onClick={openCreate} className="gap-1.5">
          <Plus className="w-4 h-4" /> Add Medicine
        </Button>
      </div>

      {medicines.length === 0 ? (
        // ✦ NEW: Better empty state
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl">
          <div className="rounded-2xl bg-muted p-4 mb-4">
            <PackageSearch className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="font-medium text-muted-foreground">No medicines listed yet</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Click Add Medicine to get started</p>
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-muted-foreground border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Price</th>
                <th className="text-left px-4 py-3 font-medium">Stock</th>
                <th className="text-left px-4 py-3 font-medium">Manufacturer</th>
                {/* ✦ NEW: stock badge column */}
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine.id} className="border-t hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{medicine.name}</td>
                  <td className="px-4 py-3 tabular-nums">৳{medicine.price.toFixed(2)}</td>
                  <td className="px-4 py-3 tabular-nums">{medicine.stock}</td>
                  <td className="px-4 py-3 text-muted-foreground">{medicine.manufacturer}</td>
                  {/* ✦ NEW: low stock badge */}
                  <td className="px-4 py-3">
                    {medicine.stock === 0 ? (
                      <Badge variant="destructive" className="text-xs">Out of stock</Badge>
                    ) : medicine.stock <= 10 ? (
                      <Badge variant="outline" className="text-xs border-orange-400 text-orange-500">Low stock</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs border-green-400 text-green-600">In stock</Badge>
                    )}
                  </td>
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

      {/* ✦ CHANGED: Wider dialog, p-0 so form controls own spacing, overflow-hidden for rounded corners */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-xl p-0 gap-0 overflow-hidden"
          showCloseButton={false} // ✦ CHANGED: we handle close in form footer
        >
          {/* ✦ NEW: Styled header with icon accent + subtitle */}
          <DialogHeader className="px-6 pt-6 pb-5 border-b bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5 shrink-0">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-base font-semibold leading-tight">
                  {editing ? "Edit Medicine" : "Add New Medicine"}
                </DialogTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {editing
                    ? `Updating details for ${editing.name}`
                    : "Fill in the details to list a new medicine"}
                </p>
              </div>
            </div>
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