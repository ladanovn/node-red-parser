export default interface Device {
  devices: Array<{
    id: string;
    type?: string;
    name?: string;
    status?: string;
    where?: Array<string>;
  }>;
}
