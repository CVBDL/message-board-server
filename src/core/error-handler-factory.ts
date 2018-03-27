import { Error as MongooseError } from 'mongoose';

import { ErrorHandler } from '../middleware/error-handler';
import { MongooseErrorHandler } from './mongoose-error-handler';
import defaultErrorHandler from "./default-error-handler";


function getErrorHandler(err: any): ErrorHandler {
  let handler: ErrorHandler;

  if (err instanceof MongooseError) {
    handler = MongooseErrorHandler.handle;

  } else {
    handler = defaultErrorHandler;
  }

  return handler;
};

export default getErrorHandler;
