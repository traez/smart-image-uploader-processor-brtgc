//src\app\page.tsx
import { getSubmissions } from "@/lib/submission-actions";
import type { Submission } from "@/lib/types";
import SubmissionForm from "@/components/SubmissionForm";
import SubmissionsList from "@/components/SubmissionsList";

export default async function Home() {
  const submissions: Submission[] = await getSubmissions();

  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Cloudinary Image Submission</h1>
        <SubmissionForm />
        <SubmissionsList submissions={submissions} />
      </div>
    </div>
  );
}
