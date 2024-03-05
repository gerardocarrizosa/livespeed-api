import { Express, Request, Response, NextFunction } from 'express';
import { UsersService } from '../../../services/users.service';
import {
  BadRequestError,
  HTTP_STATUS_CODES,
} from '../../exceptions/api-errors';
import * as firebaseAdmin from 'firebase-admin';
import { LoginResponse } from '../auth/dtos/authDtos.dto';

const route = '/api/user';

export default function UserController(app: Express) {
  const _usersService = new UsersService();

  app.get(
    `${route}/info/:user_id`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { user_id } = req.params;

        const data = await _usersService.getUserById(user_id as string);

        if (!data) throw new BadRequestError(`user ${user_id} not found`);

        const firebaseInfo = await firebaseAdmin.auth().getUser(data.uid);

        const response: LoginResponse = {
          id: data._id,
          uid: data.uid,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          dob: data.dob,
          photoUrl: firebaseInfo.photoURL,
          phoneNumber: data.phoneNumber,
        };

        res.status(HTTP_STATUS_CODES.OK).send(response);
      } catch (error) {
        next(error);
      }
    }
  );

  //   app.get(
  //     `${route}/`,
  //     async (req: Request, res: Response, next: NextFunction) => {
  //       try {
  //       } catch (error) {
  //         next(error);
  //       }
  //     }
  //   );
}
