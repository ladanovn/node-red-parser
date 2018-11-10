const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { parse } = require("./parser");
const { handle } = require("./handler");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  let result = await parse(req.body);
  result = await handle(result);
  res.send(result);
});
const httpServer = require("http").createServer(app);

module.exports = httpServer;
