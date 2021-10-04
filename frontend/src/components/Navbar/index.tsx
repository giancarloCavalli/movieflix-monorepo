import { AuthContext } from "AuthContext";
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getTokenData, isAuthenticated } from "utils/auth";
import { removeAuthData } from "utils/storage";
import "./styles.css";

const Navbar = () => {

  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData()
      })
    } else {
      setAuthContextData({
        authenticated: false
      })
    }
  },[setAuthContextData]);

  return (
    <div className="navbar-container">
      <NavLink to="/" exact>
        <h2>MovieFlix</h2>
      </NavLink>
      <span className="navbar-login">
        { authContextData.authenticated ? (
            <a href="/" onClick={removeAuthData}>SAIR</a>
          ) : (
            <span></span>
          )}
      </span>
    </div>
  );
};

export default Navbar;
