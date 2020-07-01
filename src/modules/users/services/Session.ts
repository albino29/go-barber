import { compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppErros';
import User from '../infra/typeorm/entities/User';

import IUserRepository from '../repositories/IUser';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class SessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError('Check you email or password', 401);

    if (!(await compare(password, user.password)))
      throw new AppError('Check you email or password', 401);

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default SessionService;
