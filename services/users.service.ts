import { UnauthorizedError } from '../api/exceptions/api-errors';
import axios from 'axios';
import UserRepository from '../database/repositories/user.repository';
import { IUsers } from '../database/models/user.model';

type FirebaseTokenResponse = {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
};

interface IUsersService {
  login(email: string, password: string): Promise<FirebaseTokenResponse>;
  signUp(): Promise<any>;
  logout(): Promise<any>;
  getUserById(id: string): Promise<IUsers | undefined>;
  getUserByUid(uid: string): Promise<IUsers | undefined>;
  createUser(user: IUsers): Promise<any>;
}

export class UsersService implements IUsersService {
  _usersRepository: UserRepository;
  constructor() {
    this._usersRepository = new UserRepository();
  }

  async getUserById(id: string): Promise<IUsers | undefined> {
    const userData = await this._usersRepository.getById(id);
    return userData;
  }

  async getUserByUid(uid: string): Promise<IUsers | undefined> {
    const userData = await this._usersRepository.getByUid(uid);
    return userData;
  }

  async createUser(user: IUsers): Promise<any> {
    const userData = await this._usersRepository.create(user);
    return userData;
  }

  async login(email: string, password: string): Promise<FirebaseTokenResponse> {
    try {
      var tokenResponse = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBc2-2gDyw__-E4_rM6Sxh0GQ5qrbd8Jzs',
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      const authData = tokenResponse.data as FirebaseTokenResponse;

      return authData;
    } catch (error) {
      throw new UnauthorizedError('invalid creadentials');
    }
  }

  signUp(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  logout(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
