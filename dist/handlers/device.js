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
exports.handlers = [
    {
        type: 1 /* Device */,
        handler: (req) => __awaiter(this, void 0, void 0, function* () {
            const { server_host, server_port } = JSON.parse(process.env.PARSER_CONFIG);
            const devices = [];
            try {
                const devicesRes = yield axios_1.default.get(`http://${server_host}:${server_port}/api/v1/devices`);
                for (let device of devicesRes.data) {
                    devices.push({
                        id: device._id,
                        type: device.type,
                        name: device.name,
                        where: device.where
                    });
                }
                const response = Object.assign({}, req);
                response.handler = {
                    devices: devices
                };
                return response;
            }
            catch (err) { }
        })
    }
];
//# sourceMappingURL=device.js.map