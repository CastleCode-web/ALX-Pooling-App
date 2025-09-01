"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MessageCircle, Send, MoreHorizontal, Flag, Trash2, Edit, Heart, Reply } from "lucide-react"

interface Comment {
  id: string
  author: {
    name: string
    avatar?: string
    isVerified?: boolean
  }
  content: string
  createdAt: string
  likes: number
  replies: Comment[]
  isLiked: boolean
}

interface PollCommentsProps {
  pollId: string
}

function CommentItem({ comment, depth = 0, onReply }: { comment: Comment; depth?: number; onReply: (commentId: string) => void }) {
  const [isLiked, setIsLiked] = useState(comment.isLiked)
  const [likes, setLikes] = useState(comment.likes)
  const [showReplies, setShowReplies] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
    // TODO: Update like status via API
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const maxDepth = 3

  return (
    <div className={`${depth > 0 ? 'ml-8 mt-4' : ''}`}>
      <div className="flex gap-3">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback className="text-xs">
            {comment.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-gray-900 dark:text-white">
                  {comment.author.name}
                </span>
                {comment.author.isVerified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                )}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(comment.createdAt)}
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Reply className="mr-2 h-4 w-4" />
                    Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Flag className="mr-2 h-4 w-4" />
                    Report
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 dark:text-red-400">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {comment.content}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 px-2 text-xs ${
                isLiked
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              onClick={handleLike}
            >
              <Heart className={`h-3 w-3 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              {likes}
            </Button>

            {depth < maxDepth && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-gray-500 dark:text-gray-400"
                onClick={() => onReply(comment.id)}
              >
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </Button>
            )}

            {comment.replies.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs text-gray-500 dark:text-gray-400"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </Button>
            )}
          </div>

          {showReplies && comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReply={onReply}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function PollComments({ pollId }: PollCommentsProps) {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  // TODO: Fetch comments based on pollId
  const comments: Comment[] = [
    {
      id: "1",
      author: {
        name: "Sarah Johnson",
        avatar: "/avatars/sarah.jpg",
        isVerified: true
      },
      content: "Great poll! I'm surprised to see TypeScript leading. I thought JavaScript would be more popular given its widespread adoption.",
      createdAt: "2024-01-15T10:30:00Z",
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: "1-1",
          author: {
            name: "Mike Chen",
            avatar: "/avatars/mike.jpg"
          },
          content: "TypeScript has really grown in popularity lately. The type safety it provides is invaluable for larger projects.",
          createdAt: "2024-01-15T11:15:00Z",
          likes: 8,
          isLiked: true,
          replies: []
        }
      ]
    },
    {
      id: "2",
      author: {
        name: "Alex Rodriguez",
        avatar: "/avatars/alex.jpg"
      },
      content: "Python is still my go-to for rapid prototyping and data analysis. While it may not be the best for web frontend, it's incredibly versatile.",
      createdAt: "2024-01-15T09:45:00Z",
      likes: 6,
      isLiked: false,
      replies: []
    },
    {
      id: "3",
      author: {
        name: "Emma Wilson",
        avatar: "/avatars/emma.jpg"
      },
      content: "I voted for JavaScript because of its ecosystem and community. There's a solution for almost everything, and the learning curve is relatively gentle for beginners.",
      createdAt: "2024-01-15T08:20:00Z",
      likes: 15,
      isLiked: true,
      replies: [
        {
          id: "3-1",
          author: {
            name: "David Park",
            avatar: "/avatars/david.jpg"
          },
          content: "Totally agree! The JavaScript ecosystem is massive and constantly evolving.",
          createdAt: "2024-01-15T09:00:00Z",
          likes: 3,
          isLiked: false,
          replies: []
        },
        {
          id: "3-2",
          author: {
            name: "Lisa Zhang",
            avatar: "/avatars/lisa.jpg"
          },
          content: "That's true, but sometimes the abundance of choice can be overwhelming for new developers.",
          createdAt: "2024-01-15T09:30:00Z",
          likes: 5,
          isLiked: false,
          replies: []
        }
      ]
    }
  ]

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)

    try {
      // TODO: Submit comment via API
      console.log("Submitting comment:", { pollId, content: newComment, replyTo: replyingTo })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      setNewComment("")
      setReplyingTo(null)
    } catch (error) {
      console.error("Error submitting comment:", error)
      alert("Failed to post comment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId)
    // TODO: Focus on comment input or show reply form
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* New Comment Form */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="text-xs">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share your thoughts about this poll..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none"
                maxLength={500}
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {newComment.length}/500 characters
                </span>
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || isSubmitting}
                  size="sm"
                >
                  {isSubmitting ? (
                    "Posting..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-1" />
                      Post Comment
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {replyingTo && (
            <div className="ml-11 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-700 dark:text-blue-300">
                  Replying to comment...
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(null)}
                  className="h-6 w-6 p-0"
                >
                  ×
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No comments yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Be the first to share your thoughts about this poll.
              </p>
            </div>
          ) : (
            <>
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onReply={handleReply}
                />
              ))}
            </>
          )}
        </div>

        {/* Load More Comments */}
        {comments.length > 0 && (
          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" size="sm">
              Load More Comments
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
