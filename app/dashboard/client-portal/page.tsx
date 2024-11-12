'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useOpportunities } from '@/lib/hooks/use-opportunities' // Make sure this hook exists
import { Button } from "@/components/ui/button"

// Keep all existing interfaces and constants...

interface Opportunity {
  companyName: string;
  status: string;
  // ... other properties ...
}

export default function ClientPortal() {
  const router = useRouter()
  const { data: opportunities, isLoading: isLoadingOpportunities } = useOpportunities()

  if (isLoadingOpportunities) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-normal mb-6">Client Portal</h1>
        <div>Loading opportunities...</div>
      </div>
    )
  }

  if (!opportunities || opportunities.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-normal mb-6">Client Portal</h1>
        <Card>
          <CardHeader>
            <CardTitle>No Opportunities Found</CardTitle>
            <CardDescription>Create an opportunity to get started with the client portal.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/dashboard/opportunities/new')}>
              Create Opportunity
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-normal mb-6">Select an Opportunity</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {opportunities.map((opportunity) => (
          <Card
            key={opportunity.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push(`/dashboard/client-portal/${opportunity.id}`)}
          >
            <CardHeader>
              <CardTitle>{opportunity.companyName}</CardTitle>
              <CardDescription>{opportunity.stage}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {opportunity.description || 'No description available'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}