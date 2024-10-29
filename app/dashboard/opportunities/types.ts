import { Opportunity as PrismaOpportunity } from '@prisma/client'

export interface Opportunity {
    id: string;
    companyName: string;
    contactName: string;
    contactEmail: string;
    value: number;
    stage: string;
    priority: string;
    lastUpdated: string;
    createdAt: string;
    description: string | null;
    assignedSAId: string;
    createdById: string;
}