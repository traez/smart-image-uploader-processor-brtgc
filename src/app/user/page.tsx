import type { Metadata } from "next";
import { getUsers } from "@/lib/actions";
import type { User } from "@/lib/types";
import UsersList from "@/components/UsersList";
import CreateUserForm from "@/components/CreateUserForm";

export const metadata: Metadata = {
  description: "Created by Trae Zeeofor",
  title: "User - Turso SQLite Cloudinary Sandbox App - BRTGC",
};

export default async function UserPage() {
  const users: User[] = await getUsers();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Turso SQLite User List</h1>
      <CreateUserForm />
      <UsersList users={users} />
    </div>
  );
}
