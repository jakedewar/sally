"use client"

import { useState, useEffect } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Share2, ExternalLink } from "lucide-react"
import { useUser } from '@clerk/nextjs'
import { Separator } from "@/components/ui/separator"

type IntegrationItem = {
    id: string
    name: string
    description: string
    considerations: string[]
    codeSnippet?: string
}

type IntegrationSection = {
    id: string
    title: string
    items: IntegrationItem[]
}

const integrationSections: IntegrationSection[] = [
    {
        id: "setup",
        title: "Initial Setup",
        items: [
            {
                id: "install_sdk",
                name: "Install Klaviyo SDK",
                description: "Add the Klaviyo SDK to your platform",
                considerations: [
                    "Choose between npm package or script tag installation",
                    "Ensure the SDK is loaded on all pages where tracking will occur",
                    "Initialize the SDK with your Public API Key"
                ],
                codeSnippet: `
// npm installation
npm install klaviyo-sdk

// Script tag installation
<script async type="text/javascript" src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=YOUR_PUBLIC_API_KEY"></script>

// SDK Initialization
klaviyo.init("YOUR_PUBLIC_API_KEY");
`
            },
            {
                id: "identify_integration",
                name: "Identify Your Integration",
                description: "Set a unique identifier for your integration",
                considerations: [
                    "Choose a descriptive name for your integration",
                    "Use this identifier in all API requests",
                    "Helps Klaviyo support team assist with troubleshooting"
                ],
                codeSnippet: `
// Example of setting integration name in API requests
const headers = {
  'Authorization': 'Klaviyo-API-Key your-private-api-key',
  'Content-Type': 'application/json',
  'X-Klaviyo-User-Agent': 'YourIntegrationName/1.0.0'
};
`
            }
        ]
    },
    {
        id: "profile_management",
        title: "Profile Management",
        items: [
            {
                id: "identify_profiles",
                name: "Identify Profiles",
                description: "Associate user actions with a specific profile",
                considerations: [
                    "Use a consistent identifier across all platforms (e.g., email, user ID)",
                    "Include as many properties as possible for rich segmentation",
                    "Update profile properties whenever new information is available"
                ],
                codeSnippet: `
klaviyo.identify({
  $email: 'customer@example.com',
  $first_name: 'Jane',
  $last_name: 'Doe',
  $phone_number: '+1-541-754-3010',
  $city: 'Cambridge',
  $region: 'MA',
  $country: 'USA',
  $zip: '02139',
  'Custom Property': 'Value'
});
`
            },
            {
                id: "track_subscriptions",
                name: "Track Subscriptions",
                description: "Manage email and SMS subscription statuses",
                considerations: [
                    "Sync subscription status changes in real-time",
                    "Respect user preferences across all channels",
                    "Implement double opt-in for email subscriptions if required"
                ],
                codeSnippet: `
// Example of updating subscription status
klaviyo.profile.set({
  $email: 'customer@example.com',
  $consent: ['email', 'sms']
});
`
            }
        ]
    },
    {
        id: "event_tracking",
        title: "Event Tracking",
        items: [
            {
                id: "viewed_product",
                name: "Viewed Product",
                description: "Track when a user views a product page",
                considerations: [
                    "Include all relevant product data (ID, name, price, etc.)",
                    "Track on product pages, search results, and category pages",
                    "Consider tracking view duration for engagement metrics"
                ],
                codeSnippet: `
klaviyo.track('Viewed Product', {
  $value: 99.99,
  ProductName: 'Example Product',
  ProductID: 'SKU-123',
  Categories: ['Category1', 'Category2']
});
`
            },
            {
                id: "added_to_cart",
                name: "Added to Cart",
                description: "Track when a user adds a product to their cart",
                considerations: [
                    "Capture product details, quantity, and options",
                    "Implement across all add-to-cart locations",
                    "Consider tracking the source of the add-to-cart action"
                ],
                codeSnippet: `
klaviyo.track('Added to Cart', {
  $value: 99.99,
  ProductName: 'Example Product',
  ProductID: 'SKU-123',
  Quantity: 1,
  Categories: ['Category1', 'Category2']
});
`
            },
            {
                id: "started_checkout",
                name: "Started Checkout",
                description: "Track when a user begins the checkout process",
                considerations: [
                    "Define the exact point that constitutes 'starting' checkout",
                    "Capture cart contents and total value",
                    "Track any applied coupons or discounts"
                ],
                codeSnippet: `
klaviyo.track('Started Checkout', {
  $value: 99.99,
  ItemNames: ['Product1', 'Product2'],
  Items: [
    { ProductID: 'SKU-123', Quantity: 1, Price: 49.99 },
    { ProductID: 'SKU-456', Quantity: 1, Price: 50.00 }
  ]
});
`
            },
            {
                id: "placed_order",
                name: "Placed Order",
                description: "Track when a user completes a purchase",
                considerations: [
                    "Implement on the order confirmation page and via server-side API",
                    "Include all order details (order ID, items, total, etc.)",
                    "Handle recurring orders or subscriptions appropriately"
                ],
                codeSnippet: `
klaviyo.track('Placed Order', {
  $value: 99.99,
  OrderId: '12345',
  Categories: ['Category1', 'Category2'],
  ItemNames: ['Product1', 'Product2'],
  Items: [
    { ProductID: 'SKU-123', Quantity: 1, Price: 49.99 },
    { ProductID: 'SKU-456', Quantity: 1, Price: 50.00 }
  ]
});
`
            }
        ]
    },
    {
        id: "advanced_features",
        title: "Advanced Features",
        items: [
            {
                id: "custom_events",
                name: "Implement Custom Events",
                description: "Track unique events specific to your business",
                considerations: [
                    "Identify key user actions that are important for your business",
                    "Use consistent naming conventions for custom events",
                    "Include relevant properties that provide context for the event"
                ],
                codeSnippet: `
klaviyo.track('Custom Event Name', {
  $value: 10.99,
  Property1: 'Value1',
  Property2: 'Value2'
});
`
            },
            {
                id: "server_side_tracking",
                name: "Implement Server-Side Tracking",
                description: "Use server-side API for critical events",
                considerations: [
                    "Use for high-value events like purchases",
                    "Ensures data accuracy and prevents client-side tampering",
                    "Requires secure handling of API keys"
                ],
                codeSnippet: `
// Server-side API call example (Node.js)
const axios = require('axios');

axios.post('https://a.klaviyo.com/api/track', {
  token: 'YOUR_PUBLIC_API_KEY',
  event: 'Placed Order',
  customer_properties: {
    $email: 'customer@example.com'
  },
  properties: {
    $value: 99.99,
    OrderId: '12345'
  }
}, {
  headers: {
    'Content-Type': 'application/json'
  }
});
`
            },
            {
                id: "dynamic_variables",
                name: "Utilize Dynamic Variables",
                description: "Implement dynamic content in email templates",
                considerations: [
                    "Use Klaviyo's template language for personalization",
                    "Ensure all necessary data is synced to Klaviyo profiles",
                    "Test thoroughly with various profile data scenarios"
                ],
                codeSnippet: `
<!-- Example of dynamic content in an email template -->
<p>Hello {{ first_name|default:"there" }},</p>
<p>Your last purchase was {{ event.Placed Order.ItemNames|join:", " }}.</p>
`
            }
        ]
    },
    {
        id: "testing_optimization",
        title: "Testing and Optimization",
        items: [
            {
                id: "data_validation",
                name: "Validate Data Accuracy",
                description: "Ensure all tracked data is accurate and complete",
                considerations: [
                    "Set up test profiles and events in your staging environment",
                    "Verify data in Klaviyo matches your system's data",
                    "Check for any missing or incorrect properties"
                ]
            },
            {
                id: "performance_testing",
                name: "Conduct Performance Testing",
                description: "Ensure the integration doesn't impact site performance",
                considerations: [
                    "Measure page load times before and after integration",
                    "Test under various network conditions",
                    "Optimize any client-side scripts for speed"
                ]
            },
            {
                id: "error_handling",
                name: "Implement Error Handling",
                description: "Add robust error handling and logging",
                considerations: [
                    "Log any failed API calls or tracking events",
                    "Implement retry logic for important events",
                    "Set up alerts for critical failures"
                ]
            }
        ]
    }
]

export default function IntegrationChecklistComponent() {
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [currentStep, setCurrentStep] = useState(0)
    const [progress, setProgress] = useState(0)
    const { user, isLoaded } = useUser()

    useEffect(() => {
        const totalItems = integrationSections.reduce((sum, section) => sum + section.items.length, 0)
        const completedItems = selectedItems.length
        setProgress((completedItems / totalItems) * 100)
    }, [selectedItems])

    const handleItemToggle = (itemId: string) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        )
    }

    const nextStep = () => {
        if (currentStep < integrationSections.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const currentSection = integrationSections[currentStep]

    const supportResources = [
        { title: "Klaviyo Docs", url: "https://developers.klaviyo.com/en/" },
        { title: "API Reference", url: "https://developers.klaviyo.com/en/reference/api-overview" },
        { title: "Community Forum", url: "https://community.klaviyo.com/" },
        { title: "Support Center", url: "https://help.klaviyo.com/" },
    ]

    return (
        <div>
            {/* Progress Tracking Card */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Integration Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                        <Progress value={progress} className="w-full" />
                        <span className="text-sm font-medium">{Math.round(progress)}%</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Current Step: {currentStep + 1} of {integrationSections.length} - {currentSection.title}
                    </p>
                </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Project Overview & Specs */}
                <div className="md:w-1/3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-semibold mb-2">TechStyle Boutique Integration</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Custom e-commerce platform integration with Klaviyo for enhanced customer engagement and personalized marketing.
                            </p>
                            <h4 className="font-semibold mb-2">Key Specifications:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                                <li>E-commerce platform: Custom-built</li>
                                <li>Primary goals: User tracking, event logging, personalized emails</li>
                                <li>Key events: Product views, cart additions, checkouts, purchases</li>
                                <li>Advanced features: Custom events, server-side tracking</li>
                            </ul>
                            <Separator className="my-4" />
                            <h4 className="font-semibold mt-6 mb-2">Klaviyo Resources:</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {supportResources.map((resource, index) => (
                                    <a
                                        key={index}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center p-2 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        {resource.title}
                                        <ExternalLink className="ml-1 h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Setup Steps */}
                <div className="md:w-2/3">
                    <Card>
                        <CardHeader>
                            <CardTitle>{currentSection.title}</CardTitle>
                            <CardDescription>Step {currentStep + 1} of {integrationSections.length}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {currentSection.items.map((item) => (
                                    <Card key={item.id}>
                                        <CardHeader>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={item.id}
                                                    checked={selectedItems.includes(item.id)}
                                                    onCheckedChange={() => handleItemToggle(item.id)}
                                                />
                                                <Label htmlFor={item.id} className="text-lg font-semibold">{item.name}</Label>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                            <Accordion type="single" collapsible className="w-full">
                                                <AccordionItem value="considerations">
                                                    <AccordionTrigger>Implementation Considerations</AccordionTrigger>
                                                    <AccordionContent>
                                                        <ul className="list-disc pl-5 space-y-1">
                                                            {item.considerations.map((consideration, index) => (
                                                                <li key={index} className="text-sm">{consideration}</li>
                                                            ))}
                                                        </ul>
                                                    </AccordionContent>
                                                </AccordionItem>
                                                {item.codeSnippet && (
                                                    <AccordionItem value="code-snippet">
                                                        <AccordionTrigger>Code Snippet</AccordionTrigger>
                                                        <AccordionContent>
                                                            <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                                                                <code>{item.codeSnippet}</code>
                                                            </pre>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                )}
                                            </Accordion>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                        <div className="flex justify-between p-6">
                            <Button
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                variant="outline"
                                className="bg-white text-[#5D51FF] border-[#5D51FF] hover:bg-[#F0EEFF] hover:text-[#5D51FF]"
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                            </Button>
                            <Button
                                onClick={nextStep}
                                disabled={currentStep === integrationSections.length - 1}
                                className="bg-[#5D51FF] text-white hover:bg-[#4B41CC]"
                            >
                                {currentStep === integrationSections.length - 1 ? "Finish" : "Next"} <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            {currentStep === integrationSections.length - 1 && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>Review all selected integration items with your development team.</li>
                            <li>Set up a development environment and install the Klaviyo SDK.</li>
                            <li>Implement core tracking events (e.g., Viewed Product, Added to Cart, Placed Order).</li>
                            <li>Set up profile identification and management.</li>
                            <li>Implement any custom events specific to your business needs.</li>
                            <li>Conduct thorough testing, including data validation and performance testing.</li>
                            <li>Implement error handling and logging.</li>
                            <li>Deploy to a staging environment for final testing.</li>
                            <li>Schedule a review call with your Klaviyo Solution Architect to validate the implementation.</li>
                            <li>Plan for gradual rollout to production, monitoring closely for any issues.</li>
                        </ol>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}