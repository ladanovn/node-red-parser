export default interface Device {
  devices: Array<{
    id: number;
    type?: string;
    name?: string;
    status?: string;
    where?: Array<string>;
  }>;
}
