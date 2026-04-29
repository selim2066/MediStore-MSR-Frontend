// "use client"

// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { authClient } from "@/lib/auth-client"
// import { useForm } from "@tanstack/react-form"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { toast } from "sonner"
// import { z } from "zod"
// import { Eye, EyeOff } from "lucide-react"
// import { useState } from "react"

// const formSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.email("Invalid email address"),
//   password: z.string().min(8, "Minimum 8 characters required"),
//   role: z.enum(["CUSTOMER", "SELLER"], {
//     error: "Please select a role",
//   }),
// })

// export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
//   const router = useRouter()
//   const [showPassword, setShowPassword] = useState(false)

//   const form = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       role: "CUSTOMER" as "CUSTOMER" | "SELLER",
//     },
//     validators: { onSubmit: formSchema },
//     onSubmit: async ({ value }) => {
//       const toastId = toast.loading("Creating your account...")
//       try {
//         const { data, error } = await authClient.signUp.email({
//           name: value.name,
//           email: value.email,
//           password: value.password,
//           role: value.role,
//         })

//         if (error) {
//           toast.error(error.message, { id: toastId })
//           return
//         }

//         toast.success("Account created! Please verify your email.", { id: toastId })
//         router.push("/login")

//       } catch (_) {
//         toast.error("Failed to create account. Please try again.", { id: toastId })
//       }
//     },
//   })

//   return (
//     <Card {...props}>
//       <CardHeader>
//         <CardTitle>Create an Account</CardTitle>
//         <CardDescription>
//           Join MediStore as a customer or seller
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form
//           id="register-form"
//           onSubmit={(e) => {
//             e.preventDefault()
//             form.handleSubmit()
//           }}
//         />

//         <FieldGroup>
//           {/* Name */}
//           <form.Field name="name">
//             {(field) => {
//               const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
//                   <Input
//                     id={field.name}
//                     name={field.name}
//                     value={field.state.value}
//                     onChange={(e) => field.handleChange(e.target.value)}
//                     type="text"
//                     placeholder="Md Selim Reza"
//                   />
//                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                 </Field>
//               )
//             }}
//           </form.Field>

//           {/* Email */}
//           <form.Field name="email">
//             {(field) => {
//               const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>Email</FieldLabel>
//                   <Input
//                     id={field.name}
//                     name={field.name}
//                     value={field.state.value}
//                     onChange={(e) => field.handleChange(e.target.value)}
//                     type="email"
//                     placeholder="you@example.com"
//                   />
//                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                 </Field>
//               )
//             }}
//           </form.Field>

//           {/* Password */}
//           <form.Field name="password">
//   {(field) => {
//     const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
//     return (
//       <Field data-invalid={isInvalid}>
//         <FieldLabel htmlFor={field.name}>Password</FieldLabel>
//         <div className="relative">
//           <Input
//             id={field.name}
//             name={field.name}
//             value={field.state.value}
//             onChange={(e) => field.handleChange(e.target.value)}
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter your password"
//             className="pr-10"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword((prev) => !prev)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//           >
//             {showPassword ? (
//               <EyeOff className="w-4 h-4" />
//             ) : (
//               <Eye className="w-4 h-4" />
//             )}
//           </button>
//         </div>
//         {isInvalid && <FieldError errors={field.state.meta.errors} />}
//       </Field>
//     )
//   }}
// </form.Field>

//           {/* Role */}
//           <form.Field name="role">
//             {(field) => {
//               const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>I want to join as</FieldLabel>
//                   <Select
//                     value={field.state.value}
//                     onValueChange={(value) =>
//                       field.handleChange(value as "CUSTOMER" | "SELLER")
//                     }
//                   >
//                     <SelectTrigger id={field.name}>
//                       <SelectValue placeholder="Select your role" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="CUSTOMER">
//                         Customer — Browse and order medicines
//                       </SelectItem>
//                       <SelectItem value="SELLER">
//                         Seller — Sell medicines on MediStore
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                 </Field>
//               )
//             }}
//           </form.Field>
//         </FieldGroup>
//       </CardContent>

//       <CardFooter className="flex flex-col gap-4">
//         <Button className="w-full" form="register-form" type="submit">
//           Create Account
//         </Button>
//         <p className="text-sm text-center text-muted-foreground">
//           Already have an account?{" "}
//           <Link href="/login" className="text-primary underline">
//             Login
//           </Link>
//         </p>
//       </CardFooter>
//     </Card>
//   )
// }




// !── SLIDER CONTENT ─────────────────────────────────────────────────
"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Minimum 8 characters required"),
  role: z.enum(["CUSTOMER", "SELLER"], {
    error: "Please select a role",
  }),
});

interface RegisterFormProps {
  /** Called when user clicks "Login" link — handled by AuthSlider */
  onSwitchToLogin?: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // ── Business logic: untouched ──────────────────────────────────────────────
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER" as "CUSTOMER" | "SELLER",
    },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your account...");
      try {
        const { data, error } = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
          role: value.role,
        });
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Account created! Please verify your email.", {
          id: toastId,
        });
        router.push("/login");
      } catch (_) {
        toast.error("Failed to create account. Please try again.", {
          id: toastId,
        });
      }
    },
  });
  // ── End business logic ─────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-medium">Create an account</CardTitle>
        <CardDescription>
          Join MediStore as a customer or seller
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0 flex-1">
        {/* Hidden real form element for submit binding */}
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        />

        <FieldGroup>
          {/* Name */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="text"
                    placeholder="Md Selim Reza"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="email"
                    placeholder="you@example.com"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Role */}
          <form.Field name="role">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>I want to join as</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) =>
                      field.handleChange(value as "CUSTOMER" | "SELLER")
                    }
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CUSTOMER">
                        Customer — Browse and order medicines
                      </SelectItem>
                      <SelectItem value="SELLER">
                        Seller — Sell medicines on MediStore
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
      </CardContent>

      <CardFooter className="px-0 pb-0 flex flex-col gap-4">
        <Button className="w-full" form="register-form" type="submit">
          Create Account
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            Login
          </button>
        </p>
      </CardFooter>
    </div>
  );
}