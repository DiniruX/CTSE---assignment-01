import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  /* Setting the state of the component. */
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState("636608378b984d338dde3d4a");
  const [userName, setUserName] = useState("Chathuni");
  const [vehicleOwnerBlock, setVehicleOwnerBlock] = useState(false);

  function setType(type) {
    setUserType(type);
  }

  function logout() {
    setUserType(null);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  /* Returning the AuthContext.Provider component with the value of userType and status. */
  return (
    <AuthContext.Provider
      value={{
        userId,
        userType,
        userName,
        vehicleOwnerBlock,
        setType,
        setUserId,
        setUserName,
        logout,
        setVehicleOwnerBlock,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
