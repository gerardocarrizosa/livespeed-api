import { BadRequestError } from '../../api/exceptions/api-errors';
import TagsModel, { ITag } from '../models/tag.model';

interface ITagsRepository {
  create(tag: ITag): Promise<ITag>;
  getAll(): Promise<ITag[]>;
  GetById(tagId: string): Promise<ITag>;
  update(tag: ITag): Promise<ITag>;
  delete(tagId: string): Promise<ITag>;
}

export default class TagsRepository {
  async create(tag: ITag): Promise<ITag> {
    const newTag = await new TagsModel(tag);
    const createdTag = await newTag.save();
    return createdTag;
  }
  //   async getAll(): Promise<ITag[]> {
  async getAll(startIndex: number, pageSize: number) {
    const tagsFound = await TagsModel.find()
      .skip(startIndex)
      .limit(pageSize)
      .populate('tagTypeId', 'name');

    return tagsFound;
  }
  async GetById(tagId: string): Promise<ITag> {
    const tagFound = await TagsModel.findById(tagId).populate('tagTypeId');
    if (!tagFound) throw new BadRequestError(`Tag ${tagId} not found`);
    return tagFound;
  }
  async update(tag: ITag): Promise<ITag> {
    throw new Error('Method not implemented.');
  }
  async delete(tagId: string): Promise<ITag> {
    const tagFound = await TagsModel.findById(tagId);
    if (!tagFound) throw new BadRequestError(`Tag ${tagId} not found`);
    await tagFound.deleteOne();
    return tagFound;
  }
}
