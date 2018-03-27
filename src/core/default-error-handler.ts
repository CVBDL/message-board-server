import {
  ClientError,
  ErrorHandler
} from '../middleware/error-handler';


const defaultErrorCode: number = 400;
const defaultErrorMessage: string = 'An error occurred.';

const defaultErrorHandler: ErrorHandler = function(err) {
  const error: ClientError = {
    status: err.status || defaultErrorCode,
    message: err.message || defaultErrorMessage
  };

  return error;
};

export default defaultErrorHandler;
