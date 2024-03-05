import mongoose, { Schema } from 'mongoose';

export interface TagType {
  id: string;
  name: string;
  createdAt: string;
}

export interface ITagType {
  _id?: string;
  name: string;
}

const tagTypesSchema: Schema = new Schema<ITagType>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<ITagType>('TagTypes', tagTypesSchema);
