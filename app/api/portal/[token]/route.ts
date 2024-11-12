import { NextResponse } from 'next/server'
import { getPortalData } from '@/app/portal/[token]/portal-data'

export async function GET(
    request: Request,
    { params }: { params: { token: string } }
) {
    try {
        const portal = await getPortalData(params.token)
        return NextResponse.json(portal)
    } catch (error) {
        return NextResponse.json({ error: 'Portal not found' }, { status: 404 })
    }
} 