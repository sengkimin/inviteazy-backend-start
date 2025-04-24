

import { Pool, QueryResult } from "pg";
import bcrypt from "bcrypt";
import { IUser, IUserRepository } from "../../interfaces/userInterface";
import { queryWithLogging } from "./utils";
import { v4 as uuidv4 } from 'uuid';

export class PostgresUserRepository implements IUserRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  // Find all Event
  async findAll(): Promise<IUser[]> {
    try {
      const { rows }: QueryResult = await queryWithLogging(
        this.pool,
        "SELECT id, email, password, full_name, phone_number, profile_picture, address, create_at, update_at FROM users"
      );
      return rows;
    } catch (error) {
      console.error("Error in findAll:", error);
      throw new Error("Failed to retrieve users");
    }
  }

  // Find a user by ID
  async findById(id: string): Promise<IUser | null> {
    try {
      const { rows }: QueryResult = await queryWithLogging(
        this.pool,
        "SELECT id, email, password, full_name, phone_number, profile_picture, address, create_at, update_at FROM users WHERE id = $1",
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("Error in findById:", error);
      throw new Error(`Failed to retrieve user with ID: ${id}`);
    }
  }

  // Find a user by email
  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const { rows }: QueryResult = await queryWithLogging(
        this.pool,
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("Error in findByEmail:", error);
      throw new Error(`Failed to retrieve user with email: ${email}`);
    }
  }

  // Create a new user
  async create(user: Omit<IUser, "id"> ): Promise<IUser> {
    try {
      // Hash the user's password
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const now = new Date();
      const newUuid: string = uuidv4();

      // Perform the insert query
      const { rows }: QueryResult = await queryWithLogging(
        this.pool,
        "INSERT INTO users (id, email, password, full_name, phone_number, profile_picture, address, create_at, update_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, email, password, full_name, phone_number, profile_picture, address, create_at, update_at",
        [
          newUuid,
          user.email,
          hashedPassword,
          user.full_name,
          user.phone_number,
          user.profile_picture,
          user.address,
          now,
          now
        ]
      );

      return rows[0];
    } catch (error) {
      console.error("Error in create:", error);
      throw new Error("Failed to create user");
    }
  }
}
