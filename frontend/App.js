import React from "react";
import { AuthContextProvider } from "./Screens/Context/UserContext";
import AppNav from "./Screens/Navigation/AppNav";

function App() {
  return (
    <AuthContextProvider>
      <AppNav/>
    </AuthContextProvider>
  );
}

export default App;