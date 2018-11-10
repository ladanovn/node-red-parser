import axois from "axios";
import { HandlerRequest, HandlerResponse } from "../interfaces/Handler";
import { Types } from "../interfaces/CommandTypes";
import ParserLight from "../interfaces/parser/Light";
import HandlerLight from "../interfaces/handler/Light";
import { client } from "../lib/mqtt";
import { PorterStemmerRu } from "natural";

export const handlers: Array<{
  type: Types;
  handler(HandlerRequest): Promise<HandlerResponse>;
}> = [
  {
    type: Types.Light,
    handler: async (req: HandlerRequest): Promise<HandlerResponse> => {
      const { server_host, server_port } = JSON.parse(
        process.env.PARSER_CONFIG
      );
      const devices = [];
      try {
        const devicesRes = await axois.get(
          `http://${server_host}:${server_port}/api/v1/devices`
        );
        for (let device of devicesRes.data) {
          if (device.type === "light") {
            if (
              ((<ParserLight>req.parser.data).where.length > 0 &&
                (<ParserLight>req.parser.data).where.includes(
                  PorterStemmerRu.stem(device.where)
                )) ||
              (<ParserLight>req.parser.data).where.length === 0
            ) {
              client.publish(
                "/alisa",
                JSON.stringify({
                  deviceId: device._id,
                  turn:
                    (<ParserLight>req.parser.data).command === "включить"
                      ? "on"
                      : "off"
                })
              );
              devices.push({
                id: device._id,
                type: device.type,
                name: device.name,
                where: device.where
              });
            }
          }
        }

        const response = { ...req };
        (<HandlerLight>(<HandlerResponse>response).handler) = {
          light: devices
        };
        return <HandlerResponse>response;
      } catch (err) {}
    }
  }
];
