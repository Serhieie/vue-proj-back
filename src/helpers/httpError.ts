import { CustomError } from '../app';

interface MessageList {
  [key: number]: string;
}

const messageList: MessageList = {
  400: 'Bad Request: The server cannot process the request (invalid request body).',
  401: 'Unauthorized: Access to the requested resource is unauthorized.',
  403: 'Forbidden: The server refuses to authorize the request.',
  404: 'Not Found: The requested resource could not be found on the server.',
  409: 'Conflict: Email already in use.',
};

const httpError = (
  status: number,
  message: string = messageList[status]
): Error => {
  const error: CustomError = new Error(message);
  error.status = status;
  return error;
};

export default httpError;
