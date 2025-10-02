"use client";
import { createUser } from "@/lib/actions";
import { useState } from "react";

export default function CreateUserForm() {
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setMessage("");
    const result = await createUser(formData);

    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage("User created successfully!");
      // Reset form
      (document.getElementById("create-user-form") as HTMLFormElement)?.reset();
    }
  }

  return (
    <div className="mb-6 p-4 rounded-lg border bg-gray-50">
      <h2 className="text-xl font-semibold mb-3">Create New User</h2>
      <form id="create-user-form" action={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Create User
        </button>
      </form>
      {message && (
        <p
          className={`mt-3 text-sm ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
