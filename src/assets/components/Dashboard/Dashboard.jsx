import React from 'react'
import { motion } from 'framer-motion'
import Transaction from '../Transactions/Transactions.jsx'
import Depenses from '../Depenses/Depenses.jsx'
import Epargnes from '../Epargnes/Epargnes.jsx'
import "./Dashboard.scss"

function Dashboard() {

  //Récupération de l'utilisateur connecté
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-container">
      <motion.div
      initial={{ opacity: 0, x: -500 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <h2>Dashboard</h2>
        <p>Une vision globale de votre compte ! </p>
        {user && <p>Bienvenue, {user.firstname}</p>}
        <div className="dashboard-content">
          <div className="depenses-container"></div>
          <div className="monthly-container"></div>
          <div className="transactions-container"></div>
          <div className="epargnes-container"></div>
        </div>
        </motion.div>
    </div>
  )
}

export default Dashboard