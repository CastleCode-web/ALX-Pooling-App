import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Join ALX Polly to start creating and participating in polls
        </p>
      </div>
      <RegisterForm />
    </div>
  )
}
