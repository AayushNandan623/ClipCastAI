import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

//This is a pre hook its like a middleware that is executed before the data is begin saved/written on the db . In this case it is begin used to hash the password before being saved in the db, for both first time creation and update. 
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// This is done so that if the project is already deployed and the models exists then it will use them, if not then it will create new model and use them
const User = models?.User || model<IUser>("User", userSchema);

export default User;
