const router = require("express").Router();
const { requireUser } = require("./utils");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get the weeks of a user. ex: api/weeks?user=2
router.get(`/`, async (req, res) => {
  try {
    const allWeeks = await prisma.week.findMany({
      where: {
        userId: Number(req.query.user),
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

// Get a specific week by the id
router.get(`/:id`, requireUser, async (req, res) => {
  try {
    const week = await prisma.week.findUnique({
      where: {
        id: Number(req.params.id),
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

    if (req.userId === week.userId) {
      week
        ? res.status(200).send(week)
        : res.status(404).send({ error: true, message: `Week not found` });
    } else {
      res
        .status(401)
        .send({ error: true, message: `Not authorized to view week` });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Updates a specific week through the id of the week
router.put(`/:id`, requireUser, async (req, res) => {
  try {
    const selectedWeek = await prisma.week.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (req.userId === selectedWeek.userId || req.isAdmin) {
      const updateWeek = await prisma.week.update({
        where: {
          id: Number(req.params.id),
        },
        data: req.body,
      });

      res.status(200).send({ message: `Week updated`, week: updateWeek });
    } else {
      res
        .status(401)
        .send({ error: true, message: `Not authorized to update week` });
    }
  } catch (error) {
    res.status(500).send({ error, message: `Error updating week` });
  }
});

// Deletes a whole week with exercises by week id if permitted
router.delete(`/:id`, requireUser, async (req, res) => {
  try {
    const selectedWeek = await prisma.week.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (req.userId === selectedWeek.userId || req.isAdmin) {
      const deleteSets = await prisma.set.deleteMany({
        where: {
          exercise: {
            days: {
              some: {
                weeks: {
                  some: {
                    id: Number(req.params.id),
                  },
                },
              },
            },
          },
        },
      });

      const deleteWeek = await prisma.week.delete({
        where: {
          id: Number(req.params.id),
        },
      });

      const transaction = await prisma.$transaction([deleteSets, deleteWeek]);

      transaction
        ? res.status(200).send({ message: `Week deleted` })
        : res.status(404).send({ error: true, message: `Week not found` });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
