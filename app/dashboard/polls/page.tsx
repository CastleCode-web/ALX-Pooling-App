import { PollsList } from "@/components/polls/polls-list"
import { PollsFilters } from "@/components/polls/polls-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Search } from "lucide-react"

export default function PollsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            All Polls
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Browse and participate in polls from the community
          </p>
        </div>
        <Link href="/create-poll">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Poll
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search polls..."
            className="pl-10"
          />
        </div>
        <PollsFilters />
      </div>

      <PollsList />
    </div>
  )
}
