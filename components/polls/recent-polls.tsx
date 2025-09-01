"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  Clock,
  Users,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  BarChart3
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Poll {
  id: string
  title: string
  category: string
  status: "active" | "expired" | "draft"
  totalVotes: number
  createdAt: string
  expiresAt: string
  topOption: {
    text: string
    percentage: number
  }
}

interface RecentPollCardProps {
  poll: Poll
}

function RecentPollCard({ poll }: RecentPollCardProps) {
  const getStatusColor = (status: Poll['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
      case 'expired':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
    }
  }

  const getDaysRemaining = (expiresAt: string) => {
    const now = new Date()
    const expiry = new Date(expiresAt)
    const diffTime = expiry.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Expired"
    if (diffDays === 0) return "Expires today"
    if (diffDays === 1) return "1 day left"
    return `${diffDays} days left`
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <Link
              href={`/polls/${poll.id}`}
              className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2"
            >
              {poll.title}
            </Link>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {poll.category}
              </Badge>
              <Badge className={`text-xs ${getStatusColor(poll.status)}`}>
                {poll.status}
              </Badge>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/polls/${poll.id}`} className="flex items-center">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/polls/${poll.id}/analytics`} className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/polls/${poll.id}/edit`} className="flex items-center">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          {/* Vote count and timing */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{poll.totalVotes} votes</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{getDaysRemaining(poll.expiresAt)}</span>
            </div>
          </div>

          {/* Leading option */}
          {poll.totalVotes > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Leading: {poll.topOption.text}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {poll.topOption.percentage}%
                </span>
              </div>
              <Progress
                value={poll.topOption.percentage}
                className="h-2"
              />
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Link href={`/polls/${poll.id}`}>
                View Details
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
            >
              <Link href={`/polls/${poll.id}/analytics`}>
                <BarChart3 className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function RecentPolls() {
  // TODO: Replace with real data from API
  const recentPolls: Poll[] = [
    {
      id: "1",
      title: "What's your favorite programming language for web development?",
      category: "Technology",
      status: "active",
      totalVotes: 247,
      createdAt: "2024-01-10",
      expiresAt: "2024-02-10",
      topOption: {
        text: "TypeScript",
        percentage: 45
      }
    },
    {
      id: "2",
      title: "Best time for team meetings?",
      category: "Work",
      status: "active",
      totalVotes: 89,
      createdAt: "2024-01-12",
      expiresAt: "2024-01-25",
      topOption: {
        text: "10:00 AM",
        percentage: 32
      }
    },
    {
      id: "3",
      title: "Which framework should we use for the next project?",
      category: "Technology",
      status: "expired",
      totalVotes: 156,
      createdAt: "2024-01-05",
      expiresAt: "2024-01-15",
      topOption: {
        text: "Next.js",
        percentage: 52
      }
    },
    {
      id: "4",
      title: "Office lunch preference survey",
      category: "Food",
      status: "draft",
      totalVotes: 0,
      createdAt: "2024-01-14",
      expiresAt: "2024-01-30",
      topOption: {
        text: "No votes yet",
        percentage: 0
      }
    }
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Polls</CardTitle>
        <Button asChild variant="outline" size="sm">
          <Link href="/polls">View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPolls.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 dark:text-gray-600 mb-2">
              <BarChart3 className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You haven't created any polls yet
            </p>
            <Button asChild>
              <Link href="/create-poll">Create Your First Poll</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {recentPolls.map((poll) => (
              <RecentPollCard key={poll.id} poll={poll} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
