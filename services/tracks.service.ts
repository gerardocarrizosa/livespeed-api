import { TrackIn, TrackInfo } from '../api/controllers/tracks/dtos/trackIn.dto';
import { PagedList } from '../api/middlewares/pagination';
import { TracksRepository } from '../database/repositories/tracks.repository';
import { parseMongooseObjectId } from '../utils/parser';

export class TracksService {
  private readonly _tracksRepository: TracksRepository;
  constructor() {
    this._tracksRepository = new TracksRepository();
  }

  async createTrack(track: TrackIn) {
    const createdTrack = await this._tracksRepository.create({
      name: track.name,
      difficulty: track.difficulty,
      parkId: parseMongooseObjectId(track.parkId),
    });

    return createdTrack;
  }

  async getTracks(page: number, pageSize: number) {
    const tracks = await this._tracksRepository.get();
    const output = PagedList.create(tracks, page, pageSize);
    return output;
  }

  async getTracksByPark(page: number, pageSize: number, parkId: string) {
    const tracksFound = await this._tracksRepository.getByPark(parkId);
    const output = PagedList.create(tracksFound, page, pageSize);
    return output;
  }

  async getTrackById(trackId: string) {
    const trackFound = await this._tracksRepository.getById(trackId);
    return trackFound;
  }

  async updateTrack(trackId: string, track: TrackInfo) {
    const trackFound = await this._tracksRepository.getById(trackId);
    await this._tracksRepository.update(
      trackFound.id,
      track.name,
      track.difficulty
    );
  }

  async deleteTrack(trackId: string) {
    const trackFound = await this._tracksRepository.getById(trackId);
    await this._tracksRepository.delete(trackFound.id);
  }
}
