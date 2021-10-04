import LoginCard from "components/LoginCard";
import { ReactComponent as LoginImage } from "assets/images/login-content.svg";

import "./styles.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Avalie Filmes</h1>
        <div className="login-content-text">Diga o que você achou do seu filme favorito</div>
        <div className="login-image-wrapper">
          <LoginImage />
        </div>
      </div>
      <div className="login-wrapper">
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
