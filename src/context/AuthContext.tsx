import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  confirmPasswordReset,
  sendEmailVerification,
  updateProfile,
  updateEmail,
  updatePassword,
  applyActionCode,
  User,
} from "firebase/auth";
import { authInterface } from "../utils/Types/AuthInterface";

const AuthContext = createContext<authInterface>({
  currentUser: undefined,
  signInWithGoogle: () => Promise.resolve(),
  login: (email: string, password: string) => Promise.resolve(),
  register: (email: string, password: string, fullName: string) =>
    Promise.resolve(),
  logout: () => Promise.resolve(),
  updateDisplayName: (fullName: string) => Promise.resolve(),
  forgotPassword: (email: string) => Promise.resolve(),
  resetPassword: (oobCode: string, newPassword: string) => Promise.resolve(),
  verifyEmail: () => Promise.resolve(),
  updateEmailAddress: (email: string) => Promise.resolve(),
  _updatePassword: (newPassword: string) => Promise.resolve(),
  verifyEmailAddress: (obbCode: string) => Promise.resolve(),
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const contextValue = {
    currentUser,

    register: (email: string, password: string, fullName: string) =>
      createUserWithEmailAndPassword(auth, email, password).then((result) =>
        updateProfile(result.user, { displayName: fullName })
      ),

    login: (email: string, password: string) =>
      signInWithEmailAndPassword(auth, email, password),

    resetPassword: (oobCode: string, newPassword: string) =>
      confirmPasswordReset(auth, oobCode, newPassword),

    updateDisplayName: (fullName: string) =>
      updateProfile(currentUser!, { displayName: fullName }),

    _updatePassword: (newPassword: string) =>
      updatePassword(currentUser!, newPassword),

    forgotPassword: (email: string) => sendPasswordResetEmail(auth, email),

    updateEmailAddress: (email: string) => updateEmail(currentUser!, email),

    verifyEmailAddress: (obbCode: string) => applyActionCode(auth, obbCode),

    signInWithGoogle: () => signInWithPopup(auth, new GoogleAuthProvider()),

    verifyEmail: () => sendEmailVerification(currentUser!),

    logout: () => signOut(auth),
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
