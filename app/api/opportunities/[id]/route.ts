import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const { userId: clerkUserId } = auth();
    if (!clerkUserId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { assigned_sa_id } = await req.json():

        const updatedOpportunity = await prisma.opportunity.update({
            where: { id: params.id },
            data: { assignedSAId: assigned_sa_id },
        });

        return NextResponse.json(updatedOpportunity);
    } catch (error) {
        console.error('Error updating opportunity:', error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    console.log("GET request received for opportunity:", params.id);

    try {
        const { userId: clerkUserId } = auth();
        if (!clerkUserId) {
            console.log("Unauthorized access attempt");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const opportunity = await prisma.opportunity.findUnique({
            where: { id: params.id },
            include: {
                notes: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                email: true,
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                },
                assignedSA: {
                    select: { id: true, email: true, firstName: true, lastName: true }
                },
                createdBy: {
                    select: { id: true, email: true, firstName: true, lastName: true }
                }
            }
        });

        if (!opportunity) {
            console.log("Opportunity not found");
            return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
        }

        const transformedOpportunity = {
            ...opportunity,
            notes: opportunity.notes?.map(note => ({
                ...note,
                authorName: note.author ? `${note.author.firstName || ''} ${note.author.lastName || ''}`.trim() : 'Unknown'
            })) || []
        };

        console.log("Opportunity data retrieved successfully");
        return NextResponse.json(transformedOpportunity);
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// Implement POST, PUT, DELETE handlers here if needed