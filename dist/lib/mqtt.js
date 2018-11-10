"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt = require("mqtt");
const client = mqtt.connect({
    host: JSON.parse(process.env.BROKER).broker,
    port: JSON.parse(process.env.BROKER).port,
    username: JSON.parse(process.env.BROKER).credentials.user,
    password: JSON.parse(process.env.BROKER).credentials.password
});
exports.client = client;
client.on("connect", () => {
    console.log("Homebot-alisa: Connection with MQTT broker succeeded");
});
client.on("error", error => {
    console.log("Can't connect " + error);
});
//# sourceMappingURL=mqtt.js.map