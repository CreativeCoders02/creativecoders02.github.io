import React, { useState } from "react";

export const AuthContext = React.createContext({});
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ username: "22BCY10280" });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
