import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(true);

  console.log(user);
 
  function logout() {
    setUser(false);
  }

  return (
    <AuthContext.Provider value={{ user, setUser,  logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthContextProvider, useAuth };
