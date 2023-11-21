const router = require("express").Router();
const { requireUser, requireAdmin } = require("./utils");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get the list of all exercises
router.get(`/`, async (req, res) => {
  try {
    const allExercises = await prisma.exercise.findMany();

    allExercises
      ? res.status(200).send(allExercises)
      : res
          .status(400)
          .send({ error: true, message: `Error getting exercises` });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Get a specific exercise by the id
router.get(`/:id`, async (req, res) => {
  try {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    exercise
      ? res.status(200).send(exercise)
      : res.status(404).send({ error: true, message: `Exercise not found` });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Creates a new exercise if it doesn't exist already
router.post(`/`, requireUser, async (req, res) => {
  try {
    const allExercises = await prisma.exercise.findMany();
    const allExerciseNames = allExercises.map((exercise) => exercise.name);

    if (allExerciseNames.includes(req.body.name)) {
      res.status(400).send({ message: `Exercise already exists` });
    } else {
      const newExercise = await prisma.exercise.create({
        data: req.body,
      });

      res
        .status(200)
        .send({ message: `Exercise created`, exercise: newExercise });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Deletes an exercise by id and all related sets if user is admin
router.delete(`/:id`, requireAdmin, async (req, res) => {
  try {
    const deleteSets = await prisma.set.deleteMany({
      where: {
        exerciseId: Number(req.params.id),
      },
    });

    const deleteExercise = await prisma.exercise.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    const transaction = await prisma.$transaction([deleteSets, deleteExercise]);

    transaction
      ? res.status(200).send({ message: `Exercise deleted` })
      : res.status(404).send({ error: true, message: `Exercise not found` });

    // deleteExercise ? res.send({ message: `Exercise Deleted` }) : res.send({ message: `Exercise Not Deleted` })

    // res.send({id: req.params.id})
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
