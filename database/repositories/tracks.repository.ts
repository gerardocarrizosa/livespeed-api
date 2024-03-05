import { BadRequestError } from '../../api/exceptions/api-errors';
import tracksModels, { ITrack } from '../models/tracks.models';

export class TracksRepository {
  async create(track: ITrack) {
    const newTrack = new tracksModels(track);
    const createdTrack = await newTrack.save();
    return createdTrack;
  }

  async get() {
    const tracks = await tracksModels.find();
    return tracks;
  }

  async getById(trackId: string) {
    const trackFound = await tracksModels
      .findById(trackId)
      .populate('parkId', 'name');
    if (!trackFound) throw new BadRequestError(`Track ${trackId} not found`);
    return trackFound;
  }

  async getByPark(trackId: string) {
    const trackFound = await tracksModels.find({ parkId: trackId });
    if (!trackFound) throw new BadRequestError(`Track ${trackId} not found`);
    return trackFound;
  }

  //   async update(trackId: string, track: ITrack) {
  async update(
    trackId: string,
    name: string,
    difficulty: 'White' | 'Green' | 'Blue' | 'Black' | 'DoubleBlack' | 'Proline'
  ) {
    await tracksModels.findByIdAndUpdate(
      trackId,
      {
        name: name,
        difficulty: difficulty,
      },
      { new: true }
    );
  }

  async delete(trackId: string) {
    await tracksModels.findByIdAndDelete(trackId);
  }
}
