import {
  IUser,
  IUserRepository,
  IUserService,
  IUserWithoutPassword,
} from "../interfaces/userInterface";
import jwt from "jsonwebtoken";
import bycrpt from "bcrypt";

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getAllUsers(): Promise<IUserWithoutPassword[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw Object.assign(new Error("User not found"), { status: 404 });
    }
    return user;
  }

  async createUser(user: Omit<IUser, "id">) {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw Object.assign(new Error("User already exists"), { status: 400 });
    }

    const newUser = await this.userRepository.create(user);

    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    return { user: newUser, token };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw Object.assign(new Error("User not found"), { status: 404 });
    }

    const isValidPassword = await bycrpt.compare(password, user.password);
    if (!isValidPassword) {
      throw Object.assign(new Error("Invalid password"), { status: 400 });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return {
      user: {
        email: user.email,
        password: user.password,
        full_name: user.full_name,
        phone_number: user.phone_number,
        profile_picture: user.profile_picture,
        address: user.address,
        create_at: user.create_at,
        update_at: user.update_at
      },
      token,
    };
  }
}
