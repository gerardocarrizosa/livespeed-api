import mongoose, { Schema, Types } from 'mongoose';

export interface ITrack {
  name: string;
  difficulty: 'White' | 'Green' | 'Blue' | 'Black' | 'DoubleBlack' | 'Proline';
  parkId: Types.ObjectId;
}

const trackSchema: Schema = new Schema<ITrack>(
  {
    name: { type: String, required: true },
    difficulty: {
      type: String,
      enum: {
        values: ['White', 'Green', 'Blue', 'Black', 'DoubleBlack', 'Proline'],
        message: '{VALUE} is not supported',
      },
      required: true,
    },
    parkId: { type: Schema.Types.ObjectId, required: true, ref: 'Parks' },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<ITrack>('Tracks', trackSchema);

//   difficulty: TrackDifficulties;
// enum TrackDifficulties {
//   White,
//   Green,
//   Blue,
//   Black,
//   DoubleBlack,
//   Proline,
// }
