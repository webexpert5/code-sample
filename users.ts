import { model, Schema, Types } from "mongoose";
import { ProductFeaturesEnum } from "@/gateway/product-features/types";
import { ROLE_TYPE_ENUM } from "@/gateway/users/types";

interface ICookiePreferences {
  required?: boolean;
  functional?: boolean;
}
export interface IUser {
  _id: string;
  id?: string;
  userType?: string;
  clubName?: string;
  teamName?: string;
  organisationName?: string;
  subscriptionPlan: string;
  features: ProductFeaturesEnum[];
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  defaultTeam?: Types.ObjectId;
  playerId?: Types.ObjectId;
  phoneNumber?: string;
  createdBy?: string;
  createdAt?: Date;
  clubs?: Types.ObjectId;
  accessFailedCount?: number;
  lockoutEnabled: boolean;
  lockoutExpires?: number;
  activated: boolean;
  isVerified: boolean;
  onboarded: boolean;
  tocAccepted: boolean;
  roles: ROLE_TYPE_ENUM[];
  picture?: string;
  username?: string;
  affiliatedWithTheClubBy?: string;
  affiliated?: string;
  wantToReceiveUpdates: boolean;
  dob?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  downloadOnBoarded: boolean;
  forcePasswordChangeOnLogin: boolean;
  isDeleted: boolean;
  deletedBy?: string;
  deletedAt?: Date;
  lastLoginAt?: Date;
  verificationEmailSentTime?: Date;
  cookiePreferences?: ICookiePreferences;
  resetPasswordToken?: string;
  emailVerificationToken?: string;
  stripe_customer_id?: string;
  subscribedSeasons: Types.ObjectId[];
  paidFixtures: Types.ObjectId[];
}

const UsersSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  accessFailedCount: {
    type: Number,
    default: 0,
  },
  lockoutEnabled: {
    type: Boolean,
    default: false,
  },
  lockoutExpires: {
    type: Number,
    default: null,
  },
  activated: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  onboarded: {
    type: Boolean,
    default: false,
  },
  forcePasswordChangeOnLogin: {
    type: Boolean,
    default: false,
  },
  tocAccepted: {
    type: Boolean,
    default: false,
  },
  roles: {
    type: [String],
    required: true,
  },
  picture: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
  wantToReceiveUpdates: {
    type: Boolean,
    default: false,
  },
  dob: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  twitter: {
    type: String,
  },
  tiktok: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedBy: {
    type: String,
  },
  deletedAt: {
    type: Date,
  },
  lastLoginAt: {
    type: Date,
  },
  cookiePreferences: {
    required: {
      type: Boolean,
      default: true,
    },
    functional: {
      type: Boolean,
      default: true,
    },
  },
  resetPasswordToken: {
    type: String,
  },
  emailVerificationToken: {
    type: String,
  },
  stripe_customer_id: {
    type: String,
  },
});

UsersSchema.index({ playerId: 1 }, { sparse: true, unique: true });

export default model("users", UsersSchema);
