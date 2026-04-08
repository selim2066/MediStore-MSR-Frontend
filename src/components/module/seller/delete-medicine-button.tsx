"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteMedicineAction } from "@/actions/medicine.action"
import { toast } from "sonner"

export default function DeleteMedicineButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this medicine?")) return
    setLoading(true)
    const { error } = await deleteMedicineAction(id)
    setLoading(false)
    if (error) { toast.error(error.message); return }
    toast.success("Medicine deleted")
    router.refresh()
  }

  return (
    <Button size="sm" variant="destructive" onClick={handleDelete} disabled={loading}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}