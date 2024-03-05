import { mongo } from 'mongoose';
import { TagOut } from '../api/controllers/tags/dtos/tagOut.dto';
import { BadRequestError } from '../api/exceptions/api-errors';
import TagTypesRepository from '../database/repositories/tagTypes.repository';
import { TagTypeIn } from '../api/controllers/tags/dtos/tagTypeIn.dto';
import { TagTypeOut } from '../api/controllers/tags/dtos/tagTypeOut.dto';

interface ITagTypesService {
  registerTagType(tagType: TagTypeIn): Promise<TagTypeOut>;
  getAllTagTypes(): Promise<TagTypeOut[]>;
  getTagTypeById(tagTypeId: string): Promise<TagTypeOut>;
  updateTagType(tagTypeId: String, tagType: TagTypeIn): Promise<TagTypeOut>;
  deleteTagType(tagTypeId: string): Promise<TagTypeOut>;
}

export class TagTypesService implements ITagTypesService {
  private readonly _tagTypesRepository: TagTypesRepository;
  constructor() {
    this._tagTypesRepository = new TagTypesRepository();
  }

  async registerTagType(tagType: TagTypeIn): Promise<TagTypeOut> {
    const createdTag = await this._tagTypesRepository.create({
      name: tagType.name,
    });

    return {
      id: createdTag._id?.toString() as string,
      name: createdTag.name,
    };
  }

  async getAllTagTypes(): Promise<TagTypeOut[]> {
    const tagTypes = await this._tagTypesRepository.getAll();

    return tagTypes.map((tagType) => {
      const tagTypeOut: TagTypeOut = {
        id: tagType._id?.toString() as string,
        name: tagType.name,
      };
      return tagTypeOut;
    });
  }

  async getTagTypeById(tagTypeId: string): Promise<TagTypeOut> {
    const tagType = await this._tagTypesRepository.getById(tagTypeId);

    return {
      id: tagType._id?.toString() as string,
      name: tagType?.name,
    };
  }

  async updateTagType(
    tagTypeId: String,
    tagType: TagTypeIn
  ): Promise<TagTypeOut> {
    throw new Error('Method not implemented.');
  }

  async deleteTagType(tagTypeId: string): Promise<TagTypeOut> {
    const tagTypeDeleted = await this._tagTypesRepository.delete(tagTypeId);

    return {
      id: tagTypeDeleted._id?.toString() as string,
      name: tagTypeDeleted.name,
    };
  }
}
