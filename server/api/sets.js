const router = require("express").Router();
const { requireUser } = require("./utils");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all the sets of an user. ex: api/sets?user=2
router.get(`/`, async (req, res) => {
  try {
    const allSets = await prisma.set.findMany({
      where: {
        exercise: {
          days: {
            some: {
              weeks: {
                some: {
                  userId: Number(req.query.user),
                },
              },
            },
          },
        },
      },
      include: {
        exercise: {
          include: {
            days: {
              include: {
                weeks: true,
              },
            },
          },
        },
      },
    });

    allSets
      ? res.status(200).send(allSets)
      : res.status(400).send({ error: true, message: `Error getting sets` });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Gets a specific set by the id
router.get(`/:id`, requireUser, async (req, res) => {
  try {
    const set = await prisma.set.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        exercise: {
          include: {
            days: {
              include: {
                weeks: true,
              },
            },
          },
        },
      },
    });

    if (req.userId === set.exercise.days[0].weeks[0].userId) {
      set
        ? res.status(200).send(set)
        : res.status(404).send({ error: true, message: `Set not found` });
    } else {
      res
        .status(401)
        .send({ error: true, message: `Not authorized to view set` });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Updates a specific set through the id of the set
router.put(`/:id`, requireUser, async (req, res) => {
  try {
    const selectedSet = await prisma.set.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        exercise: {
          include: {
            days: {
              include: {
                weeks: true,
              },
            },
          },
        },
      },
    });

    if (
      req.userId === selectedSet.exercise.days[0].weeks[0].userId ||
      req.isAdmin
    ) {
      const updateSet = await prisma.set.update({
        where: {
          id: Number(req.params.id),
        },
        data: req.body,
      });

      res.status(200).send({ message: `Set updated`, set: updateSet });
    } else {
      res
        .status(401)
        .send({ error: true, message: `Not authorized to update set` });
    }
  } catch (error) {
    res.status(500).send({ error, message: `Error updating set` });
  }
});

// Deletes a whole set by id if permitted
router.delete(`/:id`, requireUser, async (req, res) => {
  try {
    const selectedSet = await prisma.set.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        exercise: {
          include: {
            days: {
              include: {
                weeks: true,
              },
            },
          },
        },
      },
    });

    if (
      req.userId === selectedSet.exercise.days[0].weeks[0].userId ||
      req.isAdmin
    ) {
      const deleteSet = await prisma.set.delete({
        where: {
          id: Number(req.params.id),
        },
      });

      deleteSet
        ? res.status(200).send({ message: `Set Deleted` })
        : res.status(404).send({ error: true, message: `Set not found` });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
