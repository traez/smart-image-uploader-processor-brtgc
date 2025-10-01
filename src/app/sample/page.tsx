import type { Metadata } from "next";
import { turso } from "@/lib/turso";

export const metadata: Metadata = {
  description: "Created by Trae Zeeofor",
  title: "Sample - Smart Image Uploader Processor BRTGC",
};

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export default async function Home() {
  const result = await turso.execute("SELECT * FROM users");

  const users: User[] = result.rows.map((row) => ({
    id: row.id as number,
    name: row.name as string,
    email: row.email as string,
    created_at: row.created_at as string,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-3 rounded-lg border shadow-sm bg-white"
          >
            <p className="font-medium">{user.name}</p>
            <p className="text-gray-600 text-sm">{user.email}</p>
            <p className="text-xs text-gray-400">
              Joined: {new Date(user.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
