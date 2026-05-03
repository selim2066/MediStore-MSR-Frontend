// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { authClient } from "@/lib/auth-client";
// import { useForm } from "@tanstack/react-form";
// import { Eye, EyeOff } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";
// import { z } from "zod";

// const formSchema = z.object({
//   email: z.email("Invalid email address"),
//   password: z.string().min(8, "Minimum 8 characters required"),
// });

// interface LoginFormProps {
//   /** Called when user clicks "Register" link — handled by AuthSlider */
//   onSwitchToRegister?: () => void;
// }

// export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);

//   // ── Business logic: untouched ──────────────────────────────────────────────
//   const form = useForm({
//     defaultValues: { email: "", password: "" },
//     validators: { onSubmit: formSchema },
//     onSubmit: async ({ value }) => {
//       const toastId = toast.loading("Logging in...");
//       try {
//         const { data, error } = await authClient.signIn.email(value);
//         if (error) {
//           toast.error(error.message, { id: toastId });
//           return;
//         }
//         toast.success("Logged in successfully!", { id: toastId });
//         const role = data?.user?.role;
//         if (role === "SELLER") router.push("/seller/dashboard");
//         else if (role === "ADMIN") router.push("/admin");
//         else router.push("/");
//       } catch (_) {
//         toast.error("Failed to login. Please try again.", { id: toastId });
//       }
//     },
//   });
//   // ── End business logic ─────────────────────────────────────────────────────

//   return (
//     <div className="flex flex-col h-full">
//       <CardHeader className="px-0 pt-0">
//         <CardTitle className="text-xl font-medium">Welcome back</CardTitle>
//         <CardDescription>
//           Enter your credentials to access your account
//         </CardDescription>
//       </CardHeader>

//       <CardContent className="px-0 flex-1">
//         {/* Hidden real form element for submit binding */}
//         <form
//           id="login-form"
//           onSubmit={(e) => {
//             e.preventDefault();
//             form.handleSubmit();
//           }}
//         />

//         <FieldGroup>
//           {/* Email */}
//           <form.Field name="email">
//             {(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;
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
//                   {isInvalid && (
//                     <FieldError errors={field.state.meta.errors} />
//                   )}
//                 </Field>
//               );
//             }}
//           </form.Field>

//           {/* Password */}
//           <form.Field name="password">
//             {(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;
//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>Password</FieldLabel>
//                   <div className="relative">
//                     <Input
//                       id={field.name}
//                       name={field.name}
//                       value={field.state.value}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                       className="pr-10"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((p) => !p)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="w-4 h-4" />
//                       ) : (
//                         <Eye className="w-4 h-4" />
//                       )}
//                     </button>
//                   </div>
//                   {isInvalid && (
//                     <FieldError errors={field.state.meta.errors} />
//                   )}
//                 </Field>
//               );
//             }}
//           </form.Field>
//         </FieldGroup>
//       </CardContent>

//       <CardFooter className="px-0 pb-0 flex flex-col gap-4">
//         <Button className="w-full" form="login-form" type="submit">
//           Login
//         </Button>
//         <p className="text-sm text-center text-muted-foreground">
//           Don&apos;t have an account?{" "}
//           <button
//             type="button"
//             onClick={onSwitchToRegister}
//             className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
//           >
//             Register
//           </button>
//         </p>
//       </CardFooter>
//     </div>
//   );
// }

// !update 001 stn:
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
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Minimum 8 characters required"),
});

// ── Demo credentials ──────────────────────────────────────────────────────────
const DEMO_ACCOUNTS = [
  {
    label: "User",
    email: "user@medistore.com",
    password: "user1234",
    role: "CUSTOMER",
  },
  {
    label: "Admin",
    email: "admin@medistore.com",
    password: "admin1234",
    role: "ADMIN",
  },
] as const;

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | null>(null);

  // ── Business logic: untouched ─────────────────────────────────────────────
  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Logged in successfully!", { id: toastId });
        const role = data?.user?.role;
        if (role === "SELLER") router.push("/seller/dashboard");
        else if (role === "ADMIN") router.push("/admin");
        else router.push("/");
      } catch (_) {
        toast.error("Failed to login. Please try again.", { id: toastId });
      }
    },
  });
  // ── End business logic ────────────────────────────────────────────────────

  // ── Demo autofill ─────────────────────────────────────────────────────────
  const fillDemo = (email: string, password: string) => {
    form.setFieldValue("email", email);
    form.setFieldValue("password", password);
    toast.info("Demo credentials filled — click Login to continue.");
  };

  // ── Google social login ───────────────────────────────────────────────────
  const handleGoogle = async () => {
    setSocialLoading("google");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL:
          process.env.NEXT_PUBLIC_FRONTEND_URL ??
          "https://medi-store-msr-frontend.vercel.app",
      });
    } catch {
      toast.error("Google sign-in failed. Please try again.");
      setSocialLoading(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-medium">Welcome back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0 flex-1 space-y-5">
        {/* ── Demo login buttons ── */}
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
            Quick Demo Access
          </p>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.role}
                type="button"
                onClick={() => fillDemo(acc.email, acc.password)}
                className="
                  group relative flex items-center gap-2 px-3 py-2.5 rounded-xl
                  border border-black/[0.08] dark:border-white/[0.08]
                  bg-white/60 dark:bg-white/[0.03]
                  hover:border-emerald-400/50 dark:hover:border-emerald-600/40
                  hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20
                  transition-all duration-200 text-left overflow-hidden
                "
              >
                {/* Shimmer */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none" />
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-none">
                    {acc.label}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                    {acc.email}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200 dark:bg-white/[0.08]" />
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            or continue with email
          </span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-white/[0.08]" />
        </div>

        {/* Hidden real form element for submit binding */}
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        />

        <FieldGroup>
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                      placeholder="Enter your password"
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
      </CardContent>

      <CardFooter className="px-0 pb-0 flex flex-col gap-3">
        {/* Submit */}
        <Button className="w-full" form="login-form" type="submit">
          Login
        </Button>

        {/* Google social login */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={!!socialLoading}
          className="
            w-full flex items-center justify-center gap-3
            px-4 py-2.5 rounded-xl
            border border-black/[0.08] dark:border-white/[0.09]
            bg-white dark:bg-white/[0.03]
            hover:bg-slate-50 dark:hover:bg-white/[0.06]
            hover:border-slate-300 dark:hover:border-white/[0.15]
            text-sm font-semibold text-slate-700 dark:text-slate-200
            transition-all duration-200
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {socialLoading === "google" ? (
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          ) : (
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          )}
          <span>
            {socialLoading === "google"
              ? "Connecting..."
              : "Continue with Google"}
          </span>
        </button>

        <p className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            Register
          </button>
        </p>
      </CardFooter>
    </div>
  );
}
