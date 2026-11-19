import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IUser {
  displayName: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  acceptedTermsAt: Date;
  tokenVersion: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    displayName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: 2,
      maxlength: 80,
    },

    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: [true, "Password hash is required"],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },

    acceptedTermsAt: {
      type: Date,
      required: true,
    },
    tokenVersion: {
      type: Number,
      default: 0,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "users",
  },
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
