export type UserModel = {
  id: string;
  username: string;
  profilePicture?: string | null;
  email: string;
  isEmailVerified: boolean;
  collegeId: string | null;
  role: UserRole;
};

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
