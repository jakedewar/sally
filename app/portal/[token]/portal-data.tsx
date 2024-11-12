import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function getPortalData(token: string) {
    const portal = await prisma.clientPortal.findUnique({
        where: {
            accessToken: token,
            isActive: true,
        },
        include: {
            opportunity: true,
        }
    })

    if (!portal) {
        redirect('/portal-not-found')
    }

    await prisma.clientPortal.update({
        where: { id: portal.id },
        data: { lastAccessed: new Date() },
    })

    return portal
} 