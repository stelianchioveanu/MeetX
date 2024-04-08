/*
  Warnings:

  - You are about to drop the column `userId` on the `ResetToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `ResetToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `ResetToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResetToken" DROP CONSTRAINT "ResetToken_userId_fkey";

-- DropIndex
DROP INDEX "ResetToken_userId_key";

-- AlterTable
ALTER TABLE "ResetToken" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ResetToken_email_key" ON "ResetToken"("email");

-- AddForeignKey
ALTER TABLE "ResetToken" ADD CONSTRAINT "ResetToken_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
