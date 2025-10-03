//src/lib/submission-actions.ts
"use server";
import { turso } from "@/lib/turso";
import type { Submission } from "@/lib/types";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";

export async function getSubmissions(): Promise<Submission[]> {
  const result = await turso.execute(
    "SELECT * FROM submissions ORDER BY created_at DESC"
  );

  return result.rows.map((row) => ({
    id: row.id as number,
    first_name: row.first_name as string,
    surname: row.surname as string,
    email: row.email as string,
    image_url: row.image_url as string,
    cloudinary_public_id: row.cloudinary_public_id as string,
    created_at: row.created_at as string,
  }));
}

export async function createSubmission(data: {
  first_name: string;
  surname: string;
  email: string;
  image_url: string;
  cloudinary_public_id: string;
}) {
  const { first_name, surname, email, image_url, cloudinary_public_id } = data;

  if (
    !first_name ||
    !surname ||
    !email ||
    !image_url ||
    !cloudinary_public_id
  ) {
    return { error: "All fields are required" };
  }

  try {
    // 🔒 Verify image exists in Cloudinary (requires api_key & secret)
    const resource = await cloudinary.api.resource(cloudinary_public_id);

    if (!resource?.secure_url || resource.secure_url !== image_url) {
      return { error: "Image verification failed with Cloudinary" };
    }

    // Save submission in Turso
    await turso.execute({
      sql: "INSERT INTO submissions (first_name, surname, email, image_url, cloudinary_public_id) VALUES (?, ?, ?, ?, ?)",
      args: [first_name, surname, email, image_url, cloudinary_public_id],
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating submission:", error);
    return { error: "Failed to create submission" };
  }
}

export async function deleteSubmission(submissionId: number) {
  try {
    // Lookup submission in DB
    const result = await turso.execute({
      sql: "SELECT cloudinary_public_id FROM submissions WHERE id = ?",
      args: [submissionId],
    });

    if (result.rows.length === 0) {
      return { error: "Submission not found" };
    }

    const publicId = result.rows[0].cloudinary_public_id as string;

    // 🔒 Delete image from Cloudinary (requires api_key & secret)
    await cloudinary.uploader.destroy(publicId);

    // Delete from DB
    await turso.execute({
      sql: "DELETE FROM submissions WHERE id = ?",
      args: [submissionId],
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting submission:", error);
    return { error: "Failed to delete submission" };
  }
}

/*
--------------------------------------------------
📝 Notes for Future Me (Why this is structured this way)
--------------------------------------------------

1. Separation of concerns:
   - Client (form) uploads directly to Cloudinary using an unsigned preset.
   - Server actions here handle *trusted* operations that require secrets:
     - Verifying images exist before saving records.
     - Deleting images when a submission is removed.

2. Why verify with Cloudinary before saving?
   - Prevents fake/malicious data (e.g., someone sending a random URL).
   - Ensures DB only stores images actually hosted in our Cloudinary account.

3. Why store both `secure_url` and `public_id`?
   - `secure_url` → needed for frontend display.
   - `public_id` → needed for server-side operations like verify/delete.

4. Why delete Cloudinary image first in `deleteSubmission`?
   - Keeps storage clean and avoids "orphaned" images.
   - DB record is only deleted *after* Cloudinary deletion is attempted.

5. Security note:
   - All Cloudinary Admin API calls (verify, destroy) require API key & secret.
   - These must *never* run in client code, only here on the server.

6. `revalidatePath("/")`:
   - Ensures Next.js cache is updated after DB mutations.
   - Keeps UI in sync without manual refresh.
*/