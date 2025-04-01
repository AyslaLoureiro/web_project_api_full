import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import "../blocks/sign.css";

const Login = ({ handleLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  return (
    <div className="sign">
      <Header text="Inscreva-se" />
      <p className="sign__welcome">Entrar</p>
      <form className="sign__form" onSubmit={handleSubmit}>
        <div className="sign__form-input">
          <label htmlFor="email">Login:</label>
          <input
            placeholder="E-mail"
            className="sign__input"
            id="email"
            required
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Senha:</label>
          <input
            placeholder="Senha"
            className="sign__input"
            id="password"
            required
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div className="sign__button-container">
          <button type="submit" className="sign__link">
            Entrar
          </button>
        </div>
      </form>

      <div className="sign__signup">
        <p className="sign__text">Ainda não é membro?</p>
        <Link to="/register" className="sign__redirect-link">
          Inscreva-se aqui
        </Link>
      </div>
    </div>
  );
};

export default Login;
