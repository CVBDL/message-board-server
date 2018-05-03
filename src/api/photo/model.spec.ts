import test from 'ava';
import { Model, model } from 'mongoose';

import Photo from './model';
import * as util from 'util';


test('should define model named "photo"', t => {
  const expectedModelName = 'photo';

  t.is(expectedModelName, Photo.modelName);
});

test('should validate required fields', async t => {
  const kind = 'required';
  const requiredFields = [
    'base64content',
    'mimeType',
    'size'
  ];

  const photo = new Photo();
  try {
    await photo.validate();

    t.fail('should throw exception due to reject promise');

  } catch(e) {
    requiredFields.forEach(field => {
      t.is(kind, e.errors[field].kind);
    });
  }
});

test('should validate "mimeType" enum values', async t => {
  const kind = 'enum';
  const invalidMimeType = 'text/plain';

  const photo = new Photo({
    mimeType: invalidMimeType,
    base64content: 'foo',
    size: 1
  });
  try {
    await photo.validate();

    t.fail('should throw exception due to reject promise');

  } catch(e) {
    t.is(kind, e.errors.mimeType.kind);
  }
});

test('should include virtual fields when call toObject()', t => {
  let photo = new Photo({
    base64content: 'foo',
    mimeType: 'image/png',
    size: 1
  });

  let photoObject = photo.toObject();

  t.is('photo', photoObject.resourceName);
});
