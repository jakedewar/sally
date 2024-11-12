-- CreateTable
CREATE TABLE "OpportunityPortalData" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "integrationProgress" JSONB,
    "engagementStages" JSONB,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "accessToken" TEXT,
    "lastAccessed" TIMESTAMP(3),

    CONSTRAINT "OpportunityPortalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientPortal" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastAccessed" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,

    CONSTRAINT "ClientPortal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OpportunityPortalData_opportunityId_key" ON "OpportunityPortalData"("opportunityId");

-- CreateIndex
CREATE UNIQUE INDEX "OpportunityPortalData_accessToken_key" ON "OpportunityPortalData"("accessToken");

-- CreateIndex
CREATE INDEX "OpportunityPortalData_opportunityId_idx" ON "OpportunityPortalData"("opportunityId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientPortal_accessToken_key" ON "ClientPortal"("accessToken");

-- CreateIndex
CREATE INDEX "ClientPortal_opportunityId_idx" ON "ClientPortal"("opportunityId");

-- CreateIndex
CREATE INDEX "ClientPortal_createdById_idx" ON "ClientPortal"("createdById");

-- CreateIndex
CREATE INDEX "Opportunity_assignedSAId_idx" ON "Opportunity"("assignedSAId");

-- CreateIndex
CREATE INDEX "Opportunity_createdById_idx" ON "Opportunity"("createdById");

-- AddForeignKey
ALTER TABLE "OpportunityPortalData" ADD CONSTRAINT "OpportunityPortalData_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientPortal" ADD CONSTRAINT "ClientPortal_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientPortal" ADD CONSTRAINT "ClientPortal_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
