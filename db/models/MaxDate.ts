import { Schema, model, models } from 'mongoose';

const maxDateSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
  },
  { versionKey: false, timestamps: true, collection: 'maxdate' },
);

export const MaxDate = models.MaxDate || model('MaxDate', maxDateSchema);
