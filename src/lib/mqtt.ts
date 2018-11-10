import * as mqtt from "mqtt";

const client = mqtt.connect({
  host: JSON.parse(process.env.BROKER).broker,
  port: JSON.parse(process.env.BROKER).port,
  username: JSON.parse(process.env.BROKER).credentials.user,
  password: JSON.parse(process.env.BROKER).credentials.password
});

client.on("connect", () => {
  console.log("Homebot-alisa: Connection with MQTT broker succeeded");
});

client.on("error", error => {
  console.log("Can't connect " + error);
});

export { client };
