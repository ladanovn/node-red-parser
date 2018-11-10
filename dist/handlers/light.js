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
const axios_1 = require("axios");
const mqtt_1 = require("../lib/mqtt");
const natural_1 = require("natural");
exports.handlers = [
    {
        type: 0 /* Light */,
        handler: (req) => __awaiter(this, void 0, void 0, function* () {
            const { server_host, server_port } = JSON.parse(process.env.PARSER_CONFIG);
            const devices = [];
            try {
                const devicesRes = yield axios_1.default.get(`http://${server_host}:${server_port}/api/v1/devices`);
                for (let device of devicesRes.data) {
                    if (device.type === "light") {
                        if ((req.parser.data.where.length > 0 &&
                            req.parser.data.where.includes(natural_1.PorterStemmerRu.stem(device.where))) ||
                            req.parser.data.where.length === 0) {
                            mqtt_1.client.publish("/alisa", JSON.stringify({
                                deviceId: device._id,
                                turn: req.parser.data.command === "включить"
                                    ? "on"
                                    : "off"
                            }));
                            devices.push({
                                id: device._id,
                                type: device.type,
                                name: device.name,
                                where: device.where
                            });
                        }
                    }
                }
                const response = Object.assign({}, req);
                response.handler = {
                    light: devices
                };
                return response;
            }
            catch (err) { }
        })
    }
];
//# sourceMappingURL=light.js.map