// Import necessary modules and components
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { ArrowRight, ArrowLeft, Plus, Trash2 } from 'lucide-react'

// Define types for integration data and events
interface EventData {
    name: string
    properties: string
}

interface IntegrationData {
    name: string
    publicApiKey: string
    privateApiKey: string
    events: EventData[]
    useServerSide: boolean
    serverSideEndpoint: string
}

// Main IntegrationBuilder component
export default function IntegrationBuilder() {
    const [currentStep, setCurrentStep] = useState<number>(1)
    const [integrationData, setIntegrationData] = useState<IntegrationData>({
        name: '',
        publicApiKey: '',
        privateApiKey: '',
        events: [
            { name: 'Viewed Product', properties: '{"ProductID": "", "ProductName": "", "Category": ""}' }
        ],
        useServerSide: false,
        serverSideEndpoint: '',
    })
    const [generatedCode, setGeneratedCode] = useState<{
        identifyProfileCode: string
        trackEventCode: string
    }>({
        identifyProfileCode: '',
        trackEventCode: '',
    })

    const updateIntegrationData = (data: Partial<IntegrationData>) => {
        setIntegrationData(prev => ({ ...prev, ...data }))
    }

    const handleNext = () => {
        if (currentStep === 1) {
            // Validate API keys (placeholder for actual validation logic)
            if (integrationData.publicApiKey && integrationData.privateApiKey) {
                // Proceed to next step
                setCurrentStep(currentStep + 1)
            } else {
                alert('Please enter valid API keys.')
            }
        } else if (currentStep === 2) {
            // Generate Identify Profile Code
            const code = generateIdentifyCode()
            setGeneratedCode(prev => ({ ...prev, identifyProfileCode: code }))
            setCurrentStep(currentStep + 1)
        } else if (currentStep === 3) {
            // Generate Track Event Code
            const code = generateTrackEventCode()
            setGeneratedCode(prev => ({ ...prev, trackEventCode: code }))
            setCurrentStep(currentStep + 1)
        } else {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => setCurrentStep(currentStep - 1)

    const handleAddEvent = () => {
        updateIntegrationData({
            events: [...integrationData.events, { name: '', properties: '{}' }]
        })
    }

    const handleRemoveEvent = (index: number) => {
        updateIntegrationData({
            events: integrationData.events.filter((_, i) => i !== index)
        })
    }

    const handleEventChange = (index: number, field: 'name' | 'properties', value: string) => {
        const updatedEvents = [...integrationData.events]
        updatedEvents[index] = { ...updatedEvents[index], [field]: value }
        updateIntegrationData({ events: updatedEvents })
    }

    const generateIdentifyCode = (): string => {
        // Generate code for identifying profiles using the new Klaviyo object
        return `
<script>
// Initialize Klaviyo
(function() {
  // Load Klaviyo script
  var klaviyoScript = document.createElement('script');
  klaviyoScript.type = 'text/javascript';
  klaviyoScript.async = true;
  klaviyoScript.src = 'https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${integrationData.publicApiKey}';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(klaviyoScript, s);
  
  // Identify the user after Klaviyo is loaded
  klaviyoScript.onload = function() {
    // Replace with actual customer data
    Klaviyo.identify({
      email: 'INSERT_CUSTOMER_EMAIL',
      $first_name: 'INSERT_FIRST_NAME',
      $last_name: 'INSERT_LAST_NAME'
    });
  };
})();
</script>
    `.trim()
    }

    const generateTrackEventCode = (): string => {
        // Generate code for tracking events using the new Klaviyo object
        let code = `
<script>
// Event Tracking
(function() {
  function trackEvents() {
    `
        integrationData.events.forEach(event => {
            code += `
    // Track ${event.name}
    Klaviyo.track('${event.name}', ${event.properties});
    `
        })
        code += `
  }

  // Check if Klaviyo is loaded
  if (typeof Klaviyo !== 'undefined') {
    trackEvents();
  } else {
    // Wait for Klaviyo to load
    var klaviyoInterval = setInterval(function() {
      if (typeof Klaviyo !== 'undefined') {
        clearInterval(klaviyoInterval);
        trackEvents();
      }
    }, 500);
  }
})();
</script>
    `.trim()
        return code
    }

    const handleFinalizeIntegration = () => {
        // Placeholder for finalization logic
        console.log('Integration finalized', integrationData, generatedCode)
        alert('Integration setup is complete! Please implement the generated code into your platform.')
    }

    return (
        <div>

            <Tabs value={`step${currentStep}`} className="space-y-8">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="step1" disabled={currentStep !== 1}>1. Authentication</TabsTrigger>
                    <TabsTrigger value="step2" disabled={currentStep !== 2}>2. Identify Profiles</TabsTrigger>
                    <TabsTrigger value="step3" disabled={currentStep !== 3}>3. Track Events</TabsTrigger>
                    <TabsTrigger value="step4" disabled={currentStep !== 4}>4. Review</TabsTrigger>
                </TabsList>

                {/* Step 1: Authentication Setup */}
                <TabsContent value="step1">
                    {/* ... same as before */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Authentication Setup</CardTitle>
                            <CardDescription>Set up your Klaviyo API keys for authentication.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="integration-name">Integration Name</Label>
                                <Input
                                    id="integration-name"
                                    value={integrationData.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateIntegrationData({ name: e.target.value })}
                                    placeholder="e.g., My Custom eCommerce Integration"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="public-api-key">Public API Key</Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Input
                                                id="public-api-key"
                                                value={integrationData.publicApiKey}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateIntegrationData({ publicApiKey: e.target.value })}
                                                placeholder="Enter your Klaviyo Public API Key"
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Your Public API Key (also called Site ID) is used for client-side tracking.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="private-api-key">Private API Key</Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Input
                                                id="private-api-key"
                                                type="password"
                                                value={integrationData.privateApiKey}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateIntegrationData({ privateApiKey: e.target.value })}
                                                placeholder="Enter your Klaviyo Private API Key"
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Your Private API Key is used for server-side API calls. Keep it secure!</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Button onClick={handleNext} className="w-full mt-4">Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Step 2: Identify Profiles */}
                <TabsContent value="step2">
                    {/* Updated code */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Identify Profiles</CardTitle>
                            <CardDescription>Set up code to identify customer profiles using the Klaviyo SDK.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Generated Identify Profile Code</Label>
                                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                                    <code>{generateIdentifyCode()}</code>
                                </pre>
                                <p className="text-sm text-gray-600">
                                    Copy and paste this code into your website's HTML, replacing placeholder values with actual customer data.
                                </p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <Button onClick={handleBack} variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                                <Button onClick={handleNext}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Step 3: Track Events */}
                <TabsContent value="step3">
                    {/* Updated code */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Track Events</CardTitle>
                            <CardDescription>Set up event tracking using the Klaviyo SDK.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* ... event setup code remains the same ... */}
                            {integrationData.events.map((event, index) => (
                                <div key={index} className="space-y-4 p-4 border rounded-md">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor={`event-name-${index}`}>Event Name</Label>
                                        {index > 0 && (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleRemoveEvent(index)}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" /> Remove
                                            </Button>
                                        )}
                                    </div>
                                    <Input
                                        id={`event-name-${index}`}
                                        value={event.name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEventChange(index, 'name', e.target.value)}
                                        placeholder="e.g., Added to Cart"
                                    />
                                    <Label htmlFor={`event-properties-${index}`}>Event Properties (JSON Format)</Label>
                                    <Textarea
                                        id={`event-properties-${index}`}
                                        value={event.properties}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleEventChange(index, 'properties', e.target.value)}
                                        placeholder='e.g., {"ProductID": "123", "ProductName": "Dog Toy"}'
                                        rows={4}
                                    />
                                </div>
                            ))}
                            <Button onClick={handleAddEvent} variant="outline" className="w-full">
                                <Plus className="mr-2 h-4 w-4" /> Add Another Event
                            </Button>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="use-server-side"
                                        checked={integrationData.useServerSide}
                                        onCheckedChange={(checked: boolean) => updateIntegrationData({ useServerSide: checked })}
                                    />
                                    <Label htmlFor="use-server-side">Use Server-Side Tracking</Label>
                                </div>
                                {integrationData.useServerSide && (
                                    <div className="space-y-2">
                                        <Label htmlFor="server-side-endpoint">Server-Side Endpoint</Label>
                                        <Input
                                            id="server-side-endpoint"
                                            value={integrationData.serverSideEndpoint}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateIntegrationData({ serverSideEndpoint: e.target.value })}
                                            placeholder="Enter your server-side endpoint URL"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between mt-4">
                                <Button onClick={handleBack} variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                                <Button onClick={handleNext}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Step 4: Review */}
                <TabsContent value="step4">
                    {/* ... same as before ... */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Review Your Integration</CardTitle>
                            <CardDescription>Here's a summary of your integration setup. Please review before finalizing.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold">Integration Name:</h3>
                                <p>{integrationData.name}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Authentication:</h3>
                                <p>Public API Key: {integrationData.publicApiKey}</p>
                                <p>Private API Key: ••••••••••••••••</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Identify Profiles Code:</h3>
                                <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                                    <code>{generatedCode.identifyProfileCode}</code>
                                </pre>
                            </div>
                            <div>
                                <h3 className="font-semibold">Track Events Code:</h3>
                                <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                                    <code>{generatedCode.trackEventCode}</code>
                                </pre>
                            </div>
                            <div>
                                <h3 className="font-semibold">Server-Side Tracking:</h3>
                                <p>{integrationData.useServerSide ? `Enabled (Endpoint: ${integrationData.serverSideEndpoint})` : 'Disabled'}</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <Button onClick={handleBack} variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                                <Button onClick={handleFinalizeIntegration}>Finalize Integration</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
