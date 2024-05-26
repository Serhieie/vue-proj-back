import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSetting } from './hooks.js';

const pointSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set title for column'],
    },
    description: {
      type: String,
    },
    img: {
      type: String,
    },
    coordinates: {
      type: [Number],
      required: [true, 'Set coordinates'],
      validate: {
        validator: function (arr) {
          return arr.length === 2;
        },
        message:
          'Coordinates must contain exactly 2 numbers (latitude and longitude)',
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

pointSchema.post('save', handleSaveError);
pointSchema.pre('findOneAndUpdate', setUpdateSetting);
pointSchema.post('findOneAndUpdate', handleSaveError);

const Point = model('point', pointSchema);

export default Point;
