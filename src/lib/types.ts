//src/lib/types.ts
export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export type Submission = {
  id: number;
  first_name: string;
  surname: string;
  email: string;
  image_url: string;
  cloudinary_public_id: string;
  created_at: string;
};
