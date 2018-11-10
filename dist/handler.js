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
const light_1 = require("./handlers/light");
const device_1 = require("./handlers/device");
const notFound_1 = require("./handlers/notFound");
function handle(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const handlers = [].concat(light_1.handlers, device_1.handlers, notFound_1.handlers);
        for (let handler of handlers) {
            if (handler.type === req.parser.type) {
                return yield handler.handler(req);
            }
        }
    });
}
exports.handle = handle;
//# sourceMappingURL=handler.js.map