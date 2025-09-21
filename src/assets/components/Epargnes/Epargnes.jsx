import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCar, FaLaptop, FaTools, FaPlane, FaHome, FaPiggyBank, FaShoppingCart, FaHeart, FaDumbbell, FaUtensils, FaGift, FaGamepad, FaMusic, FaTrash, FaRegTrashAlt } from "react-icons/fa";
import { MdPets, MdWork, MdOutlineSportsSoccer, MdHealthAndSafety } from "react-icons/md";
import { GiGraduateCap, GiConsoleController, GiTicket, GiBookshelf } from "react-icons/gi";
import { SlOptionsVertical } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import "./Epargnes.scss"

function Epargnes() {
  const [addGoal, setAddGoal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [addIcon, setAddIcon] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
 

  const [goals, setGoals] = useState([
    {id: 1, name: "Voyage", icon: <FaPlane />, amount: 5000, savedAmount:550},
    {id: 2, name: "Réparation voiture", icon: <FaCar />, amount: 1500, savedAmount:1250},
    {id: 3, name: "Ordinateur", icon: <FaLaptop />, amount: 1700, savedAmount:600}
  ]);

  const iconList = [
    { id: 1, icon: <FaCar />, name: "Voiture" },
    { id: 2, icon: <FaLaptop />, name: "Ordinateur" },
    { id: 3, icon: <FaTools />, name: "Outils" },
    { id: 4, icon: <FaPlane />, name: "Voyage" },
    { id: 5, icon: <FaHome />, name: "Maison" },
    { id: 6, icon: <FaPiggyBank />, name: "Épargne" },
    { id: 7, icon: <FaShoppingCart />, name: "Shopping" },
    { id: 8, icon: <FaHeart />, name: "Santé" },
    { id: 9, icon: <MdHealthAndSafety />, name: "Médical" },
    { id: 10, icon: <FaDumbbell />, name: "Sport" },
    { id: 11, icon: <FaUtensils />, name: "Nourriture" },
    { id: 12, icon: <FaGift />, name: "Cadeaux" },
    { id: 13, icon: <GiConsoleController />, name: "Jeux vidéo" },
    { id: 14, icon: <FaGamepad />, name: "Consoles" },
    { id: 15, icon: <FaMusic />, name: "Musique" },
    { id: 16, icon: <MdPets />, name: "Animaux" },
    { id: 17, icon: <GiGraduateCap />, name: "Éducation" },
    { id: 18, icon: <MdWork />, name: "Travail" },
    { id: 19, icon: <MdOutlineSportsSoccer />, name: "Football" },
    { id: 20, icon: <GiTicket />, name: "Événements" },
    { id: 21, icon: <GiBookshelf />, name: "Livres" }
  ]

  // Fonction pour calculer le pourcentage
  const calculateProgress = (amount, savedAmount) => {
    return (savedAmount / amount) * 100;
  }

  // Fonction pour ajouter un nouvel objectif
  const handleAddGoal = () => {
    setSelectedGoal(null);
    setSelectedIcon(null);
    setAddGoal(!addGoal);
  }

  const handleEditGoal = (goal) => {
    setSelectedGoal(goal);
    setSelectedIcon(goal.icon);
    setAddGoal(!addGoal);
  }
  const handleAddIcon = () =>{
    setAddIcon(!addIcon);
  }

  const handleSelectIcon = (icon) => {
    setSelectedIcon(icon);
    setAddIcon(false);
  }


  const handleSaveGoal = () => {
    const name = document.getElementById("name").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const savedAmount = parseFloat(document.getElementById("amount-saved").value);
  
    if (!name || isNaN(amount) || isNaN(savedAmount)) {
      alert("Veuillez remplir tous les champs correctement");
      return;
    }
  
    if (selectedGoal) {
      setGoals(goals.map((goal) =>
        goal.id === selectedGoal.id ? { ...goal, name, amount, savedAmount } : goal
      ));
    } else {
      const newGoal = {
        id: goals.length + 1,
        name,
        amount,
        savedAmount,
        icon: selectedIcon || <FaTools /> // Ajoute l'icône par défaut
      };
      setGoals([...goals, newGoal]);
    }
  
    setAddGoal(false);
    setSelectedGoal(null);
    setSelectedIcon(null);
  };

  return (
    <div className="epargnes-container">
      <motion.div
        initial={{ opacity: 0, x: -500}}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <h2>Épargnes</h2>
        <p>Créez des objectifs d’épargne et suivez leur progression.</p>

        <div className="epargnes-btn" onClick={handleAddGoal}>
          <p>Créez un nouvel objectif</p>
        </div>

        <div className="epargnes-goals-container">
          {goals.map((goal) => (
            <div className="epargnes-goals-item" key={goal.id}>
              <div className="epargnes-goals-item-btn-update" onClick={() => handleEditGoal(goal)}><SlOptionsVertical /></div>
              <div className="epargnes-goals-item-btn-delete"><FaRegTrashAlt /></div>
              <div className="epargnes-goals-header">
                <div className="epargnes-goals-header-icon">
                  {goal.icon}
                </div>
                <h3>{goal.name}</h3>
              </div>
              <div className="epargnes-goals-progress-bar">
                <motion.div
                  className="epargnes-goals-progress"
                  initial={{ width: "0%" }}
                  animate={{ width: `${calculateProgress(goal.amount, goal.savedAmount)}%` }}
                  transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
                >
                  <span className='epargnes-goals-progress-percentage'> {Math.round(calculateProgress(goal.amount, goal.savedAmount))}%</span>
                </motion.div>
              </div>
              <div className="epargnes-goals-amount">
                <p>{goal.savedAmount}€ / {goal.amount}€</p>
              </div>
            </div>
          ))}

          {/* Ajout et modification de l'objectif */}
          {addGoal && (
            <motion.div
             className="epargnes-goals-modal-container"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.7, ease: "easeInOut" }}
             >
              <div className="epargnes-goals-modal-content">
                <h3>{selectedGoal ? "Modifier l'objectif" : "Ajouter un nouvel objectif"}</h3>
                <div className="epargnes-goals-modal-btn-close"><RxCross2 onClick={handleAddGoal} /></div>
                <div className="epargnes-goals-modal-btn-icon" onClick={handleAddIcon}>{ selectedIcon || <FaTools/>}</div>
                {addIcon  && (
                  <motion.div
                    className="epargnes-goals-modal-icon-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  >
                    {iconList.map((icon) => (
                      <div className="epargnes-goals-modal-icon-item" key={icon.id} onClick={() => handleSelectIcon(icon.icon)}>
                          {icon.icon}
                      </div>  
                    ))}
                  </motion.div>
                )}
                <label htmlFor="name">Nom </label>
                <input type="text" id='name' defaultValue={selectedGoal?.name || ""}/>
                <label htmlFor="amount">Montant </label>
                <input type="number" id='amount' defaultValue={selectedGoal?.amount || ""}/>
                <label htmlFor="amount-saved">Montant déja épargné </label>
                <input type="number" id='amount-saved' defaultValue={selectedGoal?.savedAmount || ""}/>
                <button onClick={handleSaveGoal}>{selectedGoal ? "Modifier" : "Ajouter"}</button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

    </div>
  )
}

export default Epargnes