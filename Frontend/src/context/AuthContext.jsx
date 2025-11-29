import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

axios.defaults.baseURL = API_BASE;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------------------------------ SIGNUP ------------------------------
  const signup = async ({ email, password, username }) => {
    const res = await axios.post("/api/signup", {
      email,
      password,
      username,
    });

    return res.data; // return profile or message
  };

  // ------------------------------ LOGIN ------------------------------
  const login = async ({ email, password }) => {
    const res = await axios.post("/api/login", { email, password });

    const { idToken, refreshToken, uid, profile: profileData } = res.data;

    localStorage.setItem("idToken", idToken);
    localStorage.setItem("refreshToken", refreshToken);

    setUser({ uid });
    setProfile(profileData);

    return { uid, profile: profileData };
  };

  // ------------------------------ LOGOUT ------------------------------
  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
  };

  // ------------------------------ AUTO REFRESH TOKEN ------------------------------
  const refreshIdToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return logout();

      const res = await axios.post("/api/refreshToken", { refreshToken });

      localStorage.setItem("idToken", res.data.idToken);
      return res.data.idToken;
    } catch (err) {
      logout();
      return null;
    }
  };

  // ------------------------------ AUTH FETCH ------------------------------
  const authFetch = async (url, options = {}) => {
    try {
      let token = localStorage.getItem("idToken");

      let res = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status !== 401) {
        // normal response
        return await safeJson(res);
      }

      // token expired → refresh
      token = await refreshIdToken();
      if (!token) throw new Error("Session expired");

      // retry request
      res = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return await safeJson(res);
    } catch (err) {
      throw err;
    }
  };

  const safeJson = async (res) => {
    try {
      return await res.json();
    } catch {
      return {};
    }
  };

  // ------------------------------ LOAD PROFILE ON START ------------------------------
  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser({ uid: res.data.uid });
        setProfile(res.data);
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signup,   // <-- added here
        login,
        logout,
        authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
