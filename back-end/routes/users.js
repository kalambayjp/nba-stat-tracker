const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { user } = new PrismaClient();

// REGISTER NEW USER

router.post("/", async (req, res) => {
  const { firstName, lastName, username, password } = req.query;

  try {
    const userData = await user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password,
      },
    });

    res.json(userData);
  } catch (err) {
    res.render(err);
  }
});

// USER SIGN IN

router.get("/", async (req, res) => {
  const { username, password } = req.query;

  try {
    const userData = await user.findUnique({
      rejectOnNotFound: true,
      where: {
        username: username,
      },
    });

    if (userData.password === password) {
      res.json(userData);
    }

    res.send("Incorrect password, please try again. ");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
