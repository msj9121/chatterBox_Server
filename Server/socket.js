const express = require("express");
const router = express.Router();
const db = require("./models");
const WebSocket = require("ws");

module.exports = server => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("클라이언트 접속", ip);
    let room = "";
    ws.on("message", message => {
      console.log("클라이언트-message", message);
      room = message;
    });
    ws.on("error", err => {
      console.error(err);
    });
    ws.on("close", () => {
      console.log("클라이언트 접속 해제", ip);
      clearInterval(ws.interval);
    });
    const interval = setInterval(async () => {
      if (ws.readyState === ws.OPEN) {
        const rooms = await db.Room.findAll({});
        const comments = await db.Comment.findAll({
          where: {
            roomName: room
          }
        });
        const posts = {
          rooms,
          comments
        }

        ws.send(JSON.stringify(posts));
      }
    }, 3000);
    ws.interval = interval;
  });
};
