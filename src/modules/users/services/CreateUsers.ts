import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUser';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) throw new Error('User already exists');

    const cryptPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: cryptPassword,
    });

    return user;
  }
}

export default CreateUserService;
