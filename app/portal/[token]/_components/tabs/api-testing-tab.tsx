import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Users, ShoppingCart, Mail, Bell, X, Copy, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Portal } from "../../_types/portal"

interface Example {
    name: string;
    description: string;
    apiEndpoint?: string;
    requestBody?: string;
    responseExample?: string;
    implementation?: {
        language: string;
        code: string;
    }[];
}

interface UseCase {
    title: string;
    description: string;
    icon: React.ReactNode;
    examples: Example[];
}

interface ApiTestingTabProps {
    portalData: Portal;
}

// Extend the examples with implementation details
const useCases: UseCase[] = [
    {
        title: "Track Customer Events",
        description: "Create and manage custom metrics to track customer behavior",
        icon: <BarChart3 className="h-6 w-6" />,
        examples: [
            {
                name: "Purchase Events",
                description: "Track when customers complete purchases with order details",
                apiEndpoint: "POST /api/events/",
                requestBody: `{
  "type": "event",
  "attributes": {
    "metric": {
      "name": "Placed Order"
    },
    "profile": {
      "email": "customer@example.com"
    },
    "properties": {
      "order_id": "ORDER-123",
      "value": 99.99,
      "items": [
        {
          "product_id": "PROD-123",
          "quantity": 1,
          "price": 99.99
        }
      ]
    }
  }
}`,
                implementation: [
                    {
                        language: "JavaScript",
                        code: `const trackPurchase = async (orderDetails) => {
  const response = await fetch('https://a.klaviyo.com/api/events/', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ${process.env.KLAVIYO_PRIVATE_KEY}',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'event',
      attributes: {
        metric: { name: 'Placed Order' },
        profile: { email: orderDetails.customerEmail },
        properties: {
          order_id: orderDetails.orderId,
          value: orderDetails.total,
          items: orderDetails.items
        }
      }
    })
  });
  
  return response.json();
}`
                    }
                ]
            },
            {
                name: "Page Views",
                description: "Monitor which pages customers visit on your site"
            },
            {
                name: "Custom Actions",
                description: "Track specific customer interactions unique to your business"
            }
        ]
    },
    {
        title: "Manage Customer Profiles",
        description: "Create and update customer profile information",
        icon: <Users className="h-6 w-6" />,
        examples: [
            {
                name: "Create Profile",
                description: "Add new customers with their contact and demographic data"
            },
            {
                name: "Update Properties",
                description: "Modify custom properties and preferences"
            },
            {
                name: "Subscription Management",
                description: "Handle email and SMS subscription statuses"
            }
        ]
    },
    {
        title: "E-commerce Integration",
        description: "Sync your store data with Klaviyo",
        icon: <ShoppingCart className="h-6 w-6" />,
        examples: [
            {
                name: "Product Catalog",
                description: "Sync products, variants, and categories"
            },
            {
                name: "Order Tracking",
                description: "Track orders, refunds, and fulfillment status"
            },
            {
                name: "Abandoned Carts",
                description: "Monitor and recover abandoned shopping carts"
            }
        ]
    },
    {
        title: "Communication Preferences",
        description: "Manage customer communication settings",
        icon: <Mail className="h-6 w-6" />,
        examples: [
            {
                name: "Email Preferences",
                description: "Handle email subscription and frequency settings"
            },
            {
                name: "SMS Opt-in",
                description: "Manage SMS consent and phone number verification"
            },
            {
                name: "Push Notifications",
                description: "Configure web and mobile push notification settings"
            }
        ]
    }
];

function CodeBlock({ language, code }: { language: string; code: string }) {
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative">
            <div className="absolute right-2 top-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyCode}
                    className="h-8 w-8 p-0"
                >
                    {copied ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </Button>
            </div>
            <div className="font-mono text-sm bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mt-2">
                <div className="text-xs text-gray-500 mb-2">{language}</div>
                <pre className="overflow-x-auto">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
}

function ExampleDialog({ example, isOpen, onClose }: {
    example: Example;
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader className="space-y-4 pb-4 border-b sticky top-0 bg-white dark:bg-gray-950 z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#5D51FF]/10">
                            <code className="text-[#5D51FF] font-mono text-sm">
                                {example.apiEndpoint?.split(' ')[0] || 'API'}
                            </code>
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-semibold">{example.name}</DialogTitle>
                            <DialogDescription className="text-sm mt-1">
                                {example.description}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-8 py-4 overflow-y-auto flex-1">
                    {example.apiEndpoint && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">API Endpoint</h3>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Revision: 2023-02-22
                                </span>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                                <span className="px-2 py-1 rounded text-xs font-medium bg-[#5D51FF]/10 text-[#5D51FF]">
                                    {example.apiEndpoint.split(' ')[0]}
                                </span>
                                <code className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                                    {example.apiEndpoint.split(' ')[1]}
                                </code>
                            </div>
                        </div>
                    )}

                    {example.requestBody && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Request Body</h3>
                                <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                    JSON
                                </span>
                            </div>
                            <CodeBlock language="json" code={example.requestBody} />
                        </div>
                    )}

                    {example.responseExample && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Response Example</h3>
                                <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                    200 OK
                                </span>
                            </div>
                            <CodeBlock language="json" code={example.responseExample} />
                        </div>
                    )}

                    {example.implementation && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Implementation Example</h3>
                                <div className="flex gap-2">
                                    {example.implementation.map((impl, index) => (
                                        <span
                                            key={index}
                                            className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                                        >
                                            {impl.language}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {example.implementation.map((impl, index) => (
                                <CodeBlock
                                    key={index}
                                    language={impl.language}
                                    code={impl.code}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t sticky bottom-0 bg-white dark:bg-gray-950 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            API Status: Operational
                        </div>
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export function ApiTestingTab({ portalData }: ApiTestingTabProps) {
    const [selectedExample, setSelectedExample] = useState<Example | null>(null);

    if (!portalData || !portalData.opportunity) {
        return <div>Loading...</div>; // Or handle the error appropriately
    }

    return (
        <div className="p-6">
            <div className="grid gap-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-normal text-[#1e1e1e] dark:text-white">
                        Klaviyo Integration Hub
                    </h1>
                    <p className="text-sm text-[#5d5d5d] dark:text-gray-400">
                        Explore common integration patterns and use cases for your Klaviyo implementation
                    </p>
                </div>

                <div className="flex items-center justify-between p-4 border border-green-500 dark:border-green-800 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-green-700 dark:text-green-400" />
                        <div>
                            <span className="text-lg font-semibold text-green-800 dark:text-green-600">
                                Connected to Klaviyo Account: "{portalData.opportunity.companyName}"
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-green-600 dark:text-green-400">
                                    Status:
                                </span>
                                <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300">
                                    Enabled
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="text-sm">
                            View Account
                        </Button>
                        <Button variant="outline" className="text-sm border-red-700 text-red-700 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900">
                            Disconnect
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {useCases.map((useCase, index) => (
                        <Card key={index} className="border-2 hover:border-[#5D51FF] transition-colors">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-[#5D51FF]/10 text-[#5D51FF]">
                                        {useCase.icon}
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{useCase.title}</CardTitle>
                                        <CardDescription className="text-sm mt-1">
                                            {useCase.description}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {useCase.examples.map((example, exampleIndex) => (
                                        <div
                                            key={exampleIndex}
                                            onClick={() => setSelectedExample(example)}
                                            className="p-3 rounded-lg bg-white dark:bg-[#1A1A1A] hover:bg-gray-100 dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-medium text-sm">{example.name}</h4>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        {example.description}
                                                    </p>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-gray-400" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {selectedExample && (
                <ExampleDialog
                    example={selectedExample}
                    isOpen={!!selectedExample}
                    onClose={() => setSelectedExample(null)}
                />
            )}
        </div>
    );
} 