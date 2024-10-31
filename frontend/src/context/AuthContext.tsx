import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { ReactNode } from "react";

export const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  logOut: () => void;
  admin: boolean;
}>({
  user: null,
  loading: true,
  logOut: () => signOut(auth),
  admin: false,
});

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult().then((tokenResult) => {
          if (tokenResult.claims.admin) {
            setAdmin(true);
          }
        });
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logOut = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logOut, admin }}>
      {children}
    </AuthContext.Provider>
  );
};
