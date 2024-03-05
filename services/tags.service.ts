import { mongo } from 'mongoose';
import TagsRepository from '../database/repositories/tags.repository';
import { TagIn } from '../api/controllers/tags/dtos/tagIn.dto';
import { TagOut } from '../api/controllers/tags/dtos/tagOut.dto';
import { BadRequestError } from '../api/exceptions/api-errors';
import TagTypesRepository from '../database/repositories/tagTypes.repository';
import { PagedList } from '../api/middlewares/pagination';

interface ITagsService {
  registerTag(tag: TagIn): Promise<TagOut>;
  getAllTags(): Promise<TagOut[]>;
  getTagById(tagId: string): Promise<TagOut>;
  updateTag(tagId: String, tag: TagIn): Promise<TagOut>;
  deleteTag(tagId: string): Promise<TagOut>;
}

export class TagsService {
  private readonly _tagsRepository: TagsRepository;
  private readonly _tagTypesRepository: TagTypesRepository;
  constructor() {
    this._tagsRepository = new TagsRepository();
    this._tagTypesRepository = new TagTypesRepository();
  }

  async registerTag(tag: TagIn): Promise<TagOut> {
    const tagTypeFound = await this._tagTypesRepository.getById(tag.tagTypeId);

    const tagTypeId = new mongo.ObjectId(tagTypeFound._id);
    if (!tagTypeId)
      throw new BadRequestError(`Error parsing id ${tag.tagTypeId}`);

    const createdTag = await this._tagsRepository.create({
      tagTypeId: tagTypeId,
      identifier: tag.identifier,
    });

    return {
      tagId: createdTag._id?.toString() as string,
      identifier: createdTag.identifier,
      tagType: createdTag.tagTypeId.toString(),
      createdAt: createdTag.createdAt as string,
    };
  }

  //   async getAllTags(): Promise<TagOut[]> {
  async getAllTags(page: number, pageSize: number, startIndex: number) {
    const tags = await this._tagsRepository.getAll(startIndex, pageSize);

    const output = PagedList.create(tags, page, pageSize);

    return output;
  }

  async getTagById(tagId: string) {
    const tag = await this._tagsRepository.GetById(tagId);

    return {
      _id: tag._id?.toString() as string,
      identifier: tag.identifier,
      tagTypeId: tag.tagTypeId,
      createdAt: tag.createdAt as string,
    };
  }

  async updateTag(tagId: String, tag: TagIn): Promise<TagOut> {
    throw new Error('Method not implemented.');
  }

  async deleteTag(tagId: string): Promise<TagOut> {
    const tagDeleted = await this._tagsRepository.delete(tagId);

    return {
      tagId: tagDeleted._id?.toString() as string,
      identifier: tagDeleted.identifier,
      tagType: tagDeleted.tagTypeId.toString(),
      createdAt: tagDeleted.createdAt as string,
    };
  }
}
