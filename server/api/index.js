const router = require("express").Router();

router.get(`/`, (req, res) => {
  res.send(`You have reached the api router`);
});

router.use(`/users`, require(`./users`));
// router.use(`/weeks`, require(`./weeks`));
// router.use(`/days`, require(`./days`));
// router.use(`/exercises`, require(`./exercises`));
// router.use(`/sets`, require(`./sets`));

module.exports = router;
