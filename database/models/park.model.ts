import mongoose, { Schema } from 'mongoose';

export interface IPark {
  name: string;
}

const parkSchema: Schema = new Schema<IPark>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IPark>('Parks', parkSchema);
