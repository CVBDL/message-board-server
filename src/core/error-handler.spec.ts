import test from 'ava';

import { Error as MongooseError } from "mongoose";

import { ErrorHandler } from "./error-handler";


test('handle mongoose error', async t => {
  // Arrange all necessary preconditions and inputs.
  let next: () => Promise<any> = async function next() {
    let err = new MongooseError('MongooseError');
    err.name = 'DocumentNotFoundError';
    throw err;
  }
  let ctx: any = {
    app: {
      emit: () => {}
    }
  };

  // Act on the object or method under test.
  await ErrorHandler.handle(ctx, next);

  // Assert that the expected results have occurred.
  t.deepEqual(ctx.body, { message: 'Database: Save failed because the document not found. MongooseError' });
  t.deepEqual(ctx.status, 400);
});

test('handle other error', async t => {
  // Arrange all necessary preconditions and inputs.
  let next: () => Promise<any> = async function next() {
    throw new Error('Error occurred.');
  }
  let ctx: any = {
    app: {
      emit: () => {}
    }
  };

  // Act on the object or method under test.
  await ErrorHandler.handle(ctx, next);

  // Assert that the expected results have occurred.
  t.deepEqual(ctx.body, { message: 'Error occurred' });
  t.deepEqual(ctx.status, 400);
});
