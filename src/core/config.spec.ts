import test from 'ava';

import { Configuration } from "./config";


test('should be singleton', t => {
  // Arrange all necessary preconditions and inputs.
  const configA: Configuration = Configuration.instance;
  const configB: Configuration = Configuration.instance;

  // Assert that the expected results have occurred.
  t.is(configA, configB);
});

test('should read value from config json file', t => {
  // Arrange all necessary preconditions and inputs.
  const config: Configuration = Configuration.instance;
  const expected: string = 'Message Board Configuration';

  // Act on the object or method under test.
  const result: any = config.read('_name');

  // Assert that the expected results have occurred.
  t.is(expected, result);
});

test('should return undefined when key not exist in json', t => {
  // Arrange all necessary preconditions and inputs.
  const config: Configuration = Configuration.instance;
  const expected: undefined = undefined;

  // Act on the object or method under test.
  const result: any = config.read('NotExistKey');

  // Assert that the expected results have occurred.
  t.is(expected, result);
});
