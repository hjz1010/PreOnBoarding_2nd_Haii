const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const morgan = require("morgan");

const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(router);
  app.use(morgan("combined"));

  // 에러 핸들링 미들웨어 
  app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).json({message: err.message})
  });

  app.get("/ping", function (req, res, next) {
    res.json({ message: "pong" });
  }); 

  return app;
};

module.exports = { createApp };
