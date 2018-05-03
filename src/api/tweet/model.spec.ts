import test from 'ava';

import Tweet from './model';


test('should define model named "tweet"', t => {
  const expectedModelName = 'tweet';

  const tweet = new Tweet({
    text: 'foo'
  });

  t.is(expectedModelName, Tweet.modelName);
});

test('should validate "text" is not empty', async t => {
  const kind = 'required';

  const tweet = new Tweet();
  try {
    await tweet.validate();

    t.fail('should throw exception due to reject promise');

  } catch(e) {
    t.is(kind, e.errors.text.kind);
  }
});

test('should validate "text" is not exceed max length', async t => {
  const kind = 'maxlength';
  const maxlength = 240;
  let text = '';

  let len = maxlength + 1;
  while(len--) {
    text += '_';
  }

  const tweet = new Tweet({
    text: text
  });
  try {
    await tweet.validate();

    t.fail('should throw exception due to reject promise');

  } catch(e) {
    t.is(kind, e.errors.text.kind);
  }
});

test('should validate media "type" is not empty when provided', async t => {
  const kind = 'required';

  const tweet = new Tweet({
    text: 'foo',
    entities: {
      media: [{}]
    }
  });
  try {
    await tweet.validate();

    t.fail('should throw exception due to reject promise');

  } catch(e) {
    t.is(kind, e.errors['entities.media.0.type'].kind);
  }
});

test('should validate "mimeType" enum values', async t => {
  const kind = 'enum';
  const invalidType = 'image';

  const tweet = new Tweet({
    text: 'foo',
    entities: {
      media: [{
        type: invalidType
      }]
    }
  });
  try {
    await tweet.validate();

    t.fail('should throw exception due to reject promise');

  } catch(e) {
    t.is(kind, e.errors['entities.media.0.type'].kind);
  }
});

test('should include virtual fields when call toObject()', t => {
  let tweet = new Tweet({
    text: 'foo',
    entities: {
      media: [{
        type: 'photo'
      }]
    }
  });

  let tweetObject = tweet.toObject();

  t.is('tweet', tweetObject.resourceName);

  tweetObject.entities.media.forEach((media: any) => {
    t.is(media.mediaUrl, media._id.toString());
  });
});
