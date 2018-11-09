import { Types } from "./commands";

import Light from "./commands/Light";
import Device from "./commands/Device";
import NotFound from "./commands/NotFound";

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
