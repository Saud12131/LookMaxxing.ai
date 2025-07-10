-- CreateEnum
CREATE TYPE "role" AS ENUM ('user', 'assistant');

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "role" "role" NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);
