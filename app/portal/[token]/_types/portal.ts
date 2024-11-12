export interface Technology {
    name: string;
    category: string;
}

export interface EngagementStage {
    id: string;
    name: string;
    date: string;
    saNote: string;
    prospectFeedback: string;
    status: 'pending' | 'approved' | 'disputed';
}

export interface Portal {
    id: string;
    opportunity: {
        companyName: string;
        description: string;
        technologyStack: string[];
        nextSteps?: string;
    };
    engagementStages?: EngagementStage[];
} 