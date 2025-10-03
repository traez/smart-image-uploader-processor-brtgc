//src\components\SubmissionsList.tsx
"use client";
import type { Submission } from "@/lib/types";
import { deleteSubmission } from "@/lib/submission-actions";
import { useState } from "react";

interface SubmissionsListProps {
  submissions: Submission[];
}

export default function SubmissionsList({ submissions }: SubmissionsListProps) {
  const [deleting, setDeleting] = useState<number | null>(null);

  async function handleDelete(submissionId: number) {
    if (!confirm("Are you sure you want to delete this submission?")) {
      return;
    }

    setDeleting(submissionId);
    const result = await deleteSubmission(submissionId);

    if (result.error) {
      alert(result.error);
    }
    setDeleting(null);
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No submissions yet. Create your first submission above!
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Submissions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="p-4 rounded-lg border shadow-sm bg-white flex flex-col"
          >
            <img
              src={submission.image_url}
              alt={`${submission.first_name} ${submission.surname}`}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <div className="flex-grow">
              <p className="font-semibold text-lg">
                {submission.first_name} {submission.surname}
              </p>
              <p className="text-gray-600 text-sm">{submission.email}</p>
              <p className="text-xs text-gray-400 mt-2">
                Submitted: {new Date(submission.created_at).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleDelete(submission.id)}
              disabled={deleting === submission.id}
              className="mt-3 w-full px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {deleting === submission.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
