import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; 
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email, password) => {
    const res = await axiosClient.post("/login", { email, password });
    const userData = res.data.data.user;
    const token = res.data.data.token;

    Cookies.set("user", JSON.stringify({ ...userData, token }), { expires: 1 }); 
    setUser({ ...userData, token });
  };

  const logout = () => {
    Cookies.remove("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
