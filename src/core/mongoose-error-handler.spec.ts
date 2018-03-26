import test from 'ava';

import { Error as MongooseError } from 'mongoose';

import { MongooseErrorHandler } from './mongoose-error-handler';


test('handle DocumentNotFoundError', async t => {
  // Arrange all necessary preconditions and inputs.
  const errName = 'DocumentNotFoundError';
  const errMsg = `Message: ${errName}`;
  let err = new MongooseError(errMsg);
  err.name = errName;

  const expectedStatus = 400;
  const expectedMessage =
    `Database: Save failed because the document not found. ${errMsg}`;

  // Act on the object or method under test.
  let result = MongooseErrorHandler.handle(err);

  // Assert that the expected results have occurred.
  t.deepEqual(expectedStatus, result.status);
  t.deepEqual(expectedMessage, result.message);
});

test('handle CastError', async t => {
  // Arrange all necessary preconditions and inputs.
  const errName = 'CastError';
  const errMsg = `Message: ${errName}`;
  let err = new MongooseError(errMsg);
  err.name = errName;

  const expectedStatus = 400;
  const expectedMessage =
    `Database: Cast values failed. ${errMsg}`;

  // Act on the object or method under test.
  let result = MongooseErrorHandler.handle(err);

  // Assert that the expected results have occurred.
  t.deepEqual(expectedStatus, result.status);
  t.deepEqual(expectedMessage, result.message);
});

test('handle ValidationError', async t => {
  // Arrange all necessary preconditions and inputs.
  const errName = 'ValidationError';
  const errMsg = `Message: ${errName}`;
  let err = new MongooseError(errMsg);
  err.name = errName;

  const expectedStatus = 400;
  const expectedMessage =
    `Database: Validation failed. ${errMsg}`;

  // Act on the object or method under test.
  let result = MongooseErrorHandler.handle(err);

  // Assert that the expected results have occurred.
  t.deepEqual(expectedStatus, result.status);
  t.deepEqual(expectedMessage, result.message);
});

test('handle ValidatorError', async t => {
  // Arrange all necessary preconditions and inputs.
  const errName = 'ValidatorError';
  const errMsg = `Message: ${errName}`;
  let err = new MongooseError(errMsg);
  err.name = errName;

  const expectedStatus = 400;
  const expectedMessage =
    `Database: Has validator errors. ${errMsg}`;

  // Act on the object or method under test.
  let result = MongooseErrorHandler.handle(err);

  // Assert that the expected results have occurred.
  t.deepEqual(expectedStatus, result.status);
  t.deepEqual(expectedMessage, result.message);
});

test('handle VersionError', async t => {
  // Arrange all necessary preconditions and inputs.
  const errName = 'VersionError';
  const errMsg = `Message: ${errName}`;
  let err = new MongooseError(errMsg);
  err.name = errName;

  const expectedStatus = 400;
  const expectedMessage =
    `Database: Save failed because the document is modified by others. ${errMsg}`;

  // Act on the object or method under test.
  let result = MongooseErrorHandler.handle(err);

  // Assert that the expected results have occurred.
  t.deepEqual(expectedStatus, result.status);
  t.deepEqual(expectedMessage, result.message);
});

test('handle DefaultError', async t => {
  // Arrange all necessary preconditions and inputs.
  const errName = 'DefaultError';
  const errMsg = `Message: ${errName}`;
  let err = new MongooseError(errMsg);
  err.name = errName;

  const expectedStatus = 400;
  const expectedMessage =
    `Database: Error occurred when operating database. ${errMsg}`;

  // Act on the object or method under test.
  let result = MongooseErrorHandler.handle(err);

  // Assert that the expected results have occurred.
  t.deepEqual(expectedStatus, result.status);
  t.deepEqual(expectedMessage, result.message);
});
