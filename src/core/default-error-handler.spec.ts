import test from 'ava';

import { Error as MongooseError } from 'mongoose';

import {
  ClientError,
  ErrorHandler
} from '../middleware/error-handler';
import defaultErrorHandler from './default-error-handler';


test('should return error with default settings', t => {
  // Arrange all necessary preconditions and inputs.
  const err: Error = new Error('');
  const expected: ClientError = {
    status: 400,
    message: 'An error occurred.'
  };

  // Act on the object or method under test.
  const result: ClientError = defaultErrorHandler(err);

  // Assert that the expected results have occurred.
  t.deepEqual(expected, result);
});

test('should return error with custom settings', t => {
  // Arrange all necessary preconditions and inputs.
  const customErrorMessage: string = 'Custom error message.';
  const customErrorCode: number = 500;
  const err: Error = new Error(customErrorMessage);
  (err as any).status = customErrorCode;
  const expected: ClientError = {
    status: customErrorCode,
    message: customErrorMessage
  };

  // Act on the object or method under test.
  const result: ClientError = defaultErrorHandler(err);

  // Assert that the expected results have occurred.
  t.deepEqual(expected, result);
});
