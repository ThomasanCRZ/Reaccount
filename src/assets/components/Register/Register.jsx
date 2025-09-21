import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../../config/api.jsx";
import { motion } from "framer-motion";
import { AuthContext } from '../../../context/AuthContext';
import "./Register.scss";
import LoginSvg from "../../images/Sign-up.svg";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Loader from "../Loader/Loader.jsx";

function Register() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    firstname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        navigate("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setErrorMessage("Le nom est requis.");
      return false;
    }
    if (!form.firstname.trim()) {
      setErrorMessage("Le prénom est requis.");
      return false;
    }
    if (!form.email.includes("@") || !form.email.includes(".")) {
      setErrorMessage("Veuillez entrer une adresse email valide.");
      return false;
    }
    if (form.password.length < 8) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
      return false;
    }
    if (form.password !== form.password_confirmation) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch( API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Réponse de /api/register:", data);

      if (res.ok) {
        login(data.user, data.token);
        setSuccessMessage(data.message || "Inscription réussie !");
        setIsOpen(true);
      } else {
        setErrorMessage(
          data.message ||
          Object.values(data.errors || {}).flat().join(" ") ||
          "Une erreur s'est produite lors de l'inscription."
        );
      }
    } catch (error) {
      setErrorMessage("Erreur de connexion au serveur.");
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <motion.div
        initial={{ opacity: 0, y: 500 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <h2>Inscription</h2>
        <div className="register-content">
          <form onSubmit={handleSubmit} className="register-form">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              name="name"
              placeholder="Doe"
              value={form.name}
              onChange={handleChange}
              aria-label="Votre nom"
              required
            />
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              name="firstname"
              placeholder="John"
              value={form.firstname}
              onChange={handleChange}
              aria-label="Votre prénom"
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="JohnDoe@mail.com"
              value={form.email}
              onChange={handleChange}
              aria-label="Votre email"
              required
            />
            <label htmlFor="password">Mot de passe</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                aria-label="Votre mot de passe"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="password-icon"
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
            <label htmlFor="password_confirmation">Confirmer le mot de passe</label>
            <div className="confirm-password-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                aria-label="Confirmez votre mot de passe"
                required
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="confirm-password-icon"
              >
                {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" disabled={isLoading} aria-label="S'inscrire">
              {isLoading ? <Loader loading={isLoading} /> : "S'inscrire"}
            </button>
            <p className="already-account">
              Vous avez déjà un compte ? <a href="/login">Se connecter</a>
            </p>
          </form>
          <div className="register-img">
            <img src={LoginSvg} alt="Illustration d'inscription" />
          </div>
        </div>

        {isOpen && (
          <motion.div
            className="register-modal-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="register-modal-content">
              <p className="success-message">{successMessage}</p>
              <p>Redirection vers votre espace personnel...</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Register;