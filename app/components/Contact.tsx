'use client'

import { useState } from 'react'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <section className="container mx-auto px-4 py-16 bg-gradient-to-b from-gray-50 to-white" id="contact">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or want to work together? I'd love to hear from you.
          </p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          noValidate
        >
          <div className="space-y-6">
            <Field>
              <FieldGroup>
                <FieldLabel className="text-sm font-semibold text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldDescription className="text-xs text-gray-500">
                  Enter your full name.
                </FieldDescription>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`mt-1 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-red-500 mt-1">
                    {errors.name}
                  </p>
                )}
              </FieldGroup>
            </Field>

            <Field>
              <FieldGroup>
                <FieldLabel className="text-sm font-semibold text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldDescription className="text-xs text-gray-500">
                  Enter your email address.
                </FieldDescription>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  className={`mt-1 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-500 mt-1">
                    {errors.email}
                  </p>
                )}
              </FieldGroup>
            </Field>

            <Field>
              <FieldGroup>
                <FieldLabel className="text-sm font-semibold text-gray-700">
                  Message <span className="text-red-500">*</span>
                </FieldLabel>
                <FieldDescription className="text-xs text-gray-500">
                  Enter your message (minimum 10 characters).
                </FieldDescription>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={6}
                  className={`mt-1 ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-red-500 mt-1">
                    {errors.message}
                  </p>
                )}
              </FieldGroup>
            </Field>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                <p className="font-medium">✓ Message sent successfully!</p>
                <p className="text-sm">I'll get back to you as soon as possible.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-medium">✗ Failed to send message</p>
                <p className="text-sm">{errorMessage || 'Please try again later.'}</p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to our privacy policy.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}