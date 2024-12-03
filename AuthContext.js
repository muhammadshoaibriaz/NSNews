import React, { createContext, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://your-backend-url/authenticate",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(response.data.user);
        } catch (error) {
          console.error(error);
        }
      }
    };
    loadUser();
  }, []);
  const login = async (username, password) => {
    try {
      const response = await axios.post("http://your-backend-url/login", {
        username,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
