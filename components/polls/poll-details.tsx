"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Users, Clock, Tag } from "lucide-react"

interface PollDetailsProps {
  pollId: string
}

export function PollDetails({ pollId }: PollDetailsProps) {
  // TODO: Fetch poll details based on pollId
  const pollDetails = {
    id: pollId,
    title: "What's your favorite programming language?",
    description: "We're conducting a survey to understand the community's preferences for programming languages in web development. This will help us make informed decisions about our technology stack for upcoming projects.",
    author: {
      name: "John Doe",
      avatar: "/avatars/john.jpg"
    },
    category: "Technology",
    status: "active",
    createdAt: "2024-01-15",
    expiresAt: "2024-02-15",
    tags: ["programming", "web-development", "technology"],
    options: [
      { id: "1", text: "JavaScript", votes: 245, percentage: 35 },
      { id: "2", text: "TypeScript", votes: 210, percentage: 30 },
      { id: "3", text: "Python", votes: 140, percentage: 20 },
      { id: "4", text: "Java", votes: 70, percentage: 10 },
      { id: "5", text: "Other", votes: 35, percentage: 5 }
    ],
    totalVotes: 700
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Poll Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Poll Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={pollDetails.author.avatar} alt={pollDetails.author.name} />
              <AvatarFallback>
                {pollDetails.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {pollDetails.author.name}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>Created on {pollDetails.createdAt}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              {pollDetails.description}
            </p>

            {pollDetails.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {pollDetails.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Poll Options */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="h-4 w-4" />
            Current Results ({pollDetails.totalVotes} votes)
          </h4>

          <div className="space-y-3">
            {pollDetails.options.map((option) => (
              <div key={option.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {option.text}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {option.votes} votes
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {option.percentage}%
                    </span>
                  </div>
                </div>
                <Progress value={option.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Poll Status */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Expires on {pollDetails.expiresAt}
              </span>
            </div>
            <Badge
              className={pollDetails.status === 'active' ?
                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
              }
            >
              {pollDetails.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
