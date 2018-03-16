import { Schema } from 'mongoose';

import { Db } from '../../core/db';


const modelName: string = 'tweet';

function getSchema(modelName: string): Schema {
  const schema = new Schema({
    createdAt: {
      type: Date,
      default: Date.now
    },
    entities: {
      media:[{
        type: {
          type: String,
          enum: ['photo'],
          required: true
        },
        mediaUrl: String
      }]
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

/**
 * Define chart model.
 */
export default Db.instance.getConnection().model(modelName, getSchema(modelName));
