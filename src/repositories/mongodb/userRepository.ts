
import bcrypt from "bcrypt";
import { UserModel } from "./models/userModel";
import {
  IUser,
  IUserRepository,
  IUserWithoutPassword,
} from "../../interfaces/userInterface";

export class MongoUserRepository implements IUserRepository {
  async findAll(): Promise<IUserWithoutPassword[]> {
    const result = await UserModel.find();
    return result.map(({ id, full_name, email, phone_number, profile_picture, address }) => ({
      id,
      full_name,
      email,
      phone_number,
      profile_picture,
      address,
    }));
  }

    const { id, full_name, email, phone_number, profile_picture, address }: IUserWithoutPassword = result;
    return { id, full_name, email, phone_number, profile_picture, address };
  }

  async create(user: Omit<IUser, "id">): Promise<IUserWithoutPassword> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new UserModel({
      full_name: user.full_name,
      email: user.email,
      password: hashedPassword,
      phone_number: user.phone_number,
      profile_picture: user.profile_picture,
      address: user.address,
    });
    await newUser.save();
    const { id, full_name, email, phone_number, profile_picture, address }: IUserWithoutPassword = newUser;
    return { id, full_name, email, phone_number, profile_picture, address };
  }
}
