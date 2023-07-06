import { Match, Stadium } from '../models';

export interface IServiceResponse {
  status: number;
  data: string | object;
}

export interface IMatchMessage {
  senderId: number;
  matchId: number;
  message: string;
}

export interface IResponseProps {
  status: number;
  data: {
    message?: string | object;
    newMessage?: object;
    messages?: object[];
    updatedMessage?: object;
    match?: object;
  };
}
export interface matchesInterface {
  status: number;
  data: (Match & { Stadium?: Stadium })[] | string;
}
