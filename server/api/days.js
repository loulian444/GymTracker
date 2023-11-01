const router = require("express").Router();
const { requireUser } = require("./utils");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get the days of a user. ex: api/days?user=2
router.get(`/`, async (req, res) => {
  try {
    const allDays = await prisma.day.findMany({
      where: {
        weeks: {
          some: {
            userId: Number(req.query.user),
          },
        },
      },
      include: {
        exercises: {
          include: {
            sets: true,
          },
        },
      },
    });

    allDays
      ? res.status(200).send(allDays)
      : res.status(400).send({ error: true, message: `Error getting weeks` });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
