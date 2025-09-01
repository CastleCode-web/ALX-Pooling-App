// User types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  isVerified?: boolean
  createdAt: string
  updatedAt: string
}

// Poll types
export interface PollOption {
  id: string
  text: string
  votes: number
  percentage: number
}

export interface Poll {
  id: string
  title: string
  description?: string
  author: User
  category: string
  status: 'active' | 'expired' | 'draft'
  totalVotes: number
  totalComments: number
  participants: number
  createdAt: string
  updatedAt: string
  expiresAt?: string
  options: PollOption[]
  settings: PollSettings
  tags?: string[]
}

export interface PollSettings {
  allowMultiple: boolean
  allowAnonymous: boolean
  requireAuth: boolean
  isPublic: boolean
}

export interface CreatePollData {
  title: string
  description?: string
  category: string
  expiresAt?: string
  options: Array<{ text: string }>
  settings: PollSettings
  tags?: string[]
}

export interface UpdatePollData extends Partial<CreatePollData> {
  id: string
}

// Vote types
export interface Vote {
  id: string
  pollId: string
  userId: string
  optionIds: string[]
  createdAt: string
  isAnonymous: boolean
}

export interface VoteSubmission {
  pollId: string
  optionIds: string[]
  isAnonymous?: boolean
}

// Comment types
export interface Comment {
  id: string
  pollId: string
  author: User
  content: string
  createdAt: string
  updatedAt: string
  likes: number
  replies: Comment[]
  parentId?: string
  isLiked: boolean
}

export interface CreateCommentData {
  pollId: string
  content: string
  parentId?: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

// Filter and search types
export interface PollFilters {
  categories?: string[]
  status?: ('active' | 'expired' | 'draft')[]
  sortBy?: 'newest' | 'oldest' | 'most_votes' | 'trending' | 'expiring_soon'
  timeRange?: 'all' | 'today' | 'week' | 'month' | 'quarter'
  authorId?: string
  search?: string
}

export interface SearchParams {
  query?: string
  page?: number
  limit?: number
  filters?: PollFilters
}

// Analytics types
export interface PollAnalytics {
  pollId: string
  totalViews: number
  totalVotes: number
  totalComments: number
  engagementRate: number
  voteDistribution: VoteDistribution[]
  demographicData: DemographicData
  timeSeriesData: TimeSeriesData[]
}

export interface VoteDistribution {
  optionId: string
  optionText: string
  votes: number
  percentage: number
}

export interface DemographicData {
  ageGroups: Array<{ range: string; count: number }>
  locations: Array<{ country: string; count: number }>
  devices: Array<{ type: string; count: number }>
}

export interface TimeSeriesData {
  timestamp: string
  votes: number
  views: number
  comments: number
}

// Auth types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthUser extends User {
  accessToken: string
  refreshToken: string
}

// Error types
export interface ApiError {
  message: string
  code: string
  statusCode: number
  details?: Record<string, any>
}

export interface ValidationError {
  field: string
  message: string
}

// UI State types
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface PaginationState {
  page: number
  limit: number
  total: number
}

// Notification types
export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
  isRead: boolean
}

// Dashboard types
export interface DashboardStats {
  totalPolls: number
  totalVotes: number
  activePolls: number
  engagementRate: number
  recentActivity: ActivityItem[]
  trendingPolls: TrendingPoll[]
  upcomingExpirations: ExpiringPoll[]
}

export interface ActivityItem {
  id: string
  type: 'vote' | 'comment' | 'poll_created' | 'poll_expired'
  message: string
  timestamp: string
  pollId?: string
  userId?: string
}

export interface TrendingPoll {
  id: string
  title: string
  votes: number
  trend: 'up' | 'down' | 'stable'
  changePercentage: number
}

export interface ExpiringPoll {
  id: string
  title: string
  expiresAt: string
  votes: number
  daysRemaining: number
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date'
  placeholder?: string
  required?: boolean
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (value: any) => string | null
  }
  options?: Array<{ value: string; label: string }>
}

export interface FormState<T = Record<string, any>> {
  data: T
  errors: Record<string, string>
  isSubmitting: boolean
  isDirty: boolean
}

// Theme and preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  notifications: {
    email: boolean
    push: boolean
    comments: boolean
    votes: boolean
    pollExpiry: boolean
  }
  privacy: {
    showProfile: boolean
    showVoteHistory: boolean
    allowAnalytics: boolean
  }
}

// Route types
export interface RouteParams {
  id?: string
  slug?: string
}

export interface SearchPageProps {
  searchParams: {
    q?: string
    page?: string
    category?: string
    status?: string
    sort?: string
  }
}
