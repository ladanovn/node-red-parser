import Device from "../interfaces/parser/Device";
import { Types } from "../interfaces/CommandTypes";

export const parsers: Array<{
  matcher: (text: string) => boolean;
  value: (text: string) => Device;
  type: Types;
}> = [
  {
    matcher: (text: string) => {
      return (
        text.search(/^пока[а-я]* устройств[а-я]+.?$/) !== -1 ||
        text.search(/^пока[а-я]* девайс[а-я]+.?$/) !== -1
      );
    },
    value: (text: string) => {
      return {
        text,
        command: "показать",
        target: "устройства"
      };
    },
    type: Types.Device
  }
];
