//src\lib\actions.ts
"use server";
import { turso } from "@/lib/turso";
import type { User } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function getUsers(): Promise<User[]> {
  const result = await turso.execute("SELECT * FROM users");

  return result.rows.map((row) => ({
    id: row.id as number,
    name: row.name as string,
    email: row.email as string,
    created_at: row.created_at as string,
  }));
}

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    return { error: "Name and email are required" };
  }

  try {
    await turso.execute({
      sql: "INSERT INTO users (name, email) VALUES (?, ?)",
      args: [name, email],
    });

    revalidatePath("/user");
    return { success: true };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Failed to create user" };
  }
}

export async function deleteUser(userId: number) {
  try {
    await turso.execute({
      sql: "DELETE FROM users WHERE id = ?",
      args: [userId],
    });

    revalidatePath("/user");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: "Failed to delete user" };
  }
}
