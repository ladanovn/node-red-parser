import * as mqtt from "mqtt";

const client = mqtt.connect({
  host: "m12.cloudmqtt.com",
  port: 11010,
  username: "olcetaiv",
  password: "wvBDfj4Qb8gH"
});

client.on("connect", () => {
  console.log("Homebot-alisa: Connection with MQTT broker succeeded");
});

client.on("error", error => {
  console.log("Can't connect " + error);
});

export { client };
