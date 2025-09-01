"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import {
  Clock,
  Users,
  MessageCircle,
  TrendingUp,
  Calendar,
  ChevronRight
} from "lucide-react"

interface Poll {
  id: string
  title: string
  description: string
  author: {
    name: string
    avatar?: string
  }
  category: string
  status: "active" | "expired" | "draft"
  totalVotes: number
  totalComments: number
  createdAt: string
  expiresAt: string
  topOption: {
    text: string
    percentage: number
  }
  participants: number
}

interface PollCardProps {
  poll: Poll
}

function PollCard({ poll }: PollCardProps) {
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

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date()
    const expiry = new Date(expiresAt)
    const diffTime = expiry.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Expired"
    if (diffDays === 0) return "Expires today"
    if (diffDays === 1) return "1 day left"
    return `${diffDays} days left`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Card className="hover:shadow-md transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-800">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="h-10 w-10">
                <AvatarImage src={poll.author.avatar} alt={poll.author.name} />
                <AvatarFallback>
                  {poll.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {poll.author.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(poll.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {poll.category}
              </Badge>
              <Badge className={`text-xs ${getStatusColor(poll.status)}`}>
                {poll.status}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <Link
              href={`/polls/${poll.id}`}
              className="block group"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                {poll.title}
              </h3>
              {poll.description && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                  {poll.description}
                </p>
              )}
            </Link>

            {/* Leading option */}
            {poll.totalVotes > 0 && (
              <div className="space-y-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                <div className="flex justify-between items-center text-sm">
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
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{poll.totalVotes} votes</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{poll.totalComments}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>{poll.participants} participants</span>
              </div>
            </div>

            {poll.status === 'active' && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{getTimeRemaining(poll.expiresAt)}</span>
              </div>
            )}
          </div>

          {/* Action */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <Button
              asChild
              variant="outline"
              className="w-full justify-between"
            >
              <Link href={`/polls/${poll.id}`}>
                <span>View Poll</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PollsList() {
  const [isLoading, setIsLoading] = useState(false)

  // TODO: Replace with real data from API
  const polls: Poll[] = [
    {
      id: "1",
      title: "What's your favorite programming language for web development in 2024?",
      description: "We're conducting a survey to understand the community's preferences for web development technologies. Your input helps us make better decisions for our tech stack.",
      author: {
        name: "Sarah Johnson",
        avatar: "/avatars/sarah.jpg"
      },
      category: "Technology",
      status: "active",
      totalVotes: 1247,
      totalComments: 23,
      participants: 892,
      createdAt: "2024-01-10",
      expiresAt: "2024-02-10",
      topOption: {
        text: "TypeScript",
        percentage: 45
      }
    },
    {
      id: "2",
      title: "Best time for our weekly team meetings?",
      description: "Let's find a time that works for everyone on the team. Please vote for your preferred meeting time.",
      author: {
        name: "Mike Chen",
        avatar: "/avatars/mike.jpg"
      },
      category: "Work",
      status: "active",
      totalVotes: 89,
      totalComments: 12,
      participants: 45,
      createdAt: "2024-01-12",
      expiresAt: "2024-01-25",
      topOption: {
        text: "10:00 AM EST",
        percentage: 32
      }
    },
    {
      id: "3",
      title: "Which framework should we adopt for our next major project?",
      description: "We're planning our next big project and need to decide on the tech stack. This decision will impact our development for the next 2-3 years.",
      author: {
        name: "Alex Rodriguez",
        avatar: "/avatars/alex.jpg"
      },
      category: "Technology",
      status: "expired",
      totalVotes: 156,
      totalComments: 34,
      participants: 98,
      createdAt: "2024-01-05",
      expiresAt: "2024-01-15",
      topOption: {
        text: "Next.js",
        percentage: 52
      }
    },
    {
      id: "4",
      title: "What should we order for the office lunch party?",
      description: "Planning our monthly office lunch party. Vote for your preferred cuisine!",
      author: {
        name: "Emma Wilson",
        avatar: "/avatars/emma.jpg"
      },
      category: "Food",
      status: "active",
      totalVotes: 67,
      totalComments: 8,
      participants: 34,
      createdAt: "2024-01-14",
      expiresAt: "2024-01-30",
      topOption: {
        text: "Italian",
        percentage: 38
      }
    },
    {
      id: "5",
      title: "How satisfied are you with our current remote work policy?",
      description: "We want to hear your thoughts on our remote work arrangements and see if any adjustments are needed.",
      author: {
        name: "David Park",
        avatar: "/avatars/david.jpg"
      },
      category: "Work",
      status: "active",
      totalVotes: 234,
      totalComments: 45,
      participants: 156,
      createdAt: "2024-01-08",
      expiresAt: "2024-02-08",
      topOption: {
        text: "Very Satisfied",
        percentage: 41
      }
    },
    {
      id: "6",
      title: "Which design system should we implement?",
      description: "Our design team is evaluating different design systems. Your input as developers is crucial for this decision.",
      author: {
        name: "Lisa Zhang",
        avatar: "/avatars/lisa.jpg"
      },
      category: "Design",
      status: "active",
      totalVotes: 92,
      totalComments: 18,
      participants: 67,
      createdAt: "2024-01-11",
      expiresAt: "2024-01-28",
      topOption: {
        text: "Material Design",
        percentage: 35
      }
    }
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                </div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {polls.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-600 mb-4">
            <Calendar className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No polls found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            No polls match your current filters. Try adjusting your search or create a new poll.
          </p>
          <Button asChild>
            <Link href="/create-poll">Create Your First Poll</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      )}

      {/* Load More */}
      {polls.length > 0 && (
        <div className="text-center pt-8">
          <Button
            variant="outline"
            onClick={() => {
              setIsLoading(true)
              // TODO: Load more polls
              setTimeout(() => setIsLoading(false), 1000)
            }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More Polls"}
          </Button>
        </div>
      )}
    </div>
  )
}
