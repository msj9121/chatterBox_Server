var express = require("express");
var router = express.Router();
var db = require("../models");

/* GET users listing. */
// router.get("/", async (req, res, next) => {
//   const comments = await db.Comment.findAll({});
//   console.log("cooments-GET", comments);
//   res.send(comments);
// });

router.get("/", async (req, res, next) => {
  const room = req.query.room;
  console.log("ROOMNAME", room)
  const comments = await db.Comment.findAll({
    where: {
      roomName: room
    }
  });

  res.send(comments);
});

router.post("/comment", (req, res, next) => {
  if (req.body) {
    const comment = req.body.comment;
    const commenter = req.body.commenter;
    const roomName = req.body.roomName;

    db.Comment.create({
      comment: comment,
      commenter: commenter,
      roomName: roomName
    })
      .then(result => {
        console.log("메시지 추가 성공!");
        res.send(true);
      })
      .catch(err => {
        console.log("메시지 추가 실패!", err);
        res.send(false);
      });
  }
});

module.exports = router;
