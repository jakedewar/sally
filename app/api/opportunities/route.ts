// app/api/opportunities/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Initialize Supabase client with environment variables
export async function POST(req: NextRequest) {
    const { userId: clerkUserId } = auth();
    if (!clerkUserId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const opportunity = await req.json();
        console.log("Received opportunity data:", opportunity);

        // Check if the user exists in the database
        const user = await prisma.user.findUnique({
            where: { id: clerkUserId },
        });

        if (!user) {
            // If the user doesn't exist, create a new user record
            await prisma.user.create({
                data: {
                    id: clerkUserId,
                    email: "placeholder@example.com", // You may want to fetch this from Clerk
                    // Add other required fields here
                },
            });
        }

        const createdOpportunity = await prisma.opportunity.create({
            data: {
                companyName: opportunity.companyName,
                contactName: opportunity.contactName,
                contactEmail: opportunity.contactEmail,
                value: parseFloat(opportunity.value.toString()),
                stage: opportunity.stage,
                priority: opportunity.priority,
                lastUpdated: new Date(),
                description: opportunity.description || null,
                saRequestNotes: opportunity.saRequestNotes || null,
                technologyStack: opportunity.technologyStack || [],
                integrationRequirements: opportunity.integrationRequirements || [],
                complianceRequirements: opportunity.complianceRequirements || [],
                nextSteps: opportunity.nextSteps || null,
                assignedSA: { connect: { id: clerkUserId } },
                createdBy: { connect: { id: clerkUserId } },
            }
        });

        return NextResponse.json(createdOpportunity);
    } catch (error: unknown) {
        console.error('Error creating opportunity:', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: "An unexpected error occurred", details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET() {
    try {
        const { userId: clerkUserId } = auth();
        if (!clerkUserId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const opportunities = await prisma.opportunity.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(opportunities);
    } catch (error) {
        console.error('Error fetching opportunities:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
