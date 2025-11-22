/*
  Warnings:

  - You are about to drop the column `complaintId` on the `Topic` table. All the data in the column will be lost.
  - Added the required column `topicId` to the `Complaint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Complaint" ADD COLUMN     "topicId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "complaintId";

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
