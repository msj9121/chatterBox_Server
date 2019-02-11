var express = require("express");
var router = express.Router();
var db = require("../models");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const rooms = await db.Room.findAll({});
  console.log("users-GET", rooms);
  res.send(rooms);
});

router.post("/room", (req, res, next) => {
  if (req.body) {
    const roomName = req.body.roomName;
    const roomCtor = req.body.roomCtor;

    db.Room.create({
      roomName: roomName,
      roomCtor: roomCtor
    })
      .then(result => {
        console.log("룸 생성 성공!");
        res.send(true);
      })
      .catch(err => {
        console.log("룸 생성 실패!", err);
        res.send(false);
      });
  }
});

router.delete("/room", async (req, res, next) => {
  if (req.body) {
    const roomName = req.body.roomName;
    const roomCtor = req.body.roomCtor;

    db.Room.destroy({
      where: {
        roomName: roomName,
        roomCtor: roomCtor
      }
    })
      .then(result => {
        console.log("룸 삭제 성공!");
        res.send(true);
      })
      .catch(err => {
        console.log("룸 삭제 실패!", err);
        res.send(false);
      });
  }
});

module.exports = router;
