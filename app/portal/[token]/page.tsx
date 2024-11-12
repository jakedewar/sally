'use client'

import { useState, useEffect } from 'react'
import { PortalHeader } from './_components/portal-header'
import { PortalSidebar } from './_components/portal-sidebar'
import { OverviewTab } from './_components/tabs/overview-tab'
import { ChecklistTab } from './_components/tabs/checklist-tab'
import { CommunicationTab } from './_components/tabs/communication-tab'
import { ApiTestingTab } from './_components/tabs/api-testing-tab'
import { ResourcesTab } from './_components/tabs/resources-tab'
import { Portal } from './_types/portal'

export default function PublicPortalPage({
    params
}: {
    params: { token: string }
}) {
    const [activeTab, setActiveTab] = useState('overview')
    const [portalData, setPortalData] = useState<Portal | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/portal/${params.token}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch portal data')
                }
                const data = await response.json()
                setPortalData(data)
            } catch (error) {
                console.error('Error fetching portal data:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [params.token])

    if (isLoading || !portalData) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    return (
        <>
            <PortalHeader portalData={portalData} setActiveTab={setActiveTab} />

            <div className="flex flex-1">
                <PortalSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                <main className="flex-1 overflow-y-auto">
                    {activeTab === 'overview' && <OverviewTab portalData={portalData} />}
                    {activeTab === 'checklist' && <ChecklistTab />}
                    {activeTab === 'communication' && <CommunicationTab />}
                    {activeTab === 'api-testing' && <ApiTestingTab portalData={portalData} />}
                    {activeTab === 'resources' && <ResourcesTab />}
                </main>
            </div>
        </>
    )
} 