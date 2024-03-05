import mongoose, { Schema } from 'mongoose';

interface IBikeType {
  name: string;
}

const bikeTypesSchema: Schema = new Schema<IBikeType>({
  name: { type: String, required: true },
});

export default mongoose.model<IBikeType>('BikeTypes', bikeTypesSchema);
