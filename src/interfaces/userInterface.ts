export interface IUser {
  id? : string;
  email: string;
  password: string;
  full_name: string;
  phone_number?: string;
  profile_picture?: string;
  address?: string;
  create_at?: Date;
  update_at?: Date;
}

export interface IUserWithoutPassword extends Omit<IUser, "password"> {}

export interface IUserRepository {
  findAll(): Promise<IUserWithoutPassword[]>;
  findById(id: string): Promise<IUserWithoutPassword | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(user: Omit<IUser, "id">): Promise<IUserWithoutPassword>;
}

export interface IUserService {
  getAllUsers(): Promise<IUserWithoutPassword[]>;
  getUserById(id: string): Promise<IUserWithoutPassword>;
  createUser(
    user: Omit<IUser, "id">
  ): Promise<{ user: IUserWithoutPassword; token: string }>;
  login(
    email: string,
    password: string
  ): Promise<{ user: IUserWithoutPassword; token: string }>;
}
 
