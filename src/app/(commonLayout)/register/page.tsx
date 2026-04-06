import { RegisterForm } from "@/components/module/authentication/registration";


export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-5">
      <RegisterForm className="w-full max-w-md" />
    </div>
  )
}