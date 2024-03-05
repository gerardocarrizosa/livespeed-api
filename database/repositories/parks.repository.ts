import { BadRequestError } from '../../api/exceptions/api-errors';
import ParksModel, { IPark } from '../models/park.model';

export class ParksRepository {
  async create(park: IPark) {
    const newPark = new ParksModel(park);
    const createdPark = await newPark.save();
    return createdPark;
  }

  async get() {
    const parks = await ParksModel.find();
    return parks;
  }

  async getById(parkId: string) {
    const parkFound = await ParksModel.findById(parkId);
    if (!parkFound) throw new BadRequestError(`Park ${parkId} not found`);
    return parkFound;
  }

  async update(parkId: string, park: IPark) {
    await ParksModel.findByIdAndUpdate(parkId, park, { new: true });
  }

  async delete(parkId: string) {
    await ParksModel.findByIdAndDelete(parkId);
  }
}
