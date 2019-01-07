"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const parser_1 = require("./parser");
const handler_1 = require("./handler");
const TYPE_SRC_NODE = 'Sonoff device';
module.exports = class ReqHandler {
    constructor(RED, currNode) {
        this.RED = RED;
        this.currNode = currNode;
        this.initServer();
        this.initCurrNode();
    }
    listenServer(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.listen(config);
        });
    }
    closeServer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.server.close((err) => console.log(err));
        });
    }
    handleReq(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield parser_1.parse(msg);
            result = yield handler_1.handle(result, this.nodes);
            return result;
        });
    }
    get nodes() {
        const nodeInfoArray = [];
        this.RED.nodes.eachNode(function (node) {
            let nodeInfo = null;
            if (TYPE_SRC_NODE.length == 0 || node.type === TYPE_SRC_NODE) {
                nodeInfo = node;
            }
            if (nodeInfo != null) {
                nodeInfoArray.push(nodeInfo);
            }
        });
        return nodeInfoArray;
    }
    initServer() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body)
                return res.sendStatus(400);
            const result = yield this.handleReq(req.body);
            res.send(result);
        }));
        this.server = http.createServer(this.app);
    }
    initCurrNode() {
        this.currNode.on('input', (msg) => __awaiter(this, void 0, void 0, function* () {
            msg.payload = yield this.handleReq(msg.payload);
            this.currNode.send(msg);
        }));
        this.currNode.close = function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.closeServer();
            });
        }.bind(this);
    }
};
//# sourceMappingURL=ReqHandler.js.map