import { AuthContexData, AuthContext } from "AuthContext";
import { useState } from "react";
import Routes from "routes";
import "./App.css";

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContexData>({
    authenticated: false,
  });

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <div className="App">
        <Routes />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
