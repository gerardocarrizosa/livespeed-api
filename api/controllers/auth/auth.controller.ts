import { Express, Request, Response, NextFunction } from 'express';
import { UsersService } from '../../../services/users.service';
import {
  BadRequestError,
  HTTP_STATUS_CODES,
  UnauthorizedError,
} from '../../exceptions/api-errors';
import * as firebaseAdmin from 'firebase-admin';
import { LoginResponse } from './dtos/authDtos.dto';

const route = '/api/auth';

export default function AuthController(app: Express) {
  const _usersService = new UsersService();

  app.get(
    `${route}/lookup`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { livespeedSession } = req.cookies;

        if (!livespeedSession) throw new UnauthorizedError('No session token');

        var decodedToken = await firebaseAdmin
          .auth()
          .verifySessionCookie(livespeedSession, true);

        if (!decodedToken) throw new UnauthorizedError('Expired token');

        const userData = await _usersService.getUserByUid(decodedToken.uid);
        if (!userData)
          throw new BadRequestError(`User ${decodedToken.uid} not found`);

        const firebaseData = await firebaseAdmin
          .auth()
          .getUser(decodedToken.uid);

        const response: LoginResponse = {
          id: userData._id,
          uid: userData.uid,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          dob: userData.dob,
          photoUrl: firebaseData.photoURL,
          phoneNumber: userData.phoneNumber,
        };

        return res.status(HTTP_STATUS_CODES.OK).send(response);
      } catch (error) {
        next(error);
      }
    }
  );

  app.post(
    `${route}/login`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;

        if (!email || !password) {
          throw new BadRequestError('Missing data for login!');
        }

        const sessionCookieExpiration = 60 * 60 * 24 * 1000;

        const authData = await _usersService.login(email, password);

        const idToken = authData.idToken;

        const sessionCookie = await firebaseAdmin
          .auth()
          .createSessionCookie(idToken, {
            expiresIn: sessionCookieExpiration,
          });

        res.cookie('livespeedSession', sessionCookie, {
          httpOnly: true,
          maxAge: sessionCookieExpiration,
          // domain: req.headers.origin,
          secure: true,
          sameSite: 'none',
        });

        const userData = await _usersService.getUserByUid(authData.localId);
        if (!userData)
          throw new BadRequestError(`User ${authData.localId} not found`);

        const response: LoginResponse = {
          id: userData._id,
          uid: userData.uid,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          dob: userData.dob,
          photoUrl: authData.localId,
          phoneNumber: userData.phoneNumber,
        };

        res.status(HTTP_STATUS_CODES.OK).send(response);
      } catch (error) {
        next(error);
      }
    }
  );

  app.post(
    `${route}/admin/signup`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { firstName, lastName, email, password, dob, phoneNumber } =
          req.body;

        if (!firstName || !lastName || !email || !password || !dob) {
          throw new BadRequestError('missing data for admin user creation');
        }

        const firebaseUserCreated = await firebaseAdmin.auth().createUser({
          email: email,
          emailVerified: false,
          displayName: `${firstName} ${lastName}`,
          password: password,
        });

        await _usersService.createUser({
          firstName: firstName,
          lastName: lastName,
          email: email,
          dob: dob,
          type: 'admin',
          uid: firebaseUserCreated.uid,
          phoneNumber,
        });

        res
          .status(HTTP_STATUS_CODES.CREATED)
          .send({ message: 'User created successfully' });
      } catch (error) {
        next(error);
      }
    }
  );

  app.post(
    `${route}/signup`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
      } catch (error) {
        next(error);
      }
    }
  );

  app.post(
    `${route}/logout`,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { livespeedSession } = req.cookies;

        console.log('livespeedSession', livespeedSession);

        res.cookie('livespeedSession', '');

        res.status(HTTP_STATUS_CODES.OK).send();
      } catch (error) {
        next(error);
      }
    }
  );
}
