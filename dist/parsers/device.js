"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsers = [
    {
        matcher: (text) => {
            return (text.search(/^пока[а-я]* устройств[а-я]+.?$/) !== -1 ||
                text.search(/^пока[а-я]* девайс[а-я]+.?$/) !== -1);
        },
        value: (text) => {
            return {
                text,
                command: "показать",
                target: "устройства"
            };
        },
        type: 1 /* Device */
    }
];
//# sourceMappingURL=device.js.map