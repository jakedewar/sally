import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Add type for the Note
type Note = {
    id: string;
    content: string;
    createdAt: Date;
    authorId: string;
    author?: {
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
    };
};

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const { userId: clerkUserId } = auth();
    if (!clerkUserId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { assigned_sa_id } = await req.json();

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
                        author: true  // This includes all fields by default
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
            notes: opportunity.notes?.map((note: Note) => ({
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

// Add POST handler for creating notes
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { userId: clerkUserId } = auth();
        if (!clerkUserId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { content } = await req.json();
        
        if (!content) {
            return NextResponse.json({ error: "Note content is required" }, { status: 400 });
        }

        const newNote = await prisma.note.create({
            data: {
                content,
                author: clerkUserId,
                opportunityId: params.id
            },
            include: {
                author: true
            }
        });

        // Transform the note to include authorName
        const transformedNote = {
            ...newNote,
            authorName: newNote.author 
                ? `${newNote.author.firstName || ''} ${newNote.author.lastName || ''}`.trim() 
                : 'Unknown'
        };

        return NextResponse.json(transformedNote);
    } catch (error) {
        console.error('Error creating note:', error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// Add DELETE handler
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { userId: clerkUserId } = auth();
        if (!clerkUserId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Delete the opportunity
        await prisma.opportunity.delete({
            where: { id: params.id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting opportunity:', error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// Implement PUT, DELETE handlers here if needed