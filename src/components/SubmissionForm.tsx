//src/components/SubmissionForm.tsx
"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import type {
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetError,
} from "next-cloudinary";
import { createSubmission } from "@/lib/submission-actions";

export default function SubmissionForm() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [uploadedImage, setUploadedImage] = useState<{
    url: string;
    publicId: string;
  } | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!uploadedImage) {
      setMessage("Please upload an image");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    const result = await createSubmission({
      first_name: firstName,
      surname: surname,
      email: email,
      image_url: uploadedImage.url,
      cloudinary_public_id: uploadedImage.publicId,
    });

    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage("Submission created successfully!");
      // Reset form
      setFirstName("");
      setSurname("");
      setEmail("");
      setUploadedImage(null);
    }

    setIsSubmitting(false);
  }

  return (
    <div className="mb-8 p-6 rounded-lg border bg-white shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">New Submission</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="surname" className="block text-sm font-medium mb-1">
            Surname
          </label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Image (JPEG/PNG), Max 100KB
          </label>
          <CldUploadWidget
            uploadPreset={
              process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
            }
            options={{
              sources: ["local"],
              multiple: false,
              maxFiles: 1,
              clientAllowedFormats: ["jpeg", "png", "jpg"],
              maxFileSize: 100000, // 100KB in bytes
            }}
            onSuccess={(result: CloudinaryUploadWidgetResults) => {
              // Type guard to ensure info exists and is an object, not a string
              if (result.info && typeof result.info !== "string") {
                setUploadedImage({
                  url: result.info.secure_url,
                  publicId: result.info.public_id,
                });
              }
            }}
            onError={(error: CloudinaryUploadWidgetError) => {
              console.error("Upload error:", error);
              // error can be a string or an object with status/statusText
              const errorMessage =
                typeof error === "string" ? error : error?.statusText || "";
              if (errorMessage.toLowerCase().includes("file size")) {
                setMessage("Image must be smaller than 100KB");
              } else {
                setMessage("Failed to upload image. Please try again.");
              }
            }}
          >
            {({ open }) => (
              <div>
                <button
                  type="button"
                  onClick={() => open()}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                >
                  {uploadedImage ? "Change Image" : "Upload Image"}
                </button>
                {uploadedImage && (
                  <div className="mt-3">
                    <img
                      src={uploadedImage.url}
                      alt="Uploaded preview"
                      className="w-32 h-32 object-cover rounded-md border"
                    />
                    <p className="text-sm text-green-600 mt-1">
                      ✓ Image uploaded
                    </p>
                  </div>
                )}
              </div>
            )}
          </CldUploadWidget>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !uploadedImage}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-sm ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

/*
--------------------------------------------------
📝 Notes for Future Me (Why this works the way it does)
--------------------------------------------------

1. Image Upload Flow:
   - We use <CldUploadWidget> from next-cloudinary.
   - It handles uploads directly from the client to Cloudinary using an UNSIGNED upload preset.
   - The upload preset is safe to expose publicly and enforces rules (size, format, folder).
   - Once uploaded, Cloudinary returns `secure_url` + `public_id`.

2. Type Safety:
   - Import CloudinaryUploadWidgetResults and CloudinaryUploadWidgetError from next-cloudinary.
   - result.info can be undefined, string, or object - we check for both existence and type.
   - This matches Cloudinary's actual API types which account for all possible states.

3. Why not trust client uploads blindly?
   - A malicious user could bypass the widget and try to send fake data to our server.
   - That's why in `createSubmission` (server action), we verify with Cloudinary's Admin API
     (which requires API key + secret and runs server-side only) that the image really exists.
   - Only if the image is confirmed do we save submission details to Turso.

4. Why verify on server?
   - Keeps database clean (no fake records).
   - Prevents someone from storing external/random image URLs.
   - Cloudinary Admin API can only be called server-side since it uses secret credentials.

5. Why store both `url` and `publicId`?
   - `url` is needed for frontend display.
   - `publicId` is needed for server-side operations (e.g., verifying, deleting images later).

6. UX logic:
   - Form blocks submission until an image is uploaded.
   - On success, form resets and message updates.
   - Error handling checks size errors explicitly and shows user-friendly messages.

So the trust chain is:
CLIENT (unsigned upload) → CLOUDINARY (stores image) → SERVER (verifies existence) → DB (stores record).

This way, secrets stay server-only, users get smooth uploads, and the DB never stores bogus data.
*/
