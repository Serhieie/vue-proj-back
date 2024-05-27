import { Schema, model, ObjectId } from 'mongoose';

export interface PointDocument extends Document {
  title: string;
  description?: string;
  img?: string;
  coordinates: [number, number];
  owner: Schema.Types.ObjectId;
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const pointSchema = new Schema<PointDocument>(
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
      default: '',
    },
    coordinates: {
      type: [Number],
      required: [true, 'Set coordinates'],
      validate: {
        validator: function (arr: number[]) {
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

// pointSchema.post('save', handleSaveError);
// pointSchema.pre('findOneAndUpdate', setUpdateSetting);
// pointSchema.post('findOneAndUpdate', handleSaveError);

export const Point = model<PointDocument>('point', pointSchema);
