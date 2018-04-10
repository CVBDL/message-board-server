import test from 'ava';

import { getConfig } from './config';


test('should read value from config json file', t => {
  // Arrange all necessary preconditions and inputs.
  const expected: string = 'Message Board Configuration';

  // Act on the object or method under test.
  const result: any = getConfig('_name');

  // Assert that the expected results have occurred.
  t.is(expected, result);
});

test('should return undefined when key not exist in json', t => {
  // Arrange all necessary preconditions and inputs.
  const expected: undefined = undefined;

  // Act on the object or method under test.
  const result: any = getConfig('NotExistKey');

  // Assert that the expected results have occurred.
  t.is(expected, result);
});
