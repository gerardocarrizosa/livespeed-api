import { Express, Request, Response, NextFunction } from 'express';
import {
  BadRequestError,
  HTTP_STATUS_CODES,
} from '../../exceptions/api-errors';
import { TagsService } from '../../../services/tags.service';
import { TagTypesService } from '../../../services/tagTypes.service';
import { usePagination } from '../../middlewares/pagination';

const route = '/api/tags';

export default function TagsController(app: Express) {
  const _tagsService = new TagsService();
  const _tagTypesService = new TagTypesService();

  app.post(
    `${route}/register`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { tagTypeId, identifier } = req.body;

        if (!tagTypeId || !identifier)
          throw new BadRequestError('Missing data for tag registration');

        const data = await _tagsService.registerTag({
          identifier,
          tagTypeId,
        });

        const tagTypeData = await _tagTypesService.getTagTypeById(data.tagType);

        res.status(HTTP_STATUS_CODES.CREATED).send({
          tagId: data.tagId,
          identifier: data.identifier,
          tagType: tagTypeData.name,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    `${route}`,
    usePagination,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // @ts-ignore
        const { page, pageSize, startIndex } = req.pagination;

        if (!page || !pageSize)
          throw new BadRequestError('No pagination parameters provided');

        const data = await _tagsService.getAllTags(page, pageSize, startIndex);

        res.status(HTTP_STATUS_CODES.OK).send(data);
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    `${route}/:tagId`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { tagId } = req.params;

        if (!tagId) throw new BadRequestError('Tag id not provided');

        const data = await _tagsService.getTagById(tagId);

        res.status(HTTP_STATUS_CODES.OK).send(data);
      } catch (error) {
        next(error);
      }
    }
  );

  app.delete(
    `${route}/:tagId`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { tagId } = req.params;

        if (!tagId) throw new BadRequestError('Tag id not provided');

        const data = await _tagsService.deleteTag(tagId);

        res.status(HTTP_STATUS_CODES.OK).send(data);
      } catch (error) {
        next(error);
      }
    }
  );

  app.post(
    `${route}/tag-type/register`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { name } = req.body;

        if (!name)
          throw new BadRequestError(
            'Missing information for tag type registration'
          );

        const data = await _tagTypesService.registerTagType({
          name: name,
        });

        res.status(HTTP_STATUS_CODES.CREATED).send(data);
      } catch (error) {
        next(error);
      }
    }
  );
}
