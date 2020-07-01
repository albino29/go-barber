import { getRepository, Repository } from 'typeorm';
import IUserRepository from '@modules/users/repositories/IUser';
import ICreateUserDTO from '@modules/users/dtos/ICreateUser';
import User from '../entities/User';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByDate(date: Date): Promise<User | undefined> {
    const appointment = await this.ormRepository.findOne({ where: { date } });
    return appointment;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ email, name, password });

    await this.ormRepository.save(user);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async update(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
