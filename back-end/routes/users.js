const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { user } = new PrismaClient();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const saltRounds = process.env.SALT;

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

    return "successfully registerd";
  } catch (err) {
    res.render(err);
  }
});

// USER SIGN IN

router.get("/", async (req, res) => {
  const { username, pwd } = req.query;

  try {
    const userData = await user.findUnique({
      rejectOnNotFound: true,
      where: {
        username: username,
      },
    });
    console.log(bcrypt.compareSync(pwd, userData.password));

    if (bcrypt.compareSync(pwd, userData.password)) {
      const frontEndUsrData = {
        firstName: userData.first_name,
        lastName: userData.last_name,
        username: userData.username,
      };
      return res.send(frontEndUsrData);
    }

    res.send("Incorrect password");
  } catch (err) {
    res.send("No user found");
  }
});

module.exports = router;
