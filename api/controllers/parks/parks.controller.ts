import { Express, Request, Response, NextFunction } from 'express';
import { ParksService } from '../../../services/parks.service';
import {
  BadRequestError,
  HTTP_STATUS_CODES,
  ValidationError,
} from '../../exceptions/api-errors';
import { usePagination } from '../../middlewares/pagination';

const route = '/api/parks';

export default function ParksController(app: Express) {
  const _parksService = new ParksService();

  app.post(
    `${route}`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { name } = req.body;

        if (!name) throw new ValidationError('Missing name for Park creation');

        const createdPark = await _parksService.createPark({
          name,
        });

        res.status(HTTP_STATUS_CODES.CREATED).send(createdPark);
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
        const { page, pageSize } = req.pagination;

        const parks = await _parksService.getParks(page, pageSize);

        res.status(HTTP_STATUS_CODES.OK).send(parks);
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    `${route}/:parkId`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { parkId } = req.params;

        if (!parkId) throw new BadRequestError('Park id not provided');

        const park = await _parksService.getParkById(parkId);

        res.status(HTTP_STATUS_CODES.OK).send(park);
      } catch (error) {
        next(error);
      }
    }
  );

  app.put(
    `${route}/:parkId`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { parkId } = req.params;
        const { name } = req.body;

        if (!parkId) throw new BadRequestError('Park id not provided');
        if (!name) throw new ValidationError('Park id not provided');

        await _parksService.updatePark(parkId, {
          name,
        });

        res
          .status(HTTP_STATUS_CODES.OK)
          .send({ message: `Park ${parkId} updated successfully` });
      } catch (error) {
        next(error);
      }
    }
  );

  app.delete(
    `${route}/:parkId`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { parkId } = req.params;

        if (!parkId) throw new BadRequestError('Park id not provided');

        await _parksService.deletePark(parkId);

        res
          .status(HTTP_STATUS_CODES.OK)
          .send({ message: `Park ${parkId} deleted successfully` });
      } catch (error) {
        next(error);
      }
    }
  );
}
