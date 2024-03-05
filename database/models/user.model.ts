import mongoose, { Schema } from 'mongoose';

export interface IUsers {
  _id?: any;
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: Date;
  type: 'admin' | 'vendor' | 'user';
}

const usersSchema: Schema = new Schema<IUsers>(
  {
    uid: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dob: { type: Date, required: true },
    type: { type: String, enum: ['admin', 'vendor', 'user'], required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IUsers>('Users', usersSchema);
