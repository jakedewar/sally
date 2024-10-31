/*
  Warnings:

  - The primary key for the `Note` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `opportunity_id` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `assigned_sa_id` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `company_name` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `compliance_requirements` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `contact_email` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `contact_name` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_id` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `integration_requirements` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `last_updated` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `next_steps` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `sa_request_notes` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the column `technology_stack` on the `Opportunity` table. All the data in the column will be lost.
  - You are about to drop the `invoices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscriptions_plans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `opportunityId` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Opportunity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactEmail` to the `Opportunity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactName` to the `Opportunity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Opportunity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdated` to the `Opportunity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_opportunity_id_fkey";

-- DropForeignKey
ALTER TABLE "Opportunity" DROP CONSTRAINT "Opportunity_assigned_sa_id_fkey";

-- DropForeignKey
ALTER TABLE "Opportunity" DROP CONSTRAINT "Opportunity_created_by_id_fkey";

-- AlterTable
ALTER TABLE "Note" DROP CONSTRAINT "Note_pkey",
DROP COLUMN "created_at",
DROP COLUMN "opportunity_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "opportunityId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Note_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Note_id_seq";

-- AlterTable
ALTER TABLE "Opportunity" DROP COLUMN "assigned_sa_id",
DROP COLUMN "company_name",
DROP COLUMN "compliance_requirements",
DROP COLUMN "contact_email",
DROP COLUMN "contact_name",
DROP COLUMN "created_at",
DROP COLUMN "created_by_id",
DROP COLUMN "integration_requirements",
DROP COLUMN "last_updated",
DROP COLUMN "next_steps",
DROP COLUMN "sa_request_notes",
DROP COLUMN "technology_stack",
ADD COLUMN     "assignedSAId" TEXT,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "complianceRequirements" TEXT[],
ADD COLUMN     "contactEmail" TEXT NOT NULL,
ADD COLUMN     "contactName" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "integrationRequirements" TEXT[],
ADD COLUMN     "lastUpdated" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nextSteps" TEXT,
ADD COLUMN     "saRequestNotes" TEXT,
ADD COLUMN     "technologyStack" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "profileImageUrl" TEXT,
ADD COLUMN     "stripeUserId" TEXT;

-- DropTable
DROP TABLE "invoices";

-- DropTable
DROP TABLE "payments";

-- DropTable
DROP TABLE "subscriptions";

-- DropTable
DROP TABLE "subscriptions_plans";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stripeId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentTime" TIMESTAMP(3) NOT NULL,
    "currency" TEXT NOT NULL,
    "customerDetails" TEXT,
    "paymentIntent" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stripeSubscriptionId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "defaultPaymentMethodId" TEXT,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "interval" TEXT NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stripeInvoiceId" TEXT NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "amountDue" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_stripeId_key" ON "Payment"("stripeId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_stripeInvoiceId_key" ON "Invoice"("stripeInvoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeUserId_key" ON "User"("stripeUserId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "SubscriptionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_assignedSAId_fkey" FOREIGN KEY ("assignedSAId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
