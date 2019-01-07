import axois from "axios";
import { HandlerRequest, HandlerResponse } from "../interfaces/Handler";
import { Types } from "../interfaces/CommandTypes";
import ParserLight from "../interfaces/parser/Light";
import HandlerLight from "../interfaces/handler/Light";
import { client } from "../lib/mqtt";
import { PorterStemmerRu } from "natural";
import { SonoffNodeInterface } from '../drivers/sonoff';

export const handlers: Array<{
  type: Types;
  handler(HandlerRequest, nodes: SonoffNodeInterface[]): Promise<HandlerResponse>;
}> = [
  {
    type: Types.Light,
    handler: async (req: HandlerRequest, nodes: SonoffNodeInterface[]): Promise<HandlerResponse> => {
      try {
        const devices = [];
        for (let device of nodes) {
          if (device.type === "light") {
            if (
              ((<ParserLight>req.parser.data).where.length > 0 &&
                (<ParserLight>req.parser.data).where.includes(
                  PorterStemmerRu.stem(device.where[0])
                )) ||
              (<ParserLight>req.parser.data).where.length === 0
            ) {
              client.publish(
                "/alisa",
                JSON.stringify({
                  deviceId: device.id,
                  turn:
                    (<ParserLight>req.parser.data).command === "включить"
                      ? "on"
                      : "off"
                })
              );
              devices.push({
                id: device.id,
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
