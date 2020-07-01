import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SessionService from '@modules/users/services/Session';

export default class SessionController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const sessionService = container.resolve(SessionService);

    const { user, token } = await sessionService.execute({ email, password });
    delete user.password;

    return res.json({ user, token });
  }
}
