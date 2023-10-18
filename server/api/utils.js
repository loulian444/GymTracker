const requireUser = (req, res, next) => {
  if (req.userId) {
    next();
  } else {
    res.status(401).send({ message: "User unauthorized" });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.userId && req.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Admin unauthorized" });
  }
};

module.exports = {
  requireUser,
  requireAdmin,
};
