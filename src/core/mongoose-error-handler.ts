import { Error as MongooseError } from 'mongoose';

import {
  ClientError,
  ErrorHandler
} from '../middleware/error-handler';


/**
 * Mongoosejs defined error types.
 * @see {@link http://mongoosejs.com/docs/api.html#Error}
 */
type mongooseErrorTypes = 'DocumentNotFoundError' | 'CastError' |
                          'ValidationError' | 'ValidatorError' |
                          'VersionError';

/**
 * Mongoose error type and error handler mapping.
 */
const handlerMap: { [type in mongooseErrorTypes]: ErrorHandler } = {
  DocumentNotFoundError: documentNotFoundErrorHandler,
  CastError: castErrorHandler,
  ValidationError: validationErrorHandler,
  ValidatorError: validatorErrorHandler,
  VersionError: versionErrorHandler
}

/**
 * Handle mongoose errors.
 * @param err Error object.
 * @returns Client error object.
 */
function mongooseErrorHandler(err: MongooseError): ClientError {
  const errorType: mongooseErrorTypes = err.name as mongooseErrorTypes;
  const handler: ErrorHandler = handlerMap[errorType] || defaultErrorHandler;
  const clientError: ClientError = handler(err);
  return clientError;
}

function documentNotFoundErrorHandler(err: MongooseError): ClientError {
  const message =
    `Database: Save failed because the document not found. ${err.message}`;
  const status = 400;

  return { message, status };
}

function castErrorHandler(err: MongooseError): ClientError {
  const message =
    `Database: Cast values failed. ${err.message}`;
  const status = 400;

  return { message, status };
}

function validationErrorHandler(err: MongooseError): ClientError {
  const message =
    `Database: Validation failed. ${err.message}`;
  const status = 400;

  return { message, status };
}

function validatorErrorHandler(err: MongooseError): ClientError {
  const message =
    `Database: Has validator errors. ${err.message}`;
  const status = 400;

  return { message, status };
}

function versionErrorHandler(err: MongooseError): ClientError {
  const message =
    `Database: Save failed because the document is modified by others. ${err.message}`;
  const status = 400;

  return { message, status };
}

function defaultErrorHandler(err: MongooseError): ClientError {
  const message =
    `Database: Error occurred when operating database. ${err.message}`;
  const status = 400;

  return { message, status };
}

export default mongooseErrorHandler;
