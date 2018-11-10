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
const light_1 = require("./parsers/light");
const device_1 = require("./parsers/device");
function matchParsers(text) {
    const parsers = [].concat(device_1.parsers, light_1.parsers);
    for (let [index, parser] of parsers.entries()) {
        if (parser.matcher(text)) {
            return {
                type: parser.type,
                data: parser.value(text)
            };
        }
        else if (index === parsers.length - 1)
            return {
                type: 2 /* NotFound */,
                data: {
                    text
                }
            };
    }
}
function parse(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = req.source_text.toLowerCase();
        const { type, data } = matchParsers(text);
        const response = {
            sender: {
                id: req.sender.id,
                type: req.sender.type
            },
            source_text: req.source_text,
            type: req.type,
            parser: {
                type,
                data
            }
        };
        return response;
    });
}
exports.parse = parse;
//# sourceMappingURL=parser.js.map