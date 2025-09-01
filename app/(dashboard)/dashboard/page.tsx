import { PollOverview } from "@/components/polls/poll-overview"
import { RecentPolls } from "@/components/polls/recent-polls"
import { StatsCards } from "@/components/polls/stats-cards"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's an overview of your polling activity.
          </p>
        </div>
        <Link href="/create-poll">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Poll
          </Button>
        </Link>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentPolls />
        </div>
        <div>
          <PollOverview />
        </div>
      </div>
    </div>
  )
}
