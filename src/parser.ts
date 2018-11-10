import { ParserRequest, ParserResponse } from "./interfaces/Parser";
import { Light, Device, NotFound } from "./interfaces/parser/index";
import { Types } from "./interfaces/CommandTypes";

import { parsers as lightParsers } from "./parsers/light";
import { parsers as deviceParsers } from "./parsers/device";

function matchParsers(
  text
): {
  type: Types;
  data: Light | Device | NotFound;
} {
  const parsers = [].concat(deviceParsers, lightParsers);
  for (let [index, parser] of parsers.entries()) {
    if (parser.matcher(text)) {
      return {
        type: parser.type,
        data: parser.value(text)
      };
    } else if (index === parsers.length - 1)
      return {
        type: Types.NotFound,
        data: {
          text
        }
      };
  }
}

export async function parse(req: ParserRequest): Promise<ParserResponse> {
  const text = req.source_text.toLowerCase();
  const { type, data } = matchParsers(text);
  const response = {
    sender: {
      id: req.sender.id,
      type: req.sender.type
    },
    source_text: req.source_text,
    type: req.type,
    parser: {
      type,
      data
    }
  };
  return response;
}
