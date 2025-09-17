export type Role = "Admin" | "Doctor" | "Patient";

export interface FormData {
  name?: string;
  email: string;
  password: string;
  role: Role;
}
