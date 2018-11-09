export default interface Device {
  text: string;
  command: string;
  name?: string;
  target: string;
  where?: Array<string>;
  type?: string;
}
