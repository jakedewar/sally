/*
  Warnings:

  - You are about to drop the `opportunities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_opportunityId_fkey";

-- DropForeignKey
ALTER TABLE "opportunities" DROP CONSTRAINT "opportunities_assigned_sa_id_fkey";

-- DropForeignKey
ALTER TABLE "opportunities" DROP CONSTRAINT "opportunities_created_by_id_fkey";

-- DropIndex
DROP INDEX "Subscription_userId_key";

-- DropTable
DROP TABLE "opportunities";

-- CreateTable
CREATE TABLE "Opportunity" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "stage" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "saRequestNotes" TEXT,
    "technologyStack" TEXT[],
    "integrationRequirements" TEXT[],
    "complianceRequirements" TEXT[],
    "nextSteps" TEXT,
    "assignedSAId" TEXT,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_assignedSAId_fkey" FOREIGN KEY ("assignedSAId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
