"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, Download, Share2, TrendingUp } from "lucide-react"

interface PollResultsProps {
  pollId: string
}

interface PollOption {
  id: string
  text: string
  votes: number
  percentage: number
}

interface VoteDistribution {
  hour: string
  votes: number
}

export function PollResults({ pollId }: PollResultsProps) {
  // TODO: Fetch poll results based on pollId
  const pollResults = {
    id: pollId,
    title: "What's your favorite programming language?",
    totalVotes: 700,
    status: "active",
    options: [
      { id: "1", text: "JavaScript", votes: 245, percentage: 35 },
      { id: "2", text: "TypeScript", votes: 210, percentage: 30 },
      { id: "3", text: "Python", votes: 140, percentage: 20 },
      { id: "4", text: "Java", votes: 70, percentage: 10 },
      { id: "5", text: "Other", votes: 35, percentage: 5 }
    ] as PollOption[],
    voteDistribution: [
      { hour: "00:00", votes: 12 },
      { hour: "06:00", votes: 45 },
      { hour: "12:00", votes: 89 },
      { hour: "18:00", votes: 156 },
      { hour: "24:00", votes: 87 }
    ] as VoteDistribution[]
  }

  const sortedOptions = [...pollResults.options].sort((a, b) => b.votes - a.votes)
  const winningOption = sortedOptions[0]

  const exportResults = () => {
    // TODO: Implement export functionality
    console.log("Exporting results for poll:", pollId)
  }

  const shareResults = () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: pollResults.title,
        text: `Check out these poll results: ${winningOption.text} is leading with ${winningOption.percentage}%`,
        url: window.location.href,
      })
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="space-y-6">
      {/* Results Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Poll Results
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={exportResults}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={shareResults}>
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{pollResults.totalVotes} total votes</span>
            </div>
            <Badge
              variant={pollResults.status === 'active' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {pollResults.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Winning Option Highlight */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  Leading Option
                </h3>
                <p className="text-blue-800 dark:text-blue-200">
                  <span className="font-medium">{winningOption.text}</span> with{" "}
                  <span className="font-bold">{winningOption.votes} votes</span> ({winningOption.percentage}%)
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Detailed Breakdown
            </h4>

            <div className="space-y-4">
              {sortedOptions.map((option, index) => {
                const isWinning = index === 0
                return (
                  <div
                    key={option.id}
                    className={`p-4 rounded-lg border transition-all ${
                      isWinning
                        ? "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10"
                        : "border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isWinning
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {option.text}
                        </span>
                        {isWinning && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 text-xs">
                            Winner
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900 dark:text-white">
                          {option.percentage}%
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {option.votes} votes
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Progress
                        value={option.percentage}
                        className={`h-3 ${
                          isWinning
                            ? "bg-blue-100 dark:bg-blue-900"
                            : ""
                        }`}
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Statistics Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {pollResults.totalVotes}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Votes
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {pollResults.options.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Options
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {winningOption.percentage}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Leading
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(pollResults.totalVotes / pollResults.options.length)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg per Option
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vote Distribution Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Vote Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pollResults.voteDistribution.map((distribution, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-16 text-sm text-gray-600 dark:text-gray-400">
                  {distribution.hour}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(distribution.votes / Math.max(...pollResults.voteDistribution.map(d => d.votes))) * 100}
                      className="flex-1 h-4"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                      {distribution.votes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
