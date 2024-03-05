import { Express, Request, Response, NextFunction } from 'express';
import {
  BadRequestError,
  HTTP_STATUS_CODES,
  ValidationError,
} from '../../exceptions/api-errors';
import { usePagination } from '../../middlewares/pagination';
import { TracksService } from '../../../services/tracks.service';
import { TrackIn } from './dtos/trackIn.dto';

const route = '/api/tracks';

export default function TracksController(app: Express) {
  const _tracksService = new TracksService();

  app.post(
    `${route}`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { name, difficulty, parkId }: TrackIn = req.body;

        if (!name || !difficulty || !parkId)
          throw new ValidationError('Missing name for track creation');

        const createdTrack = await _tracksService.createTrack({
          name,
          difficulty,
          parkId,
        });

        res.status(HTTP_STATUS_CODES.CREATED).send(createdTrack);
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    `${route}/by-park/:parkId`,
    usePagination,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // @ts-ignore
        const { page, pageSize } = req.pagination;
        const { parkId } = req.params;

        if (!parkId) throw new BadRequestError('Park id not provided');

        const tracks = await _tracksService.getTracksByPark(
          page,
          pageSize,
          parkId
        );

        res.status(HTTP_STATUS_CODES.OK).send(tracks);
      } catch (error) {
        next(error);
      }
    }
  );

  app.get(
    `${route}/:trackId`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { trackId } = req.params;

        if (!trackId) throw new BadRequestError('Park id not provided');

        const track = await _tracksService.getTrackById(trackId);

        res.status(HTTP_STATUS_CODES.OK).send(track);
      } catch (error) {
        next(error);
      }
    }
  );

  app.put(
    `${route}/:trackId`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { trackId } = req.params;
        const { name, difficulty } = req.body;

        if (!trackId) throw new BadRequestError('Park id not provided');
        if (!name || !difficulty)
          throw new ValidationError('Park id not provided');

        await _tracksService.updateTrack(trackId, {
          name,
          difficulty,
        });

        res
          .status(HTTP_STATUS_CODES.OK)
          .send({ message: `Park ${trackId} updated successfully` });
      } catch (error) {
        next(error);
      }
    }
  );

  app.delete(
    `${route}/:trackId`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { trackId } = req.params;

        if (!trackId) throw new BadRequestError('Track id not provided');

        await _tracksService.deleteTrack(trackId);

        res
          .status(HTTP_STATUS_CODES.OK)
          .send({ message: `Park ${trackId} deleted successfully` });
      } catch (error) {
        next(error);
      }
    }
  );
}
