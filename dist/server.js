var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { parse } = require("./parser");
const { handle } = require("./handler");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let result = yield parse(req.body);
    result = yield handle(result);
    res.send(result);
}));
const httpServer = require("http").createServer(app);
module.exports = httpServer;
//# sourceMappingURL=server.js.map