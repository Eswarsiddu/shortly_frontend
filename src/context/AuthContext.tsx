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
  User,
} from "firebase/auth";

interface authInterface {
  currentUser: User | null | undefined;
  signInWithGoogle: () => Promise<UserCredential | void>;
  login: (email: string, password: string) => Promise<UserCredential | void>;
  register: (email: string, password: string) => Promise<UserCredential | void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (oobCode: string, newPassword: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
}

const AuthContext = createContext<authInterface>({
  currentUser: undefined,
  signInWithGoogle: () => Promise.resolve(),
  login: (email: string, password: string) => Promise.resolve(),
  register: (email: string, password: string) => Promise.resolve(),
  logout: () => Promise.resolve(),
  forgotPassword: (email: string) => Promise.resolve(),
  resetPassword: (oobCode: string, newPassword: string) => Promise.resolve(),
  verifyEmail: () => Promise.resolve(),
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
    console.log("The user is", currentUser);
  }, [currentUser]);

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
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
    if (currentUser) {
      return sendEmailVerification(currentUser);
    }
    return new Promise<void>(() => {});
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
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
