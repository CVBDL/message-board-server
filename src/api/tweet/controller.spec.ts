import test from 'ava';
import { Types } from 'mongoose';

import { Db } from '../../core/db';
import Tweet from './model';
import TweetController from "./controller";


const tweetFixture = {
  "text": "Hello world!",
  "user": {
    "email": "patrick@example.com",
    "name": "Patrick"
  }
};

async function createTweet(doc: any) {
  return await new Tweet(doc).save();
}

test.beforeEach('Reset database to empty', async t => {
  await Tweet.remove({});

  let result = await Tweet.find();

  t.is(0, result.length);
});

test('should list tweets with 0 item', async t => {
  let result = await TweetController.list();

  t.is(0, result.length);
});

test('should list tweets with 1 item', async t => {
  await createTweet(tweetFixture);

  let result = await TweetController.list();

  t.is(1, result.length);
  t.is(tweetFixture.text, result[0].toObject().text);
});

// test('get tweet: empty', async t => {
//   const id = new Types.ObjectId;
//   let result = await TweetController.get(id.toHexString());

//   t.is(null, result);
// });
