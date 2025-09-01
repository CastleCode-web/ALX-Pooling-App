"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
  Clock,
  Star
} from "lucide-react"

interface ActivityItem {
  id: string
  type: "vote" | "comment" | "poll_created"
  message: string
  time: string
}

interface TrendingPoll {
  id: string
  title: string
  votes: number
  trend: "up" | "down" | "stable"
}

export function PollOverview() {
  // TODO: Replace with real data from API
  const recentActivity: ActivityItem[] = [
    {
      id: "1",
      type: "vote",
      message: "Someone voted on your poll 'Favorite Programming Language'",
      time: "2 min ago"
    },
    {
      id: "2",
      type: "comment",
      message: "New comment on 'Best Meeting Time'",
      time: "15 min ago"
    },
    {
      id: "3",
      type: "poll_created",
      message: "Your poll 'Office Lunch Survey' was created",
      time: "1 hour ago"
    },
    {
      id: "4",
      type: "vote",
      message: "5 new votes on 'Framework Choice'",
      time: "2 hours ago"
    }
  ]

  const trendingPolls: TrendingPoll[] = [
    {
      id: "1",
      title: "Best Programming Language 2024",
      votes: 1547,
      trend: "up"
    },
    {
      id: "2",
      title: "Remote Work Preferences",
      votes: 892,
      trend: "up"
    },
    {
      id: "3",
      title: "Favorite Code Editor",
      votes: 654,
      trend: "stable"
    }
  ]

  const upcomingExpirations = [
    {
      id: "1",
      title: "Team Meeting Schedule",
      expiresIn: "2 days",
      votes: 23
    },
    {
      id: "2",
      title: "Project Framework Decision",
      expiresIn: "5 days",
      votes: 67
    }
  ]

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'vote':
        return <Users className="h-4 w-4 text-blue-600" />
      case 'comment':
        return <BarChart3 className="h-4 w-4 text-green-600" />
      case 'poll_created':
        return <Calendar className="h-4 w-4 text-purple-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendIcon = (trend: TrendingPoll['trend']) => {
    if (trend === 'up') {
      return <TrendingUp className="h-3 w-3 text-green-500" />
    }
    return <div className="w-3 h-3" />
  }

  return (
    <div className="space-y-6">
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No recent activity
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trending Polls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Star className="h-5 w-5" />
            Trending Polls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trendingPolls.map((poll, index) => (
              <div key={poll.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/polls/${poll.id}`}
                      className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1"
                    >
                      {poll.title}
                    </Link>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {poll.votes} votes
                      </span>
                      {getTrendIcon(poll.trend)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expiring Soon */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Expiring Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingExpirations.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No polls expiring soon
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingExpirations.map((poll) => (
                <div key={poll.id} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <Link
                    href={`/polls/${poll.id}`}
                    className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-1"
                  >
                    {poll.title}
                  </Link>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {poll.votes} votes
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {poll.expiresIn}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button asChild className="w-full justify-start" variant="outline">
            <Link href="/create-poll">
              <Calendar className="mr-2 h-4 w-4" />
              Create New Poll
            </Link>
          </Button>
          <Button asChild className="w-full justify-start" variant="outline">
            <Link href="/polls">
              <BarChart3 className="mr-2 h-4 w-4" />
              Browse All Polls
            </Link>
          </Button>
          <Button asChild className="w-full justify-start" variant="outline">
            <Link href="/analytics">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
