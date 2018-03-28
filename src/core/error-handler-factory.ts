import { Error as MongooseError } from 'mongoose';

import { ErrorHandler } from '../middleware/error-handler';
import defaultErrorHandler from "./default-error-handler";
import mongooseErrorHandler from './mongoose-error-handler';


/**
 * Look up the proper error handler.
 * @param err Error object.
 * @returns Error handler function.
 */
function getErrorHandler(err: any): ErrorHandler {
  if (err instanceof MongooseError) {
    return mongooseErrorHandler;
  }

  return defaultErrorHandler;
};

export default getErrorHandler;
