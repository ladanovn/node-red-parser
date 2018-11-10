export default interface Light {
  light: Array<{
    id: number;
    type?: string;
    name?: string;
    status?: string;
    where?: Array<string>;
  }>;
}
