import { CreatePollForm } from "@/components/polls/create-poll-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreatePollPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Page Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create a New Poll
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create engaging polls to gather opinions and insights from the community
        </p>
      </div>

      {/* Form Card */}
      <Card className="p-6">
        <CreatePollForm />
      </Card>

      {/* Help Section */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Tips for Creating Great Polls
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Keep your question clear and concise</li>
          <li>• Provide balanced and comprehensive answer options</li>
          <li>• Set an appropriate expiration date</li>
          <li>• Add a detailed description to provide context</li>
          <li>• Choose the right category to help others find your poll</li>
        </ul>
      </Card>
    </div>
  )
}
