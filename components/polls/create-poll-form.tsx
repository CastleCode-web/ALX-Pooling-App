"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Calendar, Users, Tag } from "lucide-react"
import { useRouter } from "next/navigation"

interface PollOption {
  id: string
  text: string
}

export function CreatePollForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    expiresAt: "",
    allowMultiple: false,
    allowAnonymous: true,
    requireAuth: false
  })

  const [options, setOptions] = useState<PollOption[]>([
    { id: "1", text: "" },
    { id: "2", text: "" }
  ])

  const categories = [
    "Technology",
    "Politics",
    "Entertainment",
    "Sports",
    "Education",
    "Health",
    "Business",
    "Science",
    "Travel",
    "Food",
    "Other"
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addOption = () => {
    const newId = (Math.max(...options.map(o => parseInt(o.id))) + 1).toString()
    setOptions(prev => [...prev, { id: newId, text: "" }])
  }

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(prev => prev.filter(option => option.id !== id))
    }
  }

  const updateOption = (id: string, text: string) => {
    setOptions(prev =>
      prev.map(option =>
        option.id === id ? { ...option, text } : option
      )
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate form
    if (!formData.title.trim()) {
      alert("Please enter a poll title")
      setIsLoading(false)
      return
    }

    if (!formData.category) {
      alert("Please select a category")
      setIsLoading(false)
      return
    }

    const validOptions = options.filter(option => option.text.trim())
    if (validOptions.length < 2) {
      alert("Please provide at least 2 options")
      setIsLoading(false)
      return
    }

    // TODO: Implement poll creation API call
    try {
      const pollData = {
        ...formData,
        options: validOptions
      }
      console.log("Creating poll:", pollData)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Redirect to polls page or the newly created poll
      router.push("/polls")
    } catch (error) {
      console.error("Error creating poll:", error)
      alert("Failed to create poll. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-lg font-medium flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Poll Title *
          </Label>
          <Input
            id="title"
            placeholder="What's your question?"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="text-lg"
            maxLength={200}
            required
          />
          <p className="text-sm text-gray-500">
            {formData.title.length}/200 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-base font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Provide more context for your poll (optional)"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4}
            maxLength={1000}
          />
          <p className="text-sm text-gray-500">
            {formData.description.length}/1000 characters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-base font-medium">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiresAt" className="text-base font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Expires At
            </Label>
            <Input
              id="expiresAt"
              type="datetime-local"
              value={formData.expiresAt}
              onChange={(e) => handleInputChange("expiresAt", e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
        </div>
      </div>

      {/* Poll Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Poll Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {options.map((option, index) => (
            <div key={option.id} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <Input
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => updateOption(option.id, e.target.value)}
                maxLength={100}
              />
              {options.length > 2 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeOption(option.id)}
                  className="flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addOption}
            className="w-full flex items-center gap-2"
            disabled={options.length >= 10}
          >
            <Plus className="h-4 w-4" />
            Add Option {options.length < 10 && `(${options.length}/10)`}
          </Button>
        </CardContent>
      </Card>

      {/* Poll Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Poll Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Multiple Selection</Label>
              <p className="text-sm text-gray-500">Allow users to select multiple options</p>
            </div>
            <input
              type="checkbox"
              checked={formData.allowMultiple}
              onChange={(e) => handleInputChange("allowMultiple", e.target.checked)}
              className="rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Anonymous Voting</Label>
              <p className="text-sm text-gray-500">Hide voter identities in results</p>
            </div>
            <input
              type="checkbox"
              checked={formData.allowAnonymous}
              onChange={(e) => handleInputChange("allowAnonymous", e.target.checked)}
              className="rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Require Authentication</Label>
              <p className="text-sm text-gray-500">Only logged-in users can vote</p>
            </div>
            <input
              type="checkbox"
              checked={formData.requireAuth}
              onChange={(e) => handleInputChange("requireAuth", e.target.checked)}
              className="rounded"
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="min-w-[120px]"
        >
          {isLoading ? "Creating..." : "Create Poll"}
        </Button>
      </div>
    </form>
  )
}
