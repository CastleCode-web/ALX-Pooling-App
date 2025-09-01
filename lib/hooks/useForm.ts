"use client"

import { useState, useCallback, ChangeEvent, FormEvent } from 'react'

interface UseFormOptions<T> {
  initialValues: T
  validate?: (values: T) => Partial<Record<keyof T, string>>
  onSubmit?: (values: T) => void | Promise<void>
}

interface UseFormReturn<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  isSubmitting: boolean
  isDirty: boolean
  handleChange: (name: keyof T) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleSubmit: (e: FormEvent) => void
  setFieldValue: (name: keyof T, value: any) => void
  setFieldError: (name: keyof T, error: string) => void
  reset: () => void
  resetErrors: () => void
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  const handleChange = useCallback((name: keyof T) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { type, value, checked } = e.target as HTMLInputElement
      const newValue = type === 'checkbox' ? checked : value

      setValues(prev => ({ ...prev, [name]: newValue }))
      setIsDirty(true)

      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: undefined }))
      }
    }, [errors])

  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }))
    setIsDirty(true)
  }, [])

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [])

  const resetErrors = useCallback(() => {
    setErrors({})
  }, [])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setIsSubmitting(false)
    setIsDirty(false)
  }, [initialValues])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return

    // Validate form
    const validationErrors = validate ? validate(values) : {}

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      if (onSubmit) {
        await onSubmit(values)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [values, validate, onSubmit, isSubmitting])

  return {
    values,
    errors,
    isSubmitting,
    isDirty,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldError,
    reset,
    resetErrors
  }
}

// Utility validation functions
export const validators = {
  required: (value: any): string | null => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required'
    }
    return null
  },

  email: (value: string): string | null => {
    if (!value) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) ? null : 'Please enter a valid email address'
  },

  minLength: (min: number) => (value: string): string | null => {
    if (!value) return null
    return value.length >= min ? null : `Must be at least ${min} characters long`
  },

  maxLength: (max: number) => (value: string): string | null => {
    if (!value) return null
    return value.length <= max ? null : `Must be no more than ${max} characters long`
  },

  matchField: (otherValue: string, fieldName: string) => (value: string): string | null => {
    return value === otherValue ? null : `Must match ${fieldName}`
  },

  url: (value: string): string | null => {
    if (!value) return null
    try {
      new URL(value)
      return null
    } catch {
      return 'Please enter a valid URL'
    }
  },

  pattern: (regex: RegExp, message: string) => (value: string): string | null => {
    if (!value) return null
    return regex.test(value) ? null : message
  }
}

// Compose multiple validators
export const composeValidators = (...validators: ((value: any) => string | null)[]): ((value: any) => string | null) => {
  return (value: any) => {
    for (const validator of validators) {
      const error = validator(value)
      if (error) return error
    }
    return null
  }
}
