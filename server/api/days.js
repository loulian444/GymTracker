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

// Get a specific day by the id
router.get(`/:id`, requireUser, async (req, res) => {
  try {
    if (req.userId === Number(req.params.id)) {
      const day = await prisma.day.findUnique({
        where: {
          id: Number(req.params.id),
        },
        include: {
          exercises: {
            include: {
              sets: true,
            },
          },
        },
      });

      day
        ? res.status(200).send(day)
        : res.status(404).send({ error: true, message: `Day not found` });
    } else {
      res
        .status(401)
        .send({ error: true, message: `Not authorized to view day` });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Updates a specific day through the id of the day
router.put(`/:id`, requireUser, async (req, res) => {
  try {
    if (req.userId === Number(req.params.id) || req.isAdmin) {
      const updateDay = await prisma.day.update({
        where: {
          id: Number(req.params.id),
        },
        data: req.body,
      });

      res.status(200).send({ message: `Day updated`, day: updateDay });
    } else {
      res
        .status(401)
        .send({ error: true, message: `Not authorized to update day` });
    }
  } catch (error) {
    res.status(500).send({ error, message: `Error updating day` });
  }
});

// Deletes a day with exercises by day id if permitted
router.delete(`/:id`, requireUser, async (req, res) => {
  try {
    if (req.userId === Number(req.params.id) || req.isAdmin) {
      const deleteSets = await prisma.set.deleteMany({
        where: {
          exercise: {
            days: {
              some: {
                id: Number(req.params.id),
              },
            },
          },
        },
      });

      const deleteDay = await prisma.day.delete({
        where: {
          id: Number(req.params.id),
        },
      });

      const transaction = await prisma.$transaction([deleteSets, deleteDay]);

      transaction
        ? res.status(200).send({ message: `Day deleted` })
        : res.status(404).send({ error: true, message: `Day not found` });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
