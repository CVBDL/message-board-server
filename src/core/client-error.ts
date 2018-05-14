export default interface ClientError {
  status: number;
  message: string;
  errors?: any[];
}
