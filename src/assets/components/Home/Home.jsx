import React from 'react'
import "./Home.scss"
import { motion } from 'framer-motion'
import Grafik from '../../images/Grafik.svg'
import Search from '../../images/Search.svg'
import Calendar from '../../images/Calendar.svg'
import Saving from '../../images/Saving.svg'
export default function  Home() {

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  return (
    <div className="home-container">
      <motion.div
      initial={{ opacity: 0, y: 500 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      
      >
        <h1>Vos finances en un seul endroit</h1>
        <span className='h1-span'> La simplicité vous attend !</span>
        <div className="home-hero">
          <div className="home-hero-text">
              <h2>Avec Reaccount gérez votre budget facilement et atteignez vos objectifs.</h2>
              <span className='h2-span'>Suivez vos dépenses, vos transactions, regroupez vos économies et planifiez votre épargne et tout cela gratuitement avec Reaccount.</span>
          </div>
          <div className='home-hero-img'>
              <img src={Grafik} alt="Grafik" />
          </div>
        </div>
        <div className="home-benefits-container">
          <div className="home-benefit-item">
              <div className="home-benefit-item-img">
                  <img src={Search} alt="" />
              </div>
              <h3>Suivi simple et rapide</h3>
              <span>Visualisez vos dépenses et revenus en temps réel, sans complications.</span>
          </div>
          <div className="home-benefit-item">
              <div className="home-benefit-item-img">
                  <img src={Calendar} alt="" />
              </div>
              <h3>Planification personnalisée</h3>
              <span>Créez des budgets sur mesure pour vos projets, voyages ou épargne.</span>
          </div>
          <div className="home-benefit-item">
              <div className="home-benefit-item-img">
                  <img src={Saving} alt="" />
              </div>
              <h3>100% Gratuit</h3>
              <span>Commencez sans frais, sans carte bancaire, et profitez de toutes les fonctionnalités.</span>
          </div>
        </div>
        <a href={user ? "/dashboard" : "/login"} className='home-cta'>Commencer gratuitement</a>
      </motion.div>
    </div>
  )
}