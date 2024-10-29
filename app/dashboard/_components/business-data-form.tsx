'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
    businessName: z.string().min(2, {
        message: "Business name must be at least 2 characters.",
    }),
    industry: z.string({
        required_error: "Please select an industry.",
    }),
    websiteUrl: z.string().url({
        message: "Please enter a valid URL.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }).max(500, {
        message: "Description must not exceed 500 characters.",
    }),
    metricType: z.string({
        required_error: "Please select a metric type.",
    }),
    customMetricDescription: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const defaultValues: FormData = {
    businessName: "",
    industry: "",
    websiteUrl: "",
    description: "",
    metricType: "",
    customMetricDescription: "",
}

export default function BusinessDataForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const handleFormSubmit = (data: FormData) => {
        setIsSubmitting(true)
        console.log(data)
        onSubmit(data)
        setTimeout(() => {
            setIsSubmitting(false)
            form.reset(defaultValues)
        }, 2000)
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Please provide details about your business</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="businessName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Acme Inc." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="industry"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Industry</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an industry" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                                            <SelectItem value="saas">SaaS</SelectItem>
                                            <SelectItem value="finance">Finance</SelectItem>
                                            <SelectItem value="healthcare">Healthcare</SelectItem>
                                            <SelectItem value="education">Education</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="websiteUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website URL</FormLabel>
                                    <FormControl>
                                        <Input type="url" placeholder="https://www.example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Briefly describe your business..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Provide a brief description of your target business (10-500 characters).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="metricType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Metric Type</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a metric type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="viewed_product">Viewed Product</SelectItem>
                                            <SelectItem value="added_to_cart">Added to Cart</SelectItem>
                                            <SelectItem value="checkout_started">Checkout Started</SelectItem>
                                            <SelectItem value="other">Other (Custom)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {form.watch('metricType') === 'other' && (
                            <FormField
                                control={form.control}
                                name="customMetricDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Custom Metric Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe your custom metric..."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                    onClick={form.handleSubmit(handleFormSubmit)}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </CardFooter>
        </Card>
    )
}