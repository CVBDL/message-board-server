import test from 'ava';

import Tweet from './model';


test('should define model named "tweet"', t => {
  const expectedModelName = 'tweet';

  t.is(expectedModelName, Tweet.modelName);
});

test('should define mongoose model (1)', t => {
  try {
    new Tweet();
    t.pass();

  } catch(e) {
    t.fail();
  }
});

test('should define mongoose model (2)', t => {
  t.is('function', typeof Tweet.find);
});
