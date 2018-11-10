"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt = require("mqtt");
const client = mqtt.connect({
    host: "m12.cloudmqtt.com",
    port: 11010,
    username: "olcetaiv",
    password: "wvBDfj4Qb8gH"
});
exports.client = client;
client.on("connect", () => {
    console.log("Homebot-alisa: Connection with MQTT broker succeeded");
});
client.on("error", error => {
    console.log("Can't connect " + error);
});
//# sourceMappingURL=mqtt.js.map