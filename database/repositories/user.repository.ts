import UsersModel, { IUsers } from '../models/user.model';

interface IUserRepository {
  create(user: IUsers): Promise<any>;
  // getAll(): Promise<
  //   (Document<unknown, {}, IUsers> &
  //     IUsers & {
  //       _id: Types.ObjectId;
  //     })[]
  // >;
  getAll(): Promise<IUsers[]>;
  getById(id: string): Promise<any>;
  getByUid(uid: string): Promise<any>;
  update(): Promise<void>;
  delete(): Promise<void>;
}

export default class UserRepository implements IUserRepository {
  async create(user: IUsers): Promise<any> {
    const newUser = new UsersModel(user);
    const newUserResult = await newUser.save();
    return newUserResult;
  }
  async getAll() {
    const users = await UsersModel.find();
    return users;
  }
  async getById(id: string): Promise<any> {
    const userFound = await UsersModel.findById(id);
    return userFound;
  }
  async getByUid(uid: string): Promise<any> {
    const userFound = await UsersModel.findOne({ uid: uid });
    return userFound;
  }
  async update(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
