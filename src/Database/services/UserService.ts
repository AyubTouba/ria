import { ObjectID } from "mongodb";
import { injectable } from "inversify";
import User, { IUser, IUserEntity } from "../models/User";
const bcrypt = require("bcrypt");
import * as config from "config";

/**
 * @category Database
 * @subcategory  services
 * @classdesc UserService is CRUD service of server config Document on mongoDb database
 */
@injectable()
export class UserService {
  /**
   * save a server config
   * @param  {IUserEntity} UsereData server config data
   */
  async create(UsereData: IUserEntity): Promise<IUser> {
    const userFound = new User({
      username: UsereData.username,
      email: UsereData.email,
      password: await bcrypt.hashSync(
        UsereData.password,
        parseInt(config.get("Crypt.hashPass"))
      ),
      role: UsereData.role,
      workSpace: UsereData.workSpace,
    });
    return await userFound.save();
  }

  /**
   * update a User document
   * @param  {ObjectID} id  id of the server config document to edit
   * @param  {IUserEntity} UsereData  server config data
   */
  async update(id: ObjectID, UsereData: IUserEntity): Promise<IUser | boolean> {
    const userFound = await User.findById(id);
    if (!userFound) return false;

    userFound.username = UsereData.username
      ? UsereData.username
      : userFound.username;
    userFound.email = UsereData.email ? UsereData.email : userFound.email;
    userFound.password = UsereData.password
      ? UsereData.password
      : userFound.password;
    userFound.role = UsereData.role ? UsereData.role : userFound.role;
    userFound.workSpace = UsereData.workSpace
      ? UsereData.workSpace
      : userFound.workSpace;
    userFound.is_active = UsereData.is_active;
    return await userFound.save();
  }

  /**
   * get All User
   * @param  {any} query query to filter the result
   */
  async getAll(query: any = {}, select: any = null): Promise<IUser[]> {
    return await User.find(query, select).populate(
      "workSpace",
      "-__v -created_at"
    );
  }

  /**
   * get one User
   * @param  {any} query query to filter the result
   */
  async getOne(query: any = {}): Promise<IUser | null> {
    return await User.findOne(query).populate(
      "workSpace",
      "-_id -__v -created_at"
    );
  }

  /**
   * delete a User
   * @param  {any} query query to specify what to delete
   */
  async remove(query: any): Promise<any> {
    return await User.remove(query);
  }
}
