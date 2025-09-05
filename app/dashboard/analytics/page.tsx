import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MessageCircle,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from "lucide-react"

export default function AnalyticsPage() {
  // Mock data - replace with real API calls
  const overviewStats = {
    totalPolls: 24,
    totalVotes: 3847,
    totalViews: 12543,
    avgEngagement: 68.4,
    changeFromLastMonth: {
      polls: +15.3,
      votes: +23.1,
      views: +8.7,
      engagement: +5.2
    }
  }

  const topPerformingPolls = [
    {
      id: "1",
      title: "What's your favorite programming language?",
      votes: 1247,
      views: 3421,
      engagementRate: 36.4,
      createdAt: "2024-01-10"
    },
    {
      id: "2",
      title: "Best framework for web development?",
      votes: 892,
      views: 2156,
      engagementRate: 41.4,
      createdAt: "2024-01-12"
    },
    {
      id: "3",
      title: "Remote work preferences",
      votes: 654,
      views: 1876,
      engagementRate: 34.9,
      createdAt: "2024-01-15"
    },
    {
      id: "4",
      title: "Office lunch preferences",
      votes: 423,
      views: 987,
      engagementRate: 42.9,
      createdAt: "2024-01-18"
    }
  ]

  const categoryPerformance = [
    { category: "Technology", polls: 8, votes: 2156, avgEngagement: 45.2 },
    { category: "Work", polls: 6, votes: 1234, avgEngagement: 38.7 },
    { category: "Food", polls: 4, votes: 567, avgEngagement: 33.1 },
    { category: "Entertainment", polls: 3, votes: 456, avgEngagement: 29.8 },
    { category: "Sports", polls: 2, votes: 234, avgEngagement: 41.3 },
    { category: "Other", polls: 1, votes: 200, avgEngagement: 35.0 }
  ]

  const timeSeriesData = [
    { date: "Jan 1", votes: 120, views: 456 },
    { date: "Jan 8", votes: 180, views: 623 },
    { date: "Jan 15", votes: 245, views: 789 },
    { date: "Jan 22", votes: 320, votes: 912 },
    { date: "Jan 29", votes: 400, views: 1123 }
  ]

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600 dark:text-green-400"
    if (change < 0) return "text-red-600 dark:text-red-400"
    return "text-gray-600 dark:text-gray-400"
  }

  const getChangeIcon = (change: number) => {
    return change > 0 ? "↗" : change < 0 ? "↘" : "→"
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your polling performance and engagement metrics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue="30">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Polls
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewStats.totalPolls}</div>
            <div className={`text-xs flex items-center ${getChangeColor(overviewStats.changeFromLastMonth.polls)}`}>
              {getChangeIcon(overviewStats.changeFromLastMonth.polls)}
              {Math.abs(overviewStats.changeFromLastMonth.polls)}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Votes
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewStats.totalVotes.toLocaleString()}</div>
            <div className={`text-xs flex items-center ${getChangeColor(overviewStats.changeFromLastMonth.votes)}`}>
              {getChangeIcon(overviewStats.changeFromLastMonth.votes)}
              {Math.abs(overviewStats.changeFromLastMonth.votes)}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Views
            </CardTitle>
            <Eye className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewStats.totalViews.toLocaleString()}</div>
            <div className={`text-xs flex items-center ${getChangeColor(overviewStats.changeFromLastMonth.views)}`}>
              {getChangeIcon(overviewStats.changeFromLastMonth.views)}
              {Math.abs(overviewStats.changeFromLastMonth.views)}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Avg Engagement
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewStats.avgEngagement}%</div>
            <div className={`text-xs flex items-center ${getChangeColor(overviewStats.changeFromLastMonth.engagement)}`}>
              {getChangeIcon(overviewStats.changeFromLastMonth.engagement)}
              {Math.abs(overviewStats.changeFromLastMonth.engagement)}% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* Top Performing Polls */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Polls</CardTitle>
              <CardDescription>
                Your most engaging polls based on votes and engagement rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {topPerformingPolls.map((poll, index) => (
                  <div key={poll.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                          {poll.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Created on {new Date(poll.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 text-center">
                      <div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {poll.votes}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Votes</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {poll.views}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Views</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                          {poll.engagementRate}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Engagement</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance by Category</CardTitle>
              <CardDescription>
                See how different poll categories are performing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryPerformance.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{category.category}</Badge>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {category.polls} polls
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <span className="text-gray-900 dark:text-white font-medium">
                          {category.votes} votes
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {category.avgEngagement}%
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={category.avgEngagement}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Engagement Trends */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Voting Trends</CardTitle>
                <CardDescription>
                  Weekly voting activity over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeSeriesData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {data.date}
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(data.votes / 400) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                          {data.votes}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Insights</CardTitle>
                <CardDescription>
                  Key metrics and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                        Strong Performance
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        Technology polls have 45% higher engagement
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        Peak Activity
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        Most votes received between 2-4 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    <div>
                      <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                        Improvement Opportunity
                      </p>
                      <p className="text-xs text-orange-700 dark:text-orange-300">
                        Consider adding more detailed descriptions
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
