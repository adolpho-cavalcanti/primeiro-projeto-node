import Router from 'express';
import createUserService from '../service/CreateUserService';
import UpdateUserAvatarService from '../service/UpdateUserAvatarService';
import ensureAuthenticated from '../middleware/ensureAutheticated';
import multer from 'multer';
import uploadConfig from '../config/upload';

const usersRouter = Router();

const upload = multer(uploadConfig);


usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new createUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);

});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
});

export default usersRouter;
