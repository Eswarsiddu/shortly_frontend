import { User, UserCredential } from "firebase/auth";

export interface authInterface {
  currentUser: User | null | undefined;
  signInWithGoogle: () => Promise<UserCredential | void>;
  login: (email: string, password: string) => Promise<UserCredential | void>;
  register: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<UserCredential | void>;
  logout: () => Promise<void>;
  updateDisplayName: (fullName: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (oobCode: string, newPassword: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
  updateEmailAddress: (email: string) => Promise<void>;
  verifyEmailAddress: (obbCode: string) => Promise<void>;
  _updatePassword: (newPassword: string) => Promise<void>;
}
