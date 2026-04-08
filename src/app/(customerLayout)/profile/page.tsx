import { userService } from "@/service/user.service"
import { redirect } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { UserCircle } from "lucide-react"
import ProfileForm from "@/components/module/profile/profile-form"

export default async function ProfilePage() {
  const { data: session, error } = await userService.getSession()

  if (error || !session?.user) redirect("/login")

  const user = session.user

  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <UserCircle className="w-10 h-10 text-muted-foreground" />
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account details
          </p>
        </div>
      </div>

      <Separator />

      <ProfileForm user={user} />
    </div>
  )
}