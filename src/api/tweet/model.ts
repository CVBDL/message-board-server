import { Schema } from 'mongoose';

import { getConnection } from '../../core/db';


const modelName: string = 'tweet';

function getSchema(modelName: string): Schema {
  const schema = new Schema({
    createdAt: {
      type: Date,
      default: Date.now
    },
    entities: {
      media: [getMediaSchema()]
    },
    text: {
      type: String,
      maxlength: 240,
      required: true
    },
    user: {
      email: String,
      name: String,
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }

  }, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  });

  schema.virtual('resourceName').get(() => modelName);

  return schema;
}

function getMediaSchema(): Schema {
  const schema = new Schema({
    type: {
      type: String,
      enum: ['photo'],
      required: true
    }

  }, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  });

  schema.virtual('mediaUrl').get(function() {
    return this._id;
  });

  return schema;
}

/**
 * Define chart model.
 */
export default getConnection().model(modelName, getSchema(modelName));
