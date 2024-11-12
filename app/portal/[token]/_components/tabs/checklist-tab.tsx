import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertCircle, CheckCircle2, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface ChecklistItem {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    requirements: string[];
    codeSnippet?: string;
    documentation?: string;
    estimatedTime: string;
    status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
}

interface ChecklistSection {
    id: string;
    title: string;
    items: ChecklistItem[];
}

export function ChecklistTab() {
    const [currentStep, setCurrentStep] = useState(0);
    const [sections] = useState<ChecklistSection[]>([
        {
            id: "initial_setup",
            title: "Initial Setup",
            items: [
                {
                    id: "setup",
                    title: "Setup Development Environment",
                    description: "Configure API keys and development tools",
                    completed: true,
                    requirements: [
                        "Create a Klaviyo developer account",
                        "Generate API keys in Klaviyo dashboard",
                        "Install required SDKs and dependencies",
                        "Configure environment variables",
                        "Set up version control for integration code",
                        "Configure development environment with required dependencies"
                    ],
                    codeSnippet: `// Initialize Klaviyo client
const klaviyo = new KlaviyoClient({
    apiKey: process.env.KLAVIYO_API_KEY,
    privateKey: process.env.KLAVIYO_PRIVATE_KEY
});

// Package.json dependencies
{
    "dependencies": {
        "@klaviyo/sdk": "^1.0.0",
        "axios": "^0.24.0",
        "dotenv": "^10.0.0"
    }
}`,
                    documentation: "https://developers.klaviyo.com/en/docs/setup_developer_account",
                    estimatedTime: "30 mins",
                    status: 'completed'
                },
                {
                    id: "auth",
                    title: "Implement Authentication",
                    description: "Set up OAuth 2.0 authentication flow",
                    completed: true,
                    requirements: [
                        "Configure OAuth 2.0 endpoints",
                        "Implement token management",
                        "Handle token refresh flow",
                        "Secure credential storage"
                    ],
                    codeSnippet: `// OAuth 2.0 authentication flow
const authToken = await klaviyo.authenticate({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope: ['read_profiles', 'write_profiles']
});`,
                    documentation: "https://developers.klaviyo.com/en/docs/authenticate_api_requests",
                    estimatedTime: "2 hours",
                    status: 'completed'
                }
            ]
        },
        {
            id: "data_integration",
            title: "Data Integration",
            items: [
                {
                    id: "event_tracking",
                    title: "Event Tracking Setup",
                    description: "Implement core tracking events",
                    completed: false,
                    requirements: [
                        "Implement Viewed Product tracking",
                        "Set up Added to Cart events",
                        "Configure Started Checkout tracking",
                        "Implement Placed Order events",
                        "Set up custom event tracking"
                    ],
                    codeSnippet: `// Track Viewed Product
klaviyo.track('Viewed Product', {
    $value: 99.99,
    ProductName: 'Example Product',
    ProductID: 'SKU-123',
    Categories: ['Category1', 'Category2']
});

// Track Added to Cart
klaviyo.track('Added to Cart', {
    $value: 99.99,
    Items: [{
        ProductID: 'SKU-123',
        Quantity: 1,
        Price: 99.99
    }]
});`,
                    documentation: "https://developers.klaviyo.com/en/docs/event_tracking",
                    estimatedTime: "3 hours",
                    status: 'not-started'
                },
                {
                    id: "sync",
                    title: "Data Synchronization",
                    description: "Implement data sync between systems",
                    completed: false,
                    requirements: [
                        "Define data mapping strategy",
                        "Implement webhook handlers",
                        "Set up error handling and retries",
                        "Configure sync frequency"
                    ],
                    codeSnippet: `// Sync customer data
await klaviyo.profiles.create({
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName,
    properties: {
        customField: customer.customData
    }
});`,
                    documentation: "https://developers.klaviyo.com/en/docs/sync_customer_data",
                    estimatedTime: "4 hours",
                    status: 'in-progress'
                }
            ]
        },
        {
            id: "testing_deployment",
            title: "Testing & Deployment",
            items: [
                {
                    id: "testing",
                    title: "Testing & Validation",
                    description: "Complete integration testing and validation",
                    completed: false,
                    requirements: [
                        "Create test scenarios",
                        "Validate data accuracy",
                        "Performance testing",
                        "Error handling verification"
                    ],
                    documentation: "https://developers.klaviyo.com/en/docs/testing_guide",
                    estimatedTime: "3 hours",
                    status: 'not-started'
                },
                {
                    id: "deploy",
                    title: "Production Deployment",
                    description: "Deploy integration to production environment",
                    completed: false,
                    requirements: [
                        "Production environment setup",
                        "Migration plan",
                        "Rollback strategy",
                        "Monitoring configuration"
                    ],
                    documentation: "https://developers.klaviyo.com/en/docs/deployment_guide",
                    estimatedTime: "2 hours",
                    status: 'not-started'
                },
                {
                    id: "monitoring",
                    title: "Monitoring & Maintenance",
                    description: "Set up monitoring and maintenance procedures",
                    completed: false,
                    requirements: [
                        "Configure error monitoring",
                        "Set up performance tracking",
                        "Implement automated health checks",
                        "Create maintenance documentation",
                        "Establish backup procedures"
                    ],
                    documentation: "https://developers.klaviyo.com/en/docs/monitoring",
                    estimatedTime: "2 hours",
                    status: 'not-started'
                }
            ]
        }
    ]);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const completedCount = sections.reduce((total, section) => total + section.items.filter(item => item.completed).length, 0);
        setProgress((completedCount / sections.reduce((total, section) => total + section.items.length, 0)) * 100);
    }, [sections]);

    const currentSection = sections[currentStep];
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const nextStep = () => {
        if (currentStep < sections.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Left sidebar with project overview */}
                <div className="md:w-1/3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-2">Integration Specifications</h3>
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                        <li>Platform: Custom E-commerce</li>
                                        <li>Integration Type: Full Stack</li>
                                        <li>Data Flow: Bi-directional</li>
                                        <li>Priority Events: Product views, Cart actions, Orders</li>
                                    </ul>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="font-semibold mb-2">Resources</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button variant="outline" className="text-sm" onClick={() => window.open('https://developers.klaviyo.com', '_blank')}>
                                            API Docs
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" className="text-sm" onClick={() => window.open('https://developers.klaviyo.com/en/docs/sdk_overview', '_blank')}>
                                            SDK Guide
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main content */}
                <div className="md:w-2/3">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{currentSection.title}</CardTitle>
                                    <CardDescription>Step {currentStep + 1} of {sections.length}</CardDescription>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">Section Progress</span>
                                    <span className="text-sm font-medium">{Math.round(progress)}%</span>
                                </div>
                                <Progress value={progress} className="w-full" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Existing items mapping */}
                        </CardContent>
                        <div className="flex justify-between p-6 border-t">
                            <Button
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                variant="outline"
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                            </Button>
                            <Button
                                onClick={nextStep}
                                disabled={currentStep === sections.length - 1}
                            >
                                Next <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </Card>

                    {currentStep === sections.length - 1 && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Next Steps</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                                    <li>Schedule a technical review with your Solution Architect</li>
                                    <li>Complete any remaining implementation tasks</li>
                                    <li>Prepare test cases for validation</li>
                                    <li>Plan production deployment timeline</li>
                                    <li>Set up monitoring and alerting</li>
                                </ol>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
} 