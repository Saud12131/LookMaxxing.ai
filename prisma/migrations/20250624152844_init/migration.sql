-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "UserPrompt" TEXT NOT NULL,
    "UserImage" TEXT NOT NULL,
    "AiResponse" TEXT NOT NULL,
    "AiImage" TEXT NOT NULL,
    "UserID" TEXT NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "UserID" TEXT NOT NULL,
    "UserBeforeImage" TEXT NOT NULL,
    "UserAfterImage" TEXT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
