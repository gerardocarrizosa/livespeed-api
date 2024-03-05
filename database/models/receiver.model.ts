import mongoose, { Schema, Types } from 'mongoose';

interface IReceiver {
  type: 'start' | 'checkpoint' | 'finish';
  trackId: Types.ObjectId;
  statusId: Types.ObjectId;
}

const receiverSchema: Schema = new Schema<IReceiver>({
  type: {
    type: String,
    enum: ['start', 'checkpoint', 'finish'],
    required: true,
  },
  trackId: { type: Schema.Types.ObjectId, required: true },
  statusId: { type: Schema.Types.ObjectId, required: true },
});

export default mongoose.model<IReceiver>('Receivers', receiverSchema);
