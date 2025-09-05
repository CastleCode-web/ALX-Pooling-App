import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Welcome back
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Sign in to your account
        </p>
      </div>
      <LoginForm />
    </div>
  )
}
