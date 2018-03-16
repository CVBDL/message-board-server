import test from "ava";
import * as TypeMoq from "typemoq";

import { Environment } from "./environment";


const key: string = 'MESSAGE_BOARD_ENV';
const value: string = 'unit test';

test.beforeEach(t => {
  const mock = TypeMoq.GlobalMock.ofInstance(process, 'process', global);
  mock.setup(x => x.env).returns(() => ({ [key]: value }));

  t.context = mock;
});

test('should be singleton', t => {
  const envA: Environment = Environment.instance;
  const envB: Environment = Environment.instance;

  t.is(envA, envB);
});

test('should read value from system variables', t => {
  TypeMoq.GlobalScope.using(t.context as TypeMoq.IGlobalMock<NodeJS.ProcessEnv>).with(() => {
    const env: Environment = Environment.instance;
    const expected: string = value;

    const result = env.read(key);

    t.is(expected, result);
  });
});

test('should return undefined when key not exist in system variables', t => {
  TypeMoq.GlobalScope.using(t.context as TypeMoq.IGlobalMock<NodeJS.ProcessEnv>).with(() => {
    const env: Environment = Environment.instance;
    const expected: undefined = undefined;

    const result: any = env.read('NotExistKey');

    t.is(expected, result);
  });
});