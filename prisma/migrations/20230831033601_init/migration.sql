-- CreateTable
CREATE TABLE "DailyWorkout" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "dateId" INTEGER NOT NULL,

    CONSTRAINT "DailyWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Date" (
    "id" SERIAL NOT NULL,
    "weekId" INTEGER NOT NULL,

    CONSTRAINT "Date_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Week" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Week_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyWorkout_name_key" ON "DailyWorkout"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "DailyWorkout" ADD CONSTRAINT "DailyWorkout_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Date" ADD CONSTRAINT "Date_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Week" ADD CONSTRAINT "Week_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
