import { User } from "./user.interface";

export interface ServerResponse {
  status: number;
  api_message: string;
  data:        Data;
}

export interface Data {
  user:  User;
  token: string;
}