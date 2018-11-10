import { HandlerRequest, HandlerResponse } from "../interfaces/Handler";
import { Types } from "../interfaces/CommandTypes";
import HandlerNotFound from "../interfaces/handler/NotFound";

export const handlers: Array<{
  type: Types;
  handler(HandlerRequest): Promise<HandlerResponse>;
}> = [
  {
    type: Types.NotFound,
    handler: async (req: HandlerRequest): Promise<HandlerResponse> => {
      const response = { ...req };
      (<HandlerNotFound>(<HandlerResponse>response).handler) = {
        text: "Command not found"
      };
      return <HandlerResponse>response;
    }
  }
];
