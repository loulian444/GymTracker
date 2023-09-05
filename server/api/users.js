const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get(`/`, async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        isAdmin: true,
      },
    });

    res.send(allUsers);
  } catch (error) {
    res.send({ error });
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
      select: {
        id: true,
        username: true,
        isAdmin: true,
        weeks: {
          select: {
            week: true,
            days: {
              select: {
                date: true,
                exercises: {
                  select: {
                    name: true,
                    sets: {
                      select: { set: true, weight: true, reps: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    user
      ? res.send(user)
      : res.send({ error: true, message: `User not found` });
  } catch (error) {
    res.send(error);
  }
});

router.put(`/:id`, async (req, res) => {
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    updateUser
      ? res.send(updateUser)
      : res.send({ error: true, message: `User not found` });
  } catch (error) {
    res.send({ error });
  }
});

router.delete(`/:id`, async (req, res) => {
  try {
    const deleteSets = await prisma.set.deleteMany({
      where: {
        exercise: {
          days: {
            some: {
              weeks: {
                some: {
                  userId: Number(req.params.id),
                },
              },
            },
          },
        },
      },
    });

    const deleteWeek = await prisma.week.deleteMany({
      where: {
        userId: Number(req.params.id),
      },
    });

    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    const transaction = await prisma.$transaction([
      deleteSets,
      deleteWeek,
      deleteUser,
    ]);

    transaction
      ? res.send({ message: `User deleted` })
      : res.send({ error: true, message: `User not found` });
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;
