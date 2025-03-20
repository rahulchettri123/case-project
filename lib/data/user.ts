import { db } from "@/lib/db";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    console.error("Error getting user by email:", error);
    return null;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    return user;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return null;
  }
};

export const createUser = async (
  email: string,
  password: string,
  name?: string
): Promise<User | null> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<User | null> => {
  try {
    // Make sure password is hashed if provided
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const user = await db.user.update({
      where: { id },
      data,
    });

    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
}; 