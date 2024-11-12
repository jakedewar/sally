import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const portal = await prisma.clientPortal.findFirst({
            where: {
                opportunityId: params.id,
                isActive: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(portal)
    } catch (error) {
        console.error('[PORTAL_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
} 