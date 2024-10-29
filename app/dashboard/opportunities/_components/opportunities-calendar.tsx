"use client"

import { useState, useEffect } from 'react'
import { format, startOfWeek, addDays, addMinutes, setHours, setMinutes } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'

interface Opportunity {
    id: string
    companyName: string
    contactName: string
    value: number
    stage: string
    priority: string
    lastUpdated: string
}

interface CalendarEvent extends Opportunity {
    start: Date
    end: Date
}

interface OpportunitiesCalendarProps {
    opportunities: Opportunity[];
    isLoading: boolean;
}

const mockOpportunities: Opportunity[] = [
    { id: '1', companyName: 'TechCorp', contactName: 'John Doe', value: 50000, stage: 'Discovery', priority: 'High', lastUpdated: '2023-05-15' },
    { id: '2', companyName: 'MarketPro', contactName: 'Jane Smith', value: 75000, stage: 'Proposal', priority: 'Medium', lastUpdated: '2023-05-14' },
    { id: '3', companyName: 'DataSys', contactName: 'Bob Johnson', value: 100000, stage: 'Negotiation', priority: 'High', lastUpdated: '2023-05-13' },
    { id: '4', companyName: 'EcomGiant', contactName: 'Alice Brown', value: 200000, stage: 'Closing', priority: 'High', lastUpdated: '2023-05-12' },
    { id: '5', companyName: 'StartupX', contactName: 'Charlie Davis', value: 25000, stage: 'Discovery', priority: 'Low', lastUpdated: '2023-05-11' },
]

const WORK_DAY_START = 9 // 9 AM
const WORK_DAY_END = 17 // 5 PM
const HOURS = Array.from({ length: WORK_DAY_END - WORK_DAY_START }, (_, i) => i + WORK_DAY_START)

export default function OpportunitiesCalendar({ opportunities, isLoading }: OpportunitiesCalendarProps) {
    const [currentWeek, setCurrentWeek] = useState(new Date())
    const [events, setEvents] = useState<CalendarEvent[]>([])

    const weekDays = Array.from({ length: 5 }, (_, i) => addDays(startOfWeek(currentWeek, { weekStartsOn: 1 }), i))

    useEffect(() => {
        const randomEvents = mockOpportunities.map(opp => {
            const randomDay = weekDays[Math.floor(Math.random() * weekDays.length)]
            const randomStartHour = Math.floor(Math.random() * (WORK_DAY_END - WORK_DAY_START)) + WORK_DAY_START
            const randomDuration = Math.floor(Math.random() * 3) + 1 // 1 to 3 hours

            const start = setMinutes(setHours(randomDay, randomStartHour), 0)
            const end = addMinutes(start, randomDuration * 60)

            return { ...opp, start, end }
        })

        // Sort events by start time
        randomEvents.sort((a, b) => a.start.getTime() - b.start.getTime())

        // Adjust overlapping events
        for (let i = 1; i < randomEvents.length; i++) {
            if (randomEvents[i].start < randomEvents[i - 1].end) {
                randomEvents[i].start = new Date(randomEvents[i - 1].end)
                randomEvents[i].end = addMinutes(randomEvents[i].start, 60) // Set to 1 hour duration
            }
        }

        setEvents(randomEvents)
    }, [currentWeek])

    const handlePreviousWeek = () => {
        setCurrentWeek(prevWeek => addDays(prevWeek, -7))
    }

    const handleNextWeek = () => {
        setCurrentWeek(prevWeek => addDays(prevWeek, 7))
    }

    const getEventStyle = (event: CalendarEvent) => {
        const startHour = event.start.getHours() + event.start.getMinutes() / 60
        const endHour = event.end.getHours() + event.end.getMinutes() / 60
        const top = ((startHour - WORK_DAY_START) / (WORK_DAY_END - WORK_DAY_START)) * 100
        const height = ((endHour - startHour) / (WORK_DAY_END - WORK_DAY_START)) * 100

        return {
            top: `${top}%`,
            height: `${height}%`,
        }
    }

    return (
        <div className="bg-background p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Work Week Calendar</h2>
                <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={handlePreviousWeek} aria-label="Previous week">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleNextWeek} aria-label="Next week">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr] gap-1">
                <div className="sticky left-0 bg-background z-10"></div>
                {weekDays.map((day, index) => (
                    <div key={index} className="text-center font-semibold">
                        <div>{format(day, 'EEE')}</div>
                        <div>{format(day, 'MMM d')}</div>
                    </div>
                ))}
                <ScrollArea className="h-[calc(100vh-200px)]">
                    <div className="relative" style={{ height: `${(WORK_DAY_END - WORK_DAY_START) * 60}px` }}>
                        {HOURS.map(hour => (
                            <div key={hour} className="absolute w-full border-t border-gray-200 text-xs text-gray-500" style={{ top: `${(hour - WORK_DAY_START) * 60}px` }}>
                                {format(setHours(new Date(), hour), 'ha')}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                {weekDays.map((day, dayIndex) => (
                    <ScrollArea key={dayIndex} className="h-[calc(100vh-200px)]">
                        <div className="relative" style={{ height: `${(WORK_DAY_END - WORK_DAY_START) * 60}px` }}>
                            {events
                                .filter(event => event.start.getDate() === day.getDate())
                                .map(event => (
                                    <Link
                                        key={event.id}
                                        href={`/dashboard/opportunities/${event.id}`}
                                        className="block"
                                    >
                                        <div
                                            className="absolute left-0 right-0 p-1 text-xs rounded overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                            style={{
                                                ...getEventStyle(event),
                                                backgroundColor: event.priority === 'High' ? 'rgba(239, 68, 68, 0.2)' :
                                                    event.priority === 'Medium' ? 'rgba(245, 158, 11, 0.2)' :
                                                        'rgba(16, 185, 129, 0.2)',
                                                borderLeft: `3px solid ${event.priority === 'High' ? 'rgb(239, 68, 68)' :
                                                    event.priority === 'Medium' ? 'rgb(245, 158, 11)' :
                                                        'rgb(16, 185, 129)'}`,
                                            }}
                                        >
                                            <div className="font-semibold">{event.companyName}</div>
                                            <div>{event.contactName}</div>
                                            <div>${event.value.toLocaleString()}</div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </ScrollArea>
                ))}
            </div>
        </div>
    )
}