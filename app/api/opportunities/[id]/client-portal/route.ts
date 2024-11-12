import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: portalData, error } = await supabase
        .from('opportunity_portal_data')
        .select('*')
        .eq('opportunity_id', params.id)
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(portalData)
} 