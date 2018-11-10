import axois from "axios";
import { HandlerRequest, HandlerResponse } from "../interfaces/Handler";
import { Types } from "../interfaces/CommandTypes";
import HandlerDevice from "../interfaces/handler/Device";

export const handlers: Array<{
  type: Types;
  handler(HandlerRequest): Promise<HandlerResponse>;
}> = [
  {
    type: Types.Device,
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
          devices.push({
            id: device._id,
            type: device.type,
            name: device.name,
            where: device.where
          });
        }

        const response = { ...req };
        (<HandlerDevice>(<HandlerResponse>response).handler) = {
          devices: devices
        };
        return <HandlerResponse>response;
      } catch (err) {}
    }
  }
];
