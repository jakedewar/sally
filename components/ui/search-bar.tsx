"use client"

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

interface SearchBarProps {
    onSearch: (query: string) => void
    placeholder?: string
    value?: string
}

export default function SearchBar({ onSearch, placeholder = "Search...", value }: SearchBarProps) {
    const [query, setQuery] = useState(value || '')

    useEffect(() => {
        if (value !== undefined) {
            setQuery(value)
        }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value
        setQuery(newQuery)
        onSearch(newQuery)
    }

    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2 bg-background border-input focus:bg-background"
            />
        </div>
    )
}