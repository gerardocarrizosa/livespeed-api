import { ParkIn } from '../api/controllers/parks/dtos/parkIn.dto';
import { PagedList } from '../api/middlewares/pagination';
import { ParksRepository } from '../database/repositories/parks.repository';

export class ParksService {
  private readonly _parksRepository: ParksRepository;

  constructor() {
    this._parksRepository = new ParksRepository();
  }

  async createPark(park: ParkIn) {
    const createdPark = await this._parksRepository.create({
      name: park.name,
    });

    return createdPark;
  }

  async getParks(page: number, pageSize: number) {
    const parks = await this._parksRepository.get();
    const output = PagedList.create(parks, page, pageSize);
    return output;
  }

  async getParkById(parkId: string) {
    const parkFound = await this._parksRepository.getById(parkId);
    return parkFound;
  }

  async updatePark(parkId: string, park: ParkIn) {
    const parkFound = await this._parksRepository.getById(parkId);
    await this._parksRepository.update(parkFound.id, park);
  }

  async deletePark(parkId: string) {
    const parkFound = await this._parksRepository.getById(parkId);
    await this._parksRepository.delete(parkFound.id);
  }
}
