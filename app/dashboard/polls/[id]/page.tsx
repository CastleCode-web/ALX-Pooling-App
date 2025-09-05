import { PollDetails } from "@/components/polls/poll-details"
import { PollComments } from "@/components/polls/poll-comments"
import { PollResults } from "@/components/polls/poll-results"
import { VotingPanel } from "@/components/polls/voting-panel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Share2, Flag, Bookmark } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PollPageProps {
  params: {
    id: string
  }
}

export default async function PollPage({ params }: PollPageProps) {
  // TODO: Fetch poll data based on params.id
  const pollId = params.id

  // Placeholder for poll data - replace with actual API call
  const poll = {
    id: pollId,
    title: "What's your favorite programming language?",
    description: "Help us understand the community's preference for programming languages in 2024.",
    author: "John Doe",
    createdAt: "2024-01-15",
    expiresAt: "2024-02-15",
    status: "active",
    category: "Technology",
    totalVotes: 1247,
    hasVoted: false,
    isOwner: false
  }

  // Handle poll not found
  if (!poll) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/polls">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Polls
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Flag className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Poll Header */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary">{poll.category}</Badge>
              <Badge
                variant={poll.status === 'active' ? 'default' : 'outline'}
              >
                {poll.status}
              </Badge>
            </div>
            <div className="text-sm text-gray-500">
              {poll.totalVotes} votes
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {poll.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {poll.description}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              Created by <span className="font-medium">{poll.author}</span> on {poll.createdAt}
            </div>
            <div>
              Expires on {poll.expiresAt}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Poll Details */}
          <PollDetails pollId={pollId} />

          {/* Voting Panel or Results */}
          {poll.hasVoted || poll.status !== 'active' ? (
            <PollResults pollId={pollId} />
          ) : (
            <VotingPanel pollId={pollId} />
          )}

          {/* Comments Section */}
          <PollComments pollId={pollId} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Poll Stats */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Poll Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Votes</span>
                <span className="font-medium">{poll.totalVotes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Created</span>
                <span className="font-medium">{poll.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Expires</span>
                <span className="font-medium">{poll.expiresAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge
                  variant={poll.status === 'active' ? 'default' : 'outline'}
                  className="text-xs"
                >
                  {poll.status}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Related Polls */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Related Polls</h3>
            <div className="space-y-3">
              {/* Placeholder for related polls */}
              <div className="text-sm text-gray-500">
                No related polls found
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
