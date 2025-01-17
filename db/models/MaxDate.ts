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

const MaxDate = models.MaxDate || model('MaxDate', maxDateSchema);

export default MaxDate;
