import { createContext, useState, useEffect } from "react";

type initState = {
  user: any;
  token: string;
  loading: boolean;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setUser: (user: any) => void;
};

type Props = { children: React.ReactNode };

export const authContext = createContext<initState>({} as initState);

const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return (
    <authContext.Provider
      value={{ token, loading, setToken, setLoading, user, setUser }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
