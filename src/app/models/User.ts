import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  avatar_url: string;
}

/* UserSchema */
const UserSchema = new mongoose.Schema<Users>({
  name: {
    /* The name of this User */

    type: String,
    required: [true, "Please provide a name for this User."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  email: {
    /* The email of this User */

    type: String,
    required: [true, "Please provide an email for this User."],
    maxlength: [30, "Email cannot be more than 30 characters"],
  },
  password: {
    /* The password of this User */

    type: String,
    required: [true, "Please provide a password for this User."],
    maxlength: [20, "Password cannot be more than 20 characters"],
  },
  avatar_url: {
    /* Url to avatar */

    required: [false, "Please provide an image url for this User."],
    type: String,
  }
});

export default mongoose.models.User || mongoose.model<Users>("User", UserSchema);