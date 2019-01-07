import { HandlerRequest, HandlerResponse } from "../interfaces/Handler";
import { Types } from "../interfaces/CommandTypes";
import HandlerDevice from "../interfaces/handler/Device";
import { SonoffNodeInterface } from '../drivers/sonoff'

export const handlers: Array<{
  type: Types;
  handler(HandlerRequest, nodes: SonoffNodeInterface[]): Promise<HandlerResponse>;
}> = [
  {
    type: Types.Device,
    handler: async (req: HandlerRequest, nodes: SonoffNodeInterface[]): Promise<HandlerResponse> => {
      try {
        const response = { ...req };
        (<HandlerDevice>(<HandlerResponse>response).handler) = {
          devices: nodes
        };
        return <HandlerResponse>response;
      } catch (err) {}
    }
  }
];
