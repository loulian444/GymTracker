const router = require("express").Router();
const { requireUser } = require("./utils");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all users
router.get(`/`, async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        isAdmin: true,
        name: true,
        birthday: true,
        height: true,
        weight: true,
      },
    });

    allUsers
      ? res.status(200).send(allUsers)
      : res.status(400).send({ error: true, message: `Error getting users` });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Get user by a specific id. Shows password if the user searched is the same as current user
router.get(`/:id`, requireUser, async (req, res) => {
  try {
    if (req.userId === Number(req.params.id)) {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });

      user
        ? res.status(200).send(user)
        : res.status(404).send({ error: true, message: `User not found` });
    } else {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(req.params.id),
        },
        select: {
          id: true,
          username: true,
          isAdmin: true,
          name: true,
          birthday: true,
          height: true,
          weight: true,
        },
      });

      user
        ? res.status(200).send(user)
        : res.status(404).send({ error: true, message: `User not found` });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Updates user by id if permitted
router.put(`/:id`, requireUser, async (req, res) => {
  try {
    if (req.userId === Number(req.params.id) || req.isAdmin) {
      const updateUser = await prisma.user.update({
        where: {
          id: Number(req.params.id),
        },
        data: req.body,
      });

      res.status(200).send({ message: `User updated`, user: updateUser });
    } else {
      res
        .status(401)
        .send({ error: true, message: `Not authorized to update user` });
    }
  } catch (error) {
    res.status(500).send({ error, message: `Error updating user` });
  }
});

// Deletes user by id and all information realted to user if permitted
router.delete(`/:id`, requireUser, async (req, res) => {
  try {
    if (req.userId === Number(req.params.id) || req.isAdmin) {
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
        ? res.status(200).send({ message: `User deleted` })
        : res.status(404).send({ error: true, message: `User not found` });
    } else {
      res
        .status(401)
        .send({ error: true, message: `Not authorized to delete user` });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
