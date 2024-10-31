export interface Note {
    id: string;
    content: string;
    createdAt: string;
    authorId: string;
    author: {
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
    };
    authorName?: string;
}

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
    saRequestNotes: string | null;
    technologyStack: string[];
    integrationRequirements: string[];
    complianceRequirements: string[];
    nextSteps: string | null;
    assignedSAId: string | null;
    createdById: string;
    notes: Note[];
    assignedSA: {
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
    } | null;
    createdBy: {
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
    };
}