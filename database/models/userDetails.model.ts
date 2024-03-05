import mongoose, { Schema, Types } from 'mongoose';

interface IUserDetails {
  userId: Types.ObjectId;
  bikeTypeId: Types.ObjectId;
  tagId: Types.ObjectId[];
}

const userDetailsSchema: Schema = new Schema<IUserDetails>({
  userId: { type: Schema.Types.ObjectId, required: true },
  bikeTypeId: { type: Schema.Types.ObjectId, required: true },
  tagId: [{ type: Schema.Types.ObjectId, required: true }],
});

export default mongoose.model<IUserDetails>('UserDetails', userDetailsSchema);
