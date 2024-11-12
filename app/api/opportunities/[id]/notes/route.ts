import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
<<<<<<< HEAD
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { userId } = auth();

=======
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const { userId } = auth();
    
>>>>>>> 31066eb6d481c608ca59397cc5883e01ce9d4bc6
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { content } = await req.json();

        const note = await prisma.note.create({
            data: {
                content,
                author: {
                    connect: {
                        id: userId
                    }
                },
                opportunity: {
                    connect: {
                        id: params.id
                    }
                }
            }
        });

        return NextResponse.json(note);
    } catch (error) {
        console.error('Error creating note:', error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string, noteId: string } }) {
    const { userId: clerkUserId } = auth();
    if (!clerkUserId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { content } = await req.json();

        const updatedNote = await prisma.note.update({
            where: { id: params.noteId },
            data: { content }
        });

        return NextResponse.json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string, noteId: string } }) {
    const { userId: clerkUserId } = auth();
    if (!clerkUserId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.note.delete({
            where: { id: params.noteId }
        });

        return NextResponse.json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error('Error deleting note:', error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}