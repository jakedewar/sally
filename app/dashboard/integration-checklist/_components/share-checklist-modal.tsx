"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Copy, Share2 } from 'lucide-react'

interface ShareChecklistModalProps {
    checklistId: string
}

export default function ShareChecklistModal({ checklistId }: ShareChecklistModalProps = { checklistId: '' }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isPasswordProtected, setIsPasswordProtected] = useState(false)
    const [password, setPassword] = useState('')
    const [expirationDays, setExpirationDays] = useState(7)
    const [shareableLink, setShareableLink] = useState('')

    const generateLink = async () => {
        // In a real application, this would be an API call to generate the link
        const mockGeneratedLink = `https://klaviyo.com/share/${checklistId}/${Math.random().toString(36).substring(7)}`
        setShareableLink(mockGeneratedLink)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareableLink)
        toast({
            title: "Link copied",
            description: "The shareable link has been copied to your clipboard.",
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share Integration Checklist</DialogTitle>
                    <DialogDescription>
                        Create a private, shareable link for this integration checklist.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="password-protection"
                            checked={isPasswordProtected}
                            onCheckedChange={setIsPasswordProtected}
                        />
                        <Label htmlFor="password-protection">Password protect</Label>
                    </div>
                    {isPasswordProtected && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                className="col-span-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="expiration" className="text-right">
                            Expires in
                        </Label>
                        <Input
                            id="expiration"
                            type="number"
                            className="col-span-3"
                            value={expirationDays}
                            onChange={(e) => setExpirationDays(Number(e.target.value))}
                        />
                    </div>
                    {shareableLink ? (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="link" className="text-right">
                                Link
                            </Label>
                            <Input
                                id="link"
                                type="text"
                                className="col-span-3"
                                value={shareableLink}
                                readOnly
                            />
                        </div>
                    ) : null}
                </div>
                <div className="flex justify-end space-x-2">
                    {shareableLink ? (
                        <Button onClick={copyToClipboard}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Link
                        </Button>
                    ) : (
                        <Button onClick={generateLink}>Generate Link</Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}