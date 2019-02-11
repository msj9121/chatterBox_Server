var express = require("express");
var router = express.Router();
var db = require("../models");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const users = await db.User.findAll({});
  console.log("users-GET");
  res.send(users);
});

router.post("/signup", async (req, res, next) => {
  if (req.body) {
    const userId = req.body.userId;
    const password = req.body.password;
    // const hashPW = await bcrypt.hash(password, 10)
    // console.log("hashPW",hashPW)
    const user = await db.User.findAll({
      where: {
        email: userId
      }
    });

    if (user.length !== 0) {
      console.log("이미 회원이 있습니다.");
      res.send(false);
    } else {
      const user = await db.User.create({
        email: userId,
        password: password
      });
      console.log("회원가입 성공!");
      res.send(true);
    }
  }
});

router.post("/login", async (req, res, next) => {
  if (req.body) {
    const userId = req.body.userId;
    const password = req.body.password;
    // const hashPW = await bcrypt.compare(password, 10)

    const user = await db.User.findAll({
      where: {
        email: userId,
        password: password
      }
    });

    console.log("user", user)

    if (user.length === 0) {
      console.log("회원정보가 일치하지 않습니다.");
      res.send(false);
    } else {
      console.log("회원정보가 확인되었습니다.");
      res.send(JSON.stringify(userId));
    }
  }
});

module.exports = router;
