import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';
import { API_ENDPOINTS } from "../../../config/api.jsx";
import { motion } from "framer-motion";
import { IoEye, IoEyeOff } from "react-icons/io5";
import "./Login.scss";
import LoginSvg from "../../images/Login.svg";
import Loader from "../Loader/Loader.jsx";

function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!form.email.includes("@") || !form.email.includes(".")) {
      setErrorMessage("Veuillez entrer une adresse email valide.");
      return false;
    }
    if (form.password.length < 8) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const loginRes = await fetch( API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const loginData = await loginRes.json();
      console.log("Réponse de /api/login:", loginData);

      if (loginRes.ok) {
        login(loginData.user, loginData.token);
        navigate("/dashboard");
      } else {
        setErrorMessage(loginData.email?.[0] || loginData.message || "Email ou mot de passe incorrect.");
      }
    } catch (error) {
      setErrorMessage("Erreur de connexion au serveur.");
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, y: 500 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <h2>Se connecter</h2>
        <div className="login-content">
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              aria-label="Votre email"
              required
            />

            <label htmlFor="password">Mot de passe</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                aria-label="Votre mot de passe"
                required
              />
              <span className="password-icon">
                {showPassword ? (
                  <IoEyeOff onClick={() => setShowPassword(false)} />
                ) : (
                  <IoEye onClick={() => setShowPassword(true)} />
                )}
              </span>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" disabled={isLoading} aria-label="Se connecter">
              {isLoading ? <Loader loading={isLoading} /> : "Se connecter"}
            </button>
            <p className="no-account">
              Vous n'avez pas de compte ? <a href="/register">S'inscrire</a>
            </p>
          </form>
          <div className="login-img">
            <img src={LoginSvg} alt="Illustration de connexion" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;