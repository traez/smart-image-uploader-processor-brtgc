"use client";
import type { User } from "@/lib/types";
import { deleteUser } from "@/lib/actions";
import { useState } from "react";

interface UsersListProps {
  users: User[];
}

export default function UsersList({ users }: UsersListProps) {
  const [deleting, setDeleting] = useState<number | null>(null);

  async function handleDelete(userId: number) {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setDeleting(userId);
    const result = await deleteUser(userId);

    if (result.error) {
      alert(result.error);
    }
    setDeleting(null);
  }

  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li
          key={user.id}
          className="p-3 rounded-lg border shadow-sm bg-white flex justify-between items-start"
        >
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-gray-600 text-sm">{user.email}</p>
            <p className="text-xs text-gray-400">
              Joined: {new Date(user.created_at).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => handleDelete(user.id)}
            disabled={deleting === user.id}
            className="ml-4 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {deleting === user.id ? "Deleting..." : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
}
