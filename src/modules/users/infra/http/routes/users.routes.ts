import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import authentication from '../middlewares/Authentication';

import UserController from '../controller/User';
import UserAvatarController from '../controller/UserAvatar';

const routes = Router();
const upload = multer(uploadConfig);
const userController = new UserController();
const userAvatarController = new UserAvatarController();

routes.post('/', userController.create);

routes.patch(
  '/avatar',
  authentication,
  upload.single('avatar'),
  userAvatarController.update,
);

export default routes;
