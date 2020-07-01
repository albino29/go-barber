import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErros';
import uploadConfig from '../../../config/upload';
import IUserRepository from '../repositories/IUser';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  fileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id, fileName }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new AppError('Missing authentication', 401);

    if (user.avatar) {
      const avatarPath = path.join(uploadConfig.directory, user.avatar);
      const fileExists = await fs.promises.stat(avatarPath);

      if (fileExists) await fs.promises.unlink(avatarPath);
    }

    user.avatar = fileName;

    await this.userRepository.update(user);

    return user;
  }
}

export default UpdateUserAvatarService;
