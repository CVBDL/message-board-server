import test from 'ava';
import { Error as MongooseError } from 'mongoose';

import { ErrorHandler } from '../middleware/error-handler';
import defaultErrorHandler from './default-error-handler';
import getErrorHandler from './error-handler-factory';
import mongooseErrorHandler from './mongoose-error-handler';


test('should return mongoose error handler', t => {
  // Arrange all necessary preconditions and inputs.
  const err: MongooseError = new MongooseError('');
  const expected: ErrorHandler = mongooseErrorHandler;

  // Act on the object or method under test.
  const result: ErrorHandler = getErrorHandler(err);

  // Assert that the expected results have occurred.
  t.is(expected, result);
});

test('should return default error handler', t => {
  // Arrange all necessary preconditions and inputs.
  const err: Error = new Error('');
  const expected: ErrorHandler = defaultErrorHandler;

  // Act on the object or method under test.
  const result: ErrorHandler = getErrorHandler(err);

  // Assert that the expected results have occurred.
  t.is(expected, result);
});
