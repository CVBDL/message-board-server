import { Schema } from 'mongoose';

import { getConnection } from '../../core/db';


const modelName: string = 'photo';

function getSchema(modelName: string): Schema {
  const schema = new Schema({
    base64content: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      enum: [
        'image/png',
        'image/jpeg'
      ],
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
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

/**
 * Define chart model.
 */
export default getConnection().model(modelName, getSchema(modelName));
