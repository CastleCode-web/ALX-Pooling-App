"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Vote, Users, Clock, CheckCircle } from "lucide-react"

interface VotingPanelProps {
  pollId: string
}

interface PollOption {
  id: string
  text: string
  votes: number
  percentage: number
}

export function VotingPanel({ pollId }: VotingPanelProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)

  // TODO: Fetch poll data based on pollId
  const pollData = {
    id: pollId,
    title: "What's your favorite programming language?",
    allowMultiple: false,
    requireAuth: true,
    totalVotes: 700,
    options: [
      { id: "1", text: "JavaScript", votes: 245, percentage: 35 },
      { id: "2", text: "TypeScript", votes: 210, percentage: 30 },
      { id: "3", text: "Python", votes: 140, percentage: 20 },
      { id: "4", text: "Java", votes: 70, percentage: 10 },
      { id: "5", text: "Other", votes: 35, percentage: 5 }
    ] as PollOption[]
  }

  const handleSingleSelect = (value: string) => {
    setSelectedOptions([value])
  }

  const handleMultiSelect = (optionId: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions(prev => [...prev, optionId])
    } else {
      setSelectedOptions(prev => prev.filter(id => id !== optionId))
    }
  }

  const handleSubmitVote = async () => {
    if (selectedOptions.length === 0) {
      alert("Please select at least one option")
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Submit vote to API
      console.log("Submitting vote:", { pollId, selectedOptions })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      setHasVoted(true)
    } catch (error) {
      console.error("Error submitting vote:", error)
      alert("Failed to submit vote. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (hasVoted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <CheckCircle className="h-5 w-5" />
            Vote Submitted Successfully
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="text-green-600 dark:text-green-400 mb-4">
              <CheckCircle className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Thank you for voting!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your vote has been recorded. You can now see the live results below.
            </p>

            {/* Show current results */}
            <div className="space-y-3 text-left">
              <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="h-4 w-4" />
                Current Results ({pollData.totalVotes + 1} votes)
              </h4>

              {pollData.options.map((option) => {
                const isSelected = selectedOptions.includes(option.id)
                const newVotes = isSelected ? option.votes + 1 : option.votes
                const newTotal = pollData.totalVotes + 1
                const newPercentage = Math.round((newVotes / newTotal) * 100)

                return (
                  <div key={option.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${isSelected ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                        {option.text} {isSelected && '(Your vote)'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {newVotes} votes
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {newPercentage}%
                        </span>
                      </div>
                    </div>
                    <Progress
                      value={newPercentage}
                      className={`h-2 ${isSelected ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Vote className="h-5 w-5" />
          Cast Your Vote
        </CardTitle>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{pollData.totalVotes} votes so far</span>
          </div>
          {pollData.allowMultiple && (
            <Badge variant="secondary" className="text-xs">
              Multiple selection allowed
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          {pollData.allowMultiple ? (
            // Multiple selection with checkboxes
            <div className="space-y-3">
              {pollData.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <Checkbox
                    id={option.id}
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={(checked) =>
                      handleMultiSelect(option.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={option.id}
                    className="flex-1 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                  >
                    {option.text}
                  </Label>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {option.votes} votes
                  </span>
                </div>
              ))}
            </div>
          ) : (
            // Single selection with radio buttons
            <RadioGroup
              value={selectedOptions[0] || ""}
              onValueChange={handleSingleSelect}
              className="space-y-3"
            >
              {pollData.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label
                    htmlFor={option.id}
                    className="flex-1 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                  >
                    {option.text}
                  </Label>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {option.votes} votes
                  </span>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>

        {/* Voting Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Vote className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Voting Instructions
              </p>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>
                  • {pollData.allowMultiple
                      ? "You can select multiple options"
                      : "You can only select one option"
                  }
                </li>
                <li>• Your vote is anonymous and cannot be changed after submission</li>
                {pollData.requireAuth && (
                  <li>• You must be logged in to vote</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmitVote}
            disabled={selectedOptions.length === 0 || isSubmitting}
            className="min-w-32"
          >
            {isSubmitting ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Vote className="mr-2 h-4 w-4" />
                Submit Vote
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
