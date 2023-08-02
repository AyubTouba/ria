import * as mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { ROLES } from "../../config/constant";

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  email: String,
  workSpace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkSpace",
  },
});

export interface IUser extends mongoose.Document, IUserEntity {}

/**
 * @category Database
 * @subcategory  models
 */
export interface IUserEntity {
  /**
   * @property {string}  name
   */
  username: string;
  password: string;
  email: string;
  role?: ROLES;
  created_at?: Date;
  workSpace: ObjectId;
  is_active?: boolean;
  webClients?: Array<ObjectId>;
}

export const User = mongoose.model("User", UserSchema);

// Export the model and return your IserverConfig interface
export default mongoose.model<IUser>("User", UserSchema);
