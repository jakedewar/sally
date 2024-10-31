'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

type KlaviyoSendModalProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (apiKey: string) => void
    payload: {
        metricName: string
        payload: any
    }
}

export default function KlaviyoSendModal({ isOpen, onClose, onSubmit, payload }: KlaviyoSendModalProps) {
    const [apiKey, setApiKey] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!apiKey.trim()) {
            setError('API Key is required')
            return
        }
        if (apiKey.length < 8) {
            setError('API Key must be at least 8 characters long')
            return
        }
        if (!email.trim()) {
            setError('Email is required')
            return
        }
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/send-to-klaviyo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    apiKey,
                    email,
                    payload: {
                        metricName: payload.metricName,
                        properties: payload.payload
                    }
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.details || data.error || 'Failed to send to Klaviyo')
            }

            toast({
                title: "Success",
                description: "Metric sent to Klaviyo successfully!",
            })
            onSubmit(apiKey)
        } catch (error: unknown) {
            console.error('Error sending to Klaviyo:', error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to send metric to Klaviyo. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Send to Klaviyo</DialogTitle>
                    <DialogDescription>
                        Enter your Klaviyo API key and the email address for the profile.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="apiKey" className="text-right">
                                API Key
                            </Label>
                            <Input
                                id="apiKey"
                                value={apiKey}
                                onChange={(e) => {
                                    setApiKey(e.target.value)
                                    setError('')
                                }}
                                placeholder="Enter your Klaviyo API key"
                                className={`col-span-3 ${error ? 'border-red-500' : ''}`}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setError('')
                                }}
                                placeholder="Enter the profile email"
                                className={`col-span-3 ${error ? 'border-red-500' : ''}`}
                            />
                        </div>
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Sending...' : 'Send to Klaviyo'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}