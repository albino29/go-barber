import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dto/ICreateUser';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  update(data: ICreateUserDTO): Promise<User>;
}
