const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { parse } = require("./parser");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const result = await parse(req.body);
  res.send(result);
});
const httpServer = require("http").createServer(app);

module.exports = httpServer;
