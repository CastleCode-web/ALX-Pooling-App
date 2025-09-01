"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  Vote,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: React.ReactNode
  description?: string
}

function StatsCard({ title, value, change, changeType = "neutral", icon, description }: StatsCardProps) {
  const changeColor = {
    positive: "text-green-600 dark:text-green-400",
    negative: "text-red-600 dark:text-red-400",
    neutral: "text-gray-600 dark:text-gray-400"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </CardTitle>
        <div className="text-gray-400">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </div>
        {change && (
          <div className={`text-xs flex items-center gap-1 ${changeColor[changeType]}`}>
            <TrendingUp className="h-3 w-3" />
            {change}
          </div>
        )}
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  // TODO: Replace with real data from API
  const stats = [
    {
      title: "Total Polls",
      value: 12,
      change: "+2 from last week",
      changeType: "positive" as const,
      icon: <BarChart3 className="h-4 w-4" />,
      description: "Polls you've created"
    },
    {
      title: "Total Votes",
      value: "2,847",
      change: "+15% from last month",
      changeType: "positive" as const,
      icon: <Vote className="h-4 w-4" />,
      description: "Votes across all your polls"
    },
    {
      title: "Active Polls",
      value: 8,
      change: "3 expiring soon",
      changeType: "neutral" as const,
      icon: <Clock className="h-4 w-4" />,
      description: "Currently accepting votes"
    },
    {
      title: "Engagement Rate",
      value: "67%",
      change: "+5% from last month",
      changeType: "positive" as const,
      icon: <Users className="h-4 w-4" />,
      description: "Average participation rate"
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          changeType={stat.changeType}
          icon={stat.icon}
          description={stat.description}
        />
      ))}
    </div>
  )
}
