const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      username: `admin`,
      password: await bcrypt.hash(`admin123`, 10),
      isAdmin: true,
      name: "El Bic Boi",
      birthday: `2023-01-01T00:00:00.000Z`,
      height: 75,
      weight: 180,
    },
  });

  const lou = await prisma.user.create({
    data: {
      username: `lou`,
      password: await bcrypt.hash(`lou123`, 10),
      name: "Loulian Liu",
      birthday: `1997-06-18T00:00:00.000Z`,
      height: 67,
      weight: 172,
      weeks: {
        create: {
          week: 1,
          days: {
            create: {
              date: `2023-07-03T00:00:00.000Z`,
              exercises: {
                create: [
                  {
                    name: `Rope Triceps`,
                    sets: {
                      create: [
                        {
                          set: 1,
                          weight: 42.5,
                          reps: 10,
                        },
                        {
                          set: 2,
                          weight: 42.5,
                          reps: 10,
                        },
                        {
                          set: 3,
                          weight: 42.5,
                          reps: 10,
                        },
                        {
                          set: 4,
                          weight: 42.5,
                          reps: 10,
                        },
                      ],
                    },
                  },
                  {
                    name: `Rope Biceps`,
                    sets: {
                      create: [
                        {
                          set: 1,
                          weight: 57.5,
                          reps: 10,
                        },
                        {
                          set: 2,
                          weight: 57.5,
                          reps: 10,
                        },
                        {
                          set: 3,
                          weight: 57.5,
                          reps: 10,
                        },
                        {
                          set: 4,
                          weight: 57.5,
                          reps: 10,
                        },
                      ],
                    },
                  },
                  {
                    name: `Cable Tricep Overhead`,
                    sets: {
                      create: [
                        {
                          set: 1,
                          weight: 20,
                          reps: 10,
                        },
                        {
                          set: 2,
                          weight: 20,
                          reps: 10,
                        },
                        {
                          set: 3,
                          weight: 20,
                          reps: 10,
                        },
                        {
                          set: 4,
                          weight: 20,
                          reps: 10,
                        },
                      ],
                    },
                  },
                  {
                    name: `Dumbbell Bicep Incline`,
                    sets: {
                      create: [
                        {
                          set: 1,
                          weight: 30,
                          reps: 10,
                        },
                        {
                          set: 2,
                          weight: 30,
                          reps: 10,
                        },
                        {
                          set: 3,
                          weight: 30,
                          reps: 10,
                        },
                        {
                          set: 4,
                          weight: 30,
                          reps: 10,
                        },
                      ],
                    },
                  },
                  {
                    name: `EZ Barbell Skullcrusher`,
                    sets: {
                      create: [
                        {
                          set: 1,
                          weight: 60,
                          reps: 10,
                        },
                        {
                          set: 2,
                          weight: 60,
                          reps: 10,
                        },
                        {
                          set: 3,
                          weight: 60,
                          reps: 10,
                        },
                        {
                          set: 4,
                          weight: 60,
                          reps: 10,
                        },
                      ],
                    },
                  },
                  {
                    name: `Hammer Curl`,
                    sets: {
                      create: [
                        {
                          set: 1,
                          weight: 35,
                          reps: 10,
                        },
                        {
                          set: 2,
                          weight: 35,
                          reps: 10,
                        },
                        {
                          set: 3,
                          weight: 35,
                          reps: 10,
                        },
                        {
                          set: 4,
                          weight: 35,
                          reps: 10,
                        },
                      ],
                    },
                  },
                  {
                    name: `EZ Barbell curl`,
                    sets: {
                      create: [
                        {
                          set: 1,
                          weight: 80,
                          reps: 8,
                        },
                        {
                          set: 2,
                          weight: 80,
                          reps: 8,
                        },
                        {
                          set: 3,
                          weight: 80,
                          reps: 6,
                        },
                        {
                          set: 4,
                          weight: 80,
                          reps: 6,
                        },
                      ],
                    },
                  },
                  {
                    name: `Cable Tripceps Side`,
                    sets: {
                      create: [
                        {
                          set: 1,
                          weight: 20,
                          reps: 10,
                        },
                        {
                          set: 2,
                          weight: 20,
                          reps: 10,
                        },
                        {
                          set: 3,
                          weight: 20,
                          reps: 10,
                        },
                        {
                          set: 4,
                          weight: 20,
                          reps: 10,
                        },
                      ],
                    },
                  },
                  {
                    name: `EZ Bar Cable Triceps`,
                    sets: {
                      create: [
                        {
                          set: 1,
                          weight: 50,
                          reps: 10,
                        },
                        {
                          set: 2,
                          weight: 50,
                          reps: 10,
                        },
                        {
                          set: 3,
                          weight: 50,
                          reps: 10,
                        },
                        {
                          set: 4,
                          weight: 50,
                          reps: 10,
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
    },
  });
}

main()
  .then(async () => {
    console.log(`SEED SUCCESSFUL`);
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
