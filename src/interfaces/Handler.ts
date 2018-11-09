import { ParserResponse } from "./Parser";

export interface HandlerRequest extends ParserResponse {}

export interface HandlerResponse extends ParserResponse {
  handler: {};
}
