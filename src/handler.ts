import { HandlerRequest, HandlerResponse } from "./interfaces/Handler";
import { handlers as lightHandlers } from "./handlers/light";
import { handlers as deviceHandlers } from "./handlers/device";
import { handlers as notFoundHandlers } from "./handlers/notFound";

export async function handle(req: HandlerRequest): Promise<HandlerResponse> {
  const handlers = [].concat(lightHandlers, deviceHandlers, notFoundHandlers);
  for (let handler of handlers) {
    if (handler.type === req.parser.type) {
      return await handler.handler(req);
    }
  }
}
