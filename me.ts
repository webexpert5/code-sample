import UserType from '@/gateway/users/types/UserType';
import { User } from '@/gateway/users/types';
import { Context } from '@/initGraphQLServer';
import mongoose from 'mongoose';

const me = {
  type: UserType,
  resolve: async (
    source: unknown,
    args: unknown,
    context: Context,
  ): Promise<User> => {
    try {
      const id = context.user.id;

      if (!id) return null;

      const userLoader = context.dataLoaders.userLoader;
      return await userLoader.load(new mongoose.Types.ObjectId(id));
    } catch (err) {
      return null;
    }
  },
};

export default me;
