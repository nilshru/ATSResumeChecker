// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();
// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// axios.defaults.baseURL = API_BASE;

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ------------------------------ SIGNUP ------------------------------
//   const signup = async ({ email, password, username }) => {
//     const res = await axios.post("/api/signup", {
//       email,
//       password,
//       username,
//     });

//     return res.data; // return profile or message
//   };

//   // ------------------------------ LOGIN ------------------------------
//   const login = async ({ email, password }) => {
//     const res = await axios.post("/api/login", { email, password });

//     const { idToken, refreshToken, uid, profile: profileData } = res.data;

//     localStorage.setItem("idToken", idToken);
//     localStorage.setItem("refreshToken", refreshToken);

//     setUser({ uid });
//     setProfile(profileData);

//     return { uid, profile: profileData };
//   };

//   // ------------------------------ LOGOUT ------------------------------
//   const logout = () => {
//     setUser(null);
//     setProfile(null);
//     localStorage.removeItem("idToken");
//     localStorage.removeItem("refreshToken");
//   };

//   // ------------------------------ AUTO REFRESH TOKEN ------------------------------
//   const refreshIdToken = async () => {
//     try {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (!refreshToken) return logout();

//       const res = await axios.post("/api/refreshToken", { refreshToken });

//       localStorage.setItem("idToken", res.data.idToken);
//       return res.data.idToken;
//     } catch (err) {
//       logout();
//       return null;
//     }
//   };

//   // ------------------------------ AUTH FETCH ------------------------------
//   const authFetch = async (url, options = {}) => {
//     try {
//       let token = localStorage.getItem("idToken");

//       let res = await fetch(url, {
//         ...options,
//         headers: {
//           ...(options.headers || {}),
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (res.status !== 401) {
//         // normal response
//         return await safeJson(res);
//       }

//       // token expired → refresh
//       token = await refreshIdToken();
//       if (!token) throw new Error("Session expired");

//       // retry request
//       res = await fetch(url, {
//         ...options,
//         headers: {
//           ...(options.headers || {}),
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       return await safeJson(res);
//     } catch (err) {
//       throw err;
//     }
//   };

//   const safeJson = async (res) => {
//     try {
//       return await res.json();
//     } catch {
//       return {};
//     }
//   };

//   // ------------------------------ LOAD PROFILE ON START ------------------------------
//   useEffect(() => {
//     const token = localStorage.getItem("idToken");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     axios
//       .get("/api/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setUser({ uid: res.data.uid });
//         setProfile(res.data);
//       })
//       .catch(() => logout())
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         profile,
//         loading,
//         signup,   // <-- added here
//         login,
//         logout,
//         authFetch,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();
// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// axios.defaults.baseURL = API_BASE;

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ------------------------------
//   // Login
//   // ------------------------------
//   const login = async ({ email, password }) => {
//     const res = await axios.post("/api/login", { email, password });
//     const { idToken, refreshToken, uid, profile: profileData } = res.data;

//     localStorage.setItem("idToken", idToken);
//     localStorage.setItem("refreshToken", refreshToken);

//     setUser({ uid });
//     setProfile(profileData);

//     return { uid, profile: profileData };
//   };

//   // ------------------------------
//   // Signup
//   // ------------------------------
//   const signup = async ({ email, password, username }) => {
//     const res = await axios.post("/api/signup", { email, password, username });
//     setLoading(false);
//     return res.data;
//   };

//   // ------------------------------
//   // Logout
//   // ------------------------------
//   const logout = () => {
//     setUser(null);
//     setProfile(null);
//     localStorage.removeItem("idToken");
//     localStorage.removeItem("refreshToken");
//   };

//   // ------------------------------
//   // Authenticated Fetch
//   // ------------------------------
//   const authFetch = async (url, options = {}) => {
//     let token = localStorage.getItem("idToken");
//     if (!token) throw new Error("User not authenticated");

//     let res = await fetch(url, {
//       ...options,
//       headers: {
//         ...(options.headers || {}),
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (res.status === 401) {
//       // Token expired → refresh from backend
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (!refreshToken) {
//         logout();
//         throw new Error("Session expired");
//       }

//       const refreshRes = await axios.post("/api/refreshToken", {
//         refreshToken,
//       });
//       const { idToken: newToken } = refreshRes.data;
//       localStorage.setItem("idToken", newToken);

//       // retry request with new token
//       res = await fetch(url, {
//         ...options,
//         headers: {
//           ...(options.headers || {}),
//           Authorization: `Bearer ${newToken}`,
//           "Content-Type": "application/json",
//         },
//       });
//     }

//     return await res.json();
//   };

//   // ------------------------------
//   // Update Profile
//   // ------------------------------
//   const updateProfile = async (data) => {
//     const token = localStorage.getItem("idToken");

//     if (!token) {
//       throw new Error("User not authenticated");
//     }

//     const res = await axios.patch("/api/profile", data, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setProfile(res.data.profile);

//     return res.data.profile;
//   };

//   // ------------------------------
//   // On App Start → fetch profile
//   // ------------------------------
//   useEffect(() => {
//     const token = localStorage.getItem("idToken");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     axios
//       .get("/api/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setUser({ uid: res.data.uid });
//         setProfile(res.data);
//       })
//       .catch(() => {
//         logout();
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         profile,
//         loading,
//         setLoading,
//         login,
//         signup,
//         logout,
//         updateProfile,
//         authFetch,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

axios.defaults.baseURL = API_BASE;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------------------------------
  // Login
  // ------------------------------
  const login = async ({ email, password }) => {
    const res = await axios.post("/api/login", { email, password });
    const { idToken, refreshToken, uid, profile: profileData } = res.data;

    localStorage.setItem("idToken", idToken);
    localStorage.setItem("refreshToken", refreshToken);

    setUser({ uid });
    setProfile(profileData);

    return { uid, profile: profileData };
  };

  // ------------------------------
  // Signup
  // ------------------------------
  const signup = async ({ email, password, username }) => {
    const res = await axios.post("/api/signup", { email, password, username });
    return res.data;
  };

  // ------------------------------
  // Logout
  // ------------------------------
  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
  };

  // ------------------------------
  // Refresh ID Token (old logic, PERFECT)
  // ------------------------------
  const refreshIdToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        logout();
        return null;
      }

      const res = await axios.post("/api/refreshToken", { refreshToken });

      localStorage.setItem("idToken", res.data.idToken);
      return res.data.idToken;
    } catch (err) {
      logout();
      return null;
    }
  };

  // ------------------------------
  // Authenticated Fetch (FULL OLD STYLE)
  // ------------------------------
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

      // If NOT expired
      if (res.status !== 401) {
        return await res.json();
      }

      // If expired → refresh
      token = await refreshIdToken();
      if (!token) throw new Error("Session expired");

      // Retry request
      res = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return await res.json();
    } catch (err) {
      throw err;
    }
  };

  // ------------------------------
  // Update Profile
  // ------------------------------
  const updateProfile = async (data) => {
    const token = localStorage.getItem("idToken");

    const res = await axios.patch("/api/profile", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProfile(res.data.profile);
    return res.data.profile;
  };

  // ------------------------------
  // On App Start — Load Profile
  // ------------------------------
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
      .catch(() => {
        logout();
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        setLoading,
        login,
        signup,
        logout,
        updateProfile,
        authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
