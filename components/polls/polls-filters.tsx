"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter, X, Calendar, Tag, Users, BarChart3 } from "lucide-react"

interface FilterState {
  categories: string[]
  status: string[]
  sortBy: string
  timeRange: string
}

export function PollsFilters() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    status: [],
    sortBy: "newest",
    timeRange: "all"
  })

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
    "Work",
    "Design",
    "Other"
  ]

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "expired", label: "Expired" },
    { value: "draft", label: "Draft" }
  ]

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "most_votes", label: "Most Votes" },
    { value: "trending", label: "Trending" },
    { value: "expiring_soon", label: "Expiring Soon" }
  ]

  const timeRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "This Quarter" }
  ]

  const handleCategoryToggle = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  const handleStatusToggle = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }))
  }

  const handleSortChange = (value: string) => {
    setFilters(prev => ({ ...prev, sortBy: value }))
  }

  const handleTimeRangeChange = (value: string) => {
    setFilters(prev => ({ ...prev, timeRange: value }))
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      status: [],
      sortBy: "newest",
      timeRange: "all"
    })
  }

  const hasActiveFilters = filters.categories.length > 0 ||
                          filters.status.length > 0 ||
                          filters.sortBy !== "newest" ||
                          filters.timeRange !== "all"

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Categories Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="relative">
            <Tag className="mr-2 h-4 w-4" />
            Categories
            {filters.categories.length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                {filters.categories.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-60 overflow-y-auto">
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="relative">
            <BarChart3 className="mr-2 h-4 w-4" />
            Status
            {filters.status.length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                {filters.status.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="start">
          <DropdownMenuLabel>Poll Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {statusOptions.map((status) => (
            <DropdownMenuCheckboxItem
              key={status.value}
              checked={filters.status.includes(status.value)}
              onCheckedChange={() => handleStatusToggle(status.value)}
            >
              {status.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort By */}
      <Select value={filters.sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-48">
          <Users className="mr-2 h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Time Range */}
      <Select value={filters.timeRange} onValueChange={handleTimeRangeChange}>
        <SelectTrigger className="w-40">
          <Calendar className="mr-2 h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {timeRangeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="mr-1 h-4 w-4" />
          Clear
        </Button>
      )}

      {/* Active Filter Badges */}
      {filters.categories.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {filters.categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="text-xs cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}

      {filters.status.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {filters.status.map((status) => (
            <Badge
              key={status}
              variant="outline"
              className="text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => handleStatusToggle(status)}
            >
              {statusOptions.find(s => s.value === status)?.label}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
