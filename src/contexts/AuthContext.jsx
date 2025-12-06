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

  const register = async ({ name, email, password, password_confirmation }) => {
    try {
      const res = await axiosClient.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });

      const userData = res.data.data.user;
      const token = res.data.data.token;

      Cookies.set("user", JSON.stringify({ ...userData, token }), { expires: 1 });
      setUser({ ...userData, token });
      return res;
    } catch (err) {
      const resp = err.response;
      if (resp && resp.data) {
        if (resp.data.errors) {
          const messages = Object.values(resp.data.errors).flat();
          throw new Error(messages.join(" \n "));
        }

        if (resp.data.message) throw new Error(resp.data.message);
      }

      throw new Error(err.message || "Registration failed");
    }
  };

  const logout = () => {
    Cookies.remove("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
