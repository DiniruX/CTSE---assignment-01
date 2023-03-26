import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  /* Setting the state of the component. */
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);

/**
 * It sets the userId, userType, and userName to null.
 */
  function logout() {
    setUserId(null);
    setUserType(null);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  /* Returning the AuthContext.Provider component with the value of userType and status. */
  return (
    <AuthContext.Provider
      value={{
        userId,
        userType,
        setUserType,
        setUserId,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
