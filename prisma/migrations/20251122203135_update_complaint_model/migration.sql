-- DropForeignKey
ALTER TABLE "Complaint" DROP CONSTRAINT "Complaint_topicId_fkey";

-- AlterTable
ALTER TABLE "Complaint" ALTER COLUMN "topicId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
