// import { LoginForm } from "@/components/module/authentication/login";

import { AuthSlider } from "@/components/module/authentication/AuthSlider";


// export default function LoginPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <LoginForm/>
//     </div>
//   )


/**
 * /app/(auth)/login/page.tsx  (or /app/login/page.tsx)
 *
 * Single page that hosts the full sliding auth experience.
 * Both Login and Register are rendered inside AuthSlider.
 */
export default function LoginPage() {
  return <AuthSlider />;
}