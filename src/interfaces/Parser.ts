import { Types } from "./CommandTypes";

import Light from "./parser/Light";
import Device from "./parser/Device";
import NotFound from "./parser/NotFound";

export interface ParserRequest {
  sender: {
    id?: string;
    type: string;
  };
  source_text: string;
  type?: string;
  cd?: object;
}

export interface ParserResponse {
  sender: {
    id?: string;
    type: string;
  };
  source_text: string;
  type?: string;
  parser: {
    type: Types;
    data: Light | Device | NotFound;
  };
  cd?: object;
}
