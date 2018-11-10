"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const natural_1 = require("natural");
exports.parsers = [
    /**
     * Включить свет на кухне
     */
    {
        matcher: (text) => {
            return text.search(/^вкл[а-я]* свет (на|в) [а-я]+.?$/) !== -1;
        },
        value: (text) => {
            const where = text
                .split(" ")
                .slice(-1)[0]
                .replace(".", "");
            return {
                text,
                command: "включить",
                target: "свет",
                where: [natural_1.PorterStemmerRu.stem(where)]
            };
        },
        type: 0 /* Light */
    },
    /**
     * Выключить свет на кухне
     */
    {
        matcher: (text) => {
            return text.search(/^выкл[а-я]* свет (на|в) [а-я]+.?$/) !== -1;
        },
        value: (text) => {
            const where = text
                .split(" ")
                .slice(-1)[0]
                .replace(".", "");
            return {
                text,
                command: "выключить",
                target: "свет",
                where: [natural_1.PorterStemmerRu.stem(where)]
            };
        },
        type: 0 /* Light */
    },
    /**
     * Включить свет
     */
    {
        matcher: (text) => {
            return text.search(/^вкл[а-я]* свет.?$/i) !== -1;
        },
        value: (text) => {
            return {
                text,
                command: "включить",
                target: "свет",
                where: []
            };
        },
        type: 0 /* Light */
    },
    /**
     * Выключить свет
     */
    {
        matcher: (text) => {
            return text.search(/^выкл[а-я]* свет.?$/i) !== -1;
        },
        value: (text) => {
            return {
                text,
                command: "выключить",
                target: "свет",
                where: []
            };
        },
        type: 0 /* Light */
    }
];
//# sourceMappingURL=light.js.map