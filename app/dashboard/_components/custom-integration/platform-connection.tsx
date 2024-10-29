import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowRight, Copy, CheckCircle2, HelpCircle } from 'lucide-react'

type Platform = {
    name: string
    apiUrl: string
    authMethod: string
    apiKey?: string
    username?: string
    password?: string
    webhookUrl: string
    customHeaders: Record<string, string>
    testMode: boolean
}

type PlatformConnectionProps = {
    onConnect: (platformData: Platform) => void
}

function InfoTooltip({ content }: { content: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400 ml-1" />
                </TooltipTrigger>
                <TooltipContent>
                    <p className="w-64">{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

function OAuthSupportModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the support request to your backend
        console.log('Support request submitted:', { email, message })
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Need help with OAuth setup?</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>OAuth 2.0 Setup Support</DialogTitle>
                    <DialogDescription>
                        Our team will guide you through the OAuth 2.0 setup process. Please provide your details below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="message" className="text-right">
                                Message
                            </Label>
                            <Textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Send Request</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default function PlatformConnection({ onConnect }: PlatformConnectionProps) {
    const [platformName, setPlatformName] = useState('')
    const [apiUrl, setApiUrl] = useState('')
    const [authMethod, setAuthMethod] = useState('api_key')
    const [apiKey, setApiKey] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [webhookUrl, setWebhookUrl] = useState('https://your-app.com/webhook/custom-platform')
    const [customHeaders, setCustomHeaders] = useState('')
    const [testMode, setTestMode] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleConnect = () => {
        const platformData: Platform = {
            name: platformName,
            apiUrl,
            authMethod,
            apiKey,
            username,
            password,
            webhookUrl,
            customHeaders: customHeaders.split('\n').reduce((acc, line) => {
                const [key, value] = line.split(':')
                if (key && value) {
                    acc[key.trim()] = value.trim()
                }
                return acc
            }, {} as Record<string, string>),
            testMode
        }
        onConnect(platformData)
    }

    const copyWebhookUrl = () => {
        navigator.clipboard.writeText(webhookUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-lg'>Platform Connection Details</CardTitle>
                <CardDescription>Provide the necessary information to connect your custom eCommerce platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <Label htmlFor="platform-name">Platform Name</Label>
                            <InfoTooltip content="Enter a unique name to identify your eCommerce platform within our system." />
                        </div>
                        <Input
                            id="platform-name"
                            value={platformName}
                            onChange={(e) => setPlatformName(e.target.value)}
                            placeholder="e.g., My Custom eCommerce Platform"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center">
                            <Label htmlFor="api-url">API Base URL</Label>
                            <InfoTooltip content="The base URL for your eCommerce platform's API. This is where we'll send requests to interact with your platform." />
                        </div>
                        <Input
                            id="api-url"
                            value={apiUrl}
                            onChange={(e) => setApiUrl(e.target.value)}
                            placeholder="https://api.your-platform.com/v1"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center">
                            <Label>Authentication Method</Label>
                            <InfoTooltip content="Choose how you want to authenticate requests to your API. This should match your platform's authentication requirements." />
                        </div>
                        <Select value={authMethod} onValueChange={setAuthMethod}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select auth method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="api_key">API Key</SelectItem>
                                <SelectItem value="basic_auth">Basic Auth</SelectItem>
                                <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {authMethod === 'api_key' && (
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Label htmlFor="api-key">API Key</Label>
                                <InfoTooltip content="Enter the API key provided by your eCommerce platform for authentication." />
                            </div>
                            <Input
                                id="api-key"
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="Enter your API key"
                            />
                        </div>
                    )}

                    {authMethod === 'basic_auth' && (
                        <>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <Label htmlFor="username">Username</Label>
                                    <InfoTooltip content="Enter the username for Basic Auth authentication." />
                                </div>
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <InfoTooltip content="Enter the password for Basic Auth authentication." />
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                            </div>
                        </>
                    )}

                    {authMethod === 'oauth2' && (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">
                                OAuth 2.0 setup requires additional configuration. Our support team can guide you through the process.
                            </p>
                            <OAuthSupportModal />
                        </div>
                    )}

                    <div className="space-y-2">
                        <div className="flex items-center">
                            <Label htmlFor="webhook-url">Webhook URL</Label>
                            <InfoTooltip content="Configure this URL in your eCommerce platform to receive real-time updates in Klaviyo." />
                        </div>
                        <div className="flex">
                            <Input
                                id="webhook-url"
                                value={webhookUrl}
                                readOnly
                                className="flex-grow"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="ml-2"
                                onClick={copyWebhookUrl}
                            >
                                {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                        <p className="text-sm text-gray-500">
                            Configure this webhook URL in your eCommerce platform to send events to Klaviyo.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center">
                            <Label htmlFor="custom-headers">Custom Headers (Optional)</Label>
                            <InfoTooltip content="Add any custom headers required by your API. Enter one header per line in the format 'Header-Name: value'." />
                        </div>
                        <Textarea
                            id="custom-headers"
                            value={customHeaders}
                            onChange={(e) => setCustomHeaders(e.target.value)}
                            placeholder="Enter any custom headers (one per line)&#10;e.g., X-Custom-Header: value"
                            rows={4}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="test-mode"
                            checked={testMode}
                            onCheckedChange={setTestMode}
                        />
                        <Label htmlFor="test-mode">Enable Test Mode</Label>
                        <InfoTooltip content="When enabled, this allows you to test the integration without affecting your live data." />
                    </div>

                    <Button type="button" onClick={handleConnect} className="w-full">
                        Connect Platform <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}