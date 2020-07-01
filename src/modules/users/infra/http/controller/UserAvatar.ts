import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatar';

export default class UserAvatarController {
  async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id: req.user.id,
      fileName: req.file.filename,
    });
    delete user.password;
    return res.json(user);
  }
}
