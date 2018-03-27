import { Error as MongooseError } from 'mongoose';

import {
  ClientError,
  ErrorHandler
} from '../middleware/error-handler';
import { MongooseErrorHandler } from './mongoose-error-handler';


function getErrorHandler(err: any): ErrorHandler {
  let handler: ErrorHandler;

  if (err instanceof MongooseError) {
    handler = MongooseErrorHandler.handle;

  } else {
    handler = defaultErrorHandler;
  }

  return handler;
};

function defaultErrorHandler(err: Error): ClientError {
  return {
    status: (err as any).status || 400,
    message: err.message || 'Error occurred.'
  }
}

export default getErrorHandler;
