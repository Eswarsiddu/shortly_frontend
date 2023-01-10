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
  UserCredential,
  updateProfile,
  updateEmail,
  updatePassword,
  applyActionCode,
  User,
} from "firebase/auth";

interface authInterface {
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

  useEffect(() => {
    console.log("The user is", currentUser?.uid);
  }, [currentUser]);

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function register(email: string, password: string, fullName: string) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        return updateProfile(result.user, { displayName: fullName });
      }
    );
  }

  function updateDisplayName(fullName: string) {
    if (currentUser) {
      return updateProfile(currentUser, { displayName: fullName });
    }
    return new Promise<void>(() => {});
  }

  function forgotPassword(email: string) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:5173/login`,
    });
  }

  function resetPassword(oobCode: string, newPassword: string) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  function logout() {
    return signOut(auth);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function verifyEmail() {
    return sendEmailVerification(currentUser!);
  }

  function updateEmailAddress(email: string) {
    return updateEmail(currentUser!, email);
  }

  function verifyEmailAddress(obbCode: string) {
    return applyActionCode(auth, obbCode);
  }

  async function _updatePassword(newPassword: string) {
    return updatePassword(currentUser!, newPassword);
  }

  const contextValue = {
    currentUser,
    signInWithGoogle,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    updateDisplayName,
    updateEmailAddress,
    verifyEmailAddress,
    _updatePassword,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
