import mongoose, { Schema, Types } from 'mongoose';
import { TagType } from './tagType.model';

export interface ITag {
  _id?: string;
  identifier: string;
  tagTypeId: Types.ObjectId;
  createdAt?: string;
}

// export interface Tag {
//   id: string;
//   identifier: string;
//   tagTypeId: TagType;
//   createdAt: string;
// }

const tagsSchema: Schema = new Schema<ITag>(
  {
    identifier: { type: String, required: true },
    tagTypeId: { type: Schema.Types.ObjectId, required: true, ref: 'TagTypes' },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<ITag>('Tags', tagsSchema);
