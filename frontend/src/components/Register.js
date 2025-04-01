import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import "../blocks/sign.css";

const Register = ({ handleRegistration }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    if (!data.email || !data.password) {
      setError("Todos os campos são obrigatórios");
      return;
    }
    handleRegistration(data);
    setError("");
  };

  return (
    <div className="sign">
      <Header text="Faça o login" />
      <p className="sign__welcome">Inscrever-se</p>
      <form className="sign__form" onSubmit={handleSubmit}>
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
        <div className="sign__button-container">
          <button type="submit" className="sign__link">
            Inscrever-se
          </button>
        </div>
      </form>

      <div className="sign__signup">
        <p className="sign__text">Já é um membro?</p>
        <Link to="/login" className="sign__redirect-link">
          Faça o login aqui!
        </Link>
      </div>
    </div>
  );
};

export default Register;
