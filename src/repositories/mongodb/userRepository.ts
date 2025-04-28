import { v4 as uuidv4 } from 'uuid';
import { Pool } from "pg";
import bcrypt from "bcrypt";
import { IUser, IUserRepository, IUserWithoutPassword } from "../../interfaces/userInterface";
import { queryWithLogging } from "../../repositories/postgres/utils";

export class MongoUserRepository implements IUserRepository {
  constructor(private pool: Pool) {}

  async findAll(): Promise<IUserWithoutPassword[]> {
    const { rows } = await queryWithLogging(
      this.pool,
     ` SELECT id, email,full_name, phone_number, profile_picture, address FROM users`
    );
    return rows;
  }

  async findById(id: string): Promise<IUserWithoutPassword | null> {
    const { rows } = await queryWithLogging(
      this.pool,
      `SELECT id, email, full_name, phone_number, profile_picture, address FROM users WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  
  }



  // Find a user by email
  async findByEmail(email: string): Promise<IUser | null> {
    const { rows } = await queryWithLogging(
      this.pool,
     `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return rows[0] || null;
  }

  async create(user: Omit<IUser, "id">): Promise<IUserWithoutPassword> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userId = uuidv4();
    const { rows } = await queryWithLogging(
      this.pool,
     ` INSERT INTO users 
        (id, email, password, full_name, phone_number, profile_picture, address) 
       VALUES ( $1, $2, $3, $4, $5, $6, $7)
       RETURNING id, email, full_name, phone_number, profile_picture, address`,
      [
        userId,
        user.email,
        hashedPassword,
        user.full_name,
        user.phone_number ?? null,
        user.profile_picture ?? null,
        user.address || null,
      ]
    );
    return rows[0];

  }

  // Create a new user
 
}