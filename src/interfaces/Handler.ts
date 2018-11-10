import { ParserResponse } from "./Parser";

import Light from "./handler/Light";
import Device from "./handler/Device";
import NotFound from "./handler/NotFound";

export interface HandlerRequest extends ParserResponse {}

export interface HandlerResponse extends ParserResponse {
  handler: Device | Light | NotFound;
}
