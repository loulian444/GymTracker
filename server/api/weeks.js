const router = require("express").Router();
const { requireUser } = require("./utils");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get the weeks of a user
router.get(`/:id`, async (req, res) => {
  try {
    const allWeeks = await prisma.week.findMany({
      where: {
        userId: Number(req.params.id),
      },
      include: {
        days: {
          include: {
            exercises: {
              include: {
                sets: true,
              },
            },
          },
        },
      },
    });

    allWeeks
      ? res.status(200).send(allWeeks)
      : res.status(400).send({ error: true, message: `Error getting weeks` });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
