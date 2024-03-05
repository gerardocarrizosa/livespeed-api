import mongoose from 'mongoose';

export class Parser {
  public parseMongooseObjectId(id: string) {
    return new mongoose.Types.ObjectId(id);
  }
}
export function parseMongooseObjectId(id: string) {
  return new mongoose.Types.ObjectId(id);
}
