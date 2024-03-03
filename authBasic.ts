import { GraphQLNonNull } from 'graphql';
import jwt from 'jsonwebtoken';
import AuthBasicInput from '@/auth/graphql-types/AuthBasicInput';
import AuthResponse from '@/auth/graphql-types/AuthResponse';
import UsersSchema from '@/database/models/users';
import { GraphQLError } from '@/common/ts-types';
import { User, ROLE_TYPE_ENUM } from '@/gateway/users/types';
import userPermissionsResolver from '@/gateway/users/resolvers/userPermissionsResolver';
import validator from '../utils/authValidations';
import generateUserToken from '../utils/generateUserToken';
import sendEmailVerificationEmail from '../utils/sendEmailVerificationEmail';

type AuthBasicArgs = {
  input: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
};

type AuthBasicResponse = {
  user?: User;
  token?: string;
  errors?: GraphQLError[];
};

const authBasic = {
  type: new GraphQLNonNull(AuthResponse),
  args: {
    input: {
      type: new GraphQLNonNull(AuthBasicInput),
    },
  },
  resolve: async (
    _source: unknown,
    args: AuthBasicArgs,
  ): Promise<AuthBasicResponse> => {
    const authBasicPayload = {
      ...args.input,
      email: args.input.email.toLowerCase(),
    };

    const { email, password, rememberMe } = authBasicPayload;

    const user = await UsersSchema.findOne({
      $and: [
        {
          $or: [
            { isDeleted: { $exists: false } },
            { isDeleted: false },
            { isDeleted: null },
          ],
        },
        {
          email: RegExp(
            '^' + email.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '$', // Escape the email for regex
            'i',
          ),
        },
        {
          $or: [
            { roles: ROLE_TYPE_ENUM.CLUB_OFFICIAL },
            { roles: ROLE_TYPE_ENUM.PLAYER },
            { roles: ROLE_TYPE_ENUM.ADMIN },
          ],
        },
      ],
    }).exec();

    try {
      await validator(user, password);

      // Generate login token.
      const token = await generateUserToken(user, {
        expiresIn: rememberMe ? '7d' : '10h',
      });

      const loggedInUser = await UsersSchema.findOneAndUpdate(
        { _id: user._id },
        { $set: { lastLoginAt: Date.now() } },
        { new: true },
      ).exec();

      return {
        user: loggedInUser,
        token,
      };
    } catch (error) {
      if (error.cause === 'USER_EMAIL_UNVERIFIED') {
        const token = jwt.sign(
          {
            user: { email, id: user._id },
          },
          process.env.JWT_TOKEN_SECRET,
          {
            expiresIn: '1d',
          },
        );

        await UsersSchema.updateOne(
          { _id: user._id },
          { $set: { emailVerificationToken: token } },
        ).exec();

        const referrer = user.onboarded ? 'login' : 'signup';

        const userPermissions = await userPermissionsResolver(user);

        const requirePlayerInsights =
          userPermissions.requiredPlayerInfo || userPermissions.requiredSurvey
            ? 'true'
            : 'false';

        sendEmailVerificationEmail(
          email,
          token,
          referrer,
          requirePlayerInsights,
        );
      }

      return {
        errors: [
          {
            message: error.message,
            code: error.cause,
          },
        ],
      };
    }
  },
};

export default authBasic;
