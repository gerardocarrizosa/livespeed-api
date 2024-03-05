import { BadRequestError } from '../../api/exceptions/api-errors';
import TagTypesModel, { ITagType } from '../models/tagType.model';

interface ITagTypesRepository {
  create(tagType: ITagType): Promise<ITagType>;
  getAll(): Promise<ITagType[]>;
  getById(tagTypeId: string): Promise<ITagType>;
  update(tagType: ITagType): Promise<ITagType>;
  delete(tagTypeId: string): Promise<ITagType>;
}

export default class TagTypesRepository implements ITagTypesRepository {
  async create(tagType: ITagType): Promise<ITagType> {
    const newTagType = await new TagTypesModel(tagType);
    const createdTagType = await newTagType.save();
    return createdTagType;
  }
  async getAll(): Promise<ITagType[]> {
    const tagTypesFound = await TagTypesModel.find();
    return tagTypesFound;
  }
  async getById(tagTypeId: string): Promise<ITagType> {
    const tagTypeFound = await TagTypesModel.findById(tagTypeId);
    if (!tagTypeFound) throw new BadRequestError(`Tag ${tagTypeId} not found`);
    return tagTypeFound;
  }
  async update(tagType: ITagType): Promise<ITagType> {
    throw new Error('Method not implemented.');
  }
  async delete(tagTypeId: string): Promise<ITagType> {
    const tagTypeFound = await TagTypesModel.findById(tagTypeId);
    if (!tagTypeFound) throw new BadRequestError(`Tag ${tagTypeId} not found`);
    await tagTypeFound.deleteOne();
    return tagTypeFound;
  }
}
