"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const natural_1 = require("natural");
function parseNodes(nodes) {
    const parsedNodes = nodes.map(node => {
        return {
            id: node.id,
            name: node.name,
            mode: node.mode,
            device: node.device,
            type: (() => {
                const words = node.name.split(' ');
                let type = 'device';
                words.forEach(word => {
                    if (/^свет/i.test(word)) {
                        type = 'light';
                    }
                });
                return type;
            })(),
            where: (() => {
                const words = node.name.split(' ');
                let rooms = [];
                words.forEach(word => {
                    if (/^спал/i.test(word) ||
                        /^гост/i.test(word) ||
                        /^ван/i.test(word) ||
                        /^корид/i.test(word) ||
                        /^прихож/i.test(word) ||
                        /^кухн/i.test(word)) {
                        rooms.push(word);
                    }
                });
                return rooms.map(room => {
                    return natural_1.PorterStemmerRu.stem(room);
                });
            })()
        };
    });
    return parsedNodes;
}
exports.parseNodes = parseNodes;
//# sourceMappingURL=sonoff.js.map