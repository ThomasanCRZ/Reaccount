import React, { useCallback, useMemo, useState } from 'react'
import { format, subMonths, subYears, isAfter, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { PieChart, Pie, Cell, Tooltip, Customized, ResponsiveContainer } from 'recharts';
import { RxCross2 } from 'react-icons/rx';
import { IoFilterOutline } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import { motion } from 'framer-motion';

import "./Depenses.scss"

function Depenses() {

  // States
  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all'); // Filtre par défaut ( toutes les dépenses)

  // Depenses
  const depenses = useMemo(() => ([
    { date: "2024-12-01", category: "Loyer", amount: 650, service: "Maison" },
    { date: "2024-11-01", category: "Crédit", amount: 250, service: "Voiture" },
    { date: "2024-01-01", category: "Alimentation", amount: 250, service: "Supermarché" },
    { date: "2024-02-01", category: "Assurance", amount: 30, service: "Maaf" },
    { date: "2024-03-01", category: "Loisirs", amount: 20, service: "Cinema" },
    { date: "2024-04-01", category: "Restaurant", amount: 40, service: "Shalimar" },
    { date: "2024-05-01", category: "Transport", amount: 25, service: "Uber" },
    { date: "2024-06-01", category: "Loisirs", amount: 15, service: "Cinema" },
    { date: "2024-07-01", category: "Fast-food", amount: 55, service: "MacDonald" },
    { date: "2024-08-01", category: "Transport", amount: 135, service: "SNCF" },
    { date: "2024-09-01", category: "Loisirs", amount: 22, service: "Cinéma" },
    { date: "2024-10-01", category: "Abonnement", amount: 19.99, service: "Spotify" },
    { date: "2024-11-01", category: "Carburant", amount: 70, service: "Total" },
  ]), []);

  // Formater la date pour un affichage en français
  const formattedDate = (date) => {
    return format(parseISO(date), 'd MMM yyyy', { locale: fr });
  }

  // Définir les périodes en fonction du filtre sélectionné
  const today = useMemo(() => new Date(), []);

  const dateLimits = useMemo(() => ({
    currentMonth: subMonths(today, 0),
    last3Months: subMonths(today, 3),
    last6Months: subMonths(today, 6),
    lastYear: subYears(today, 1),
  }), [today]);

  // Filtre des dépenses en fonction du filtre sélectionné
  const filteredDepenses = useMemo(() => {
    return depenses.filter(({ date }) => {
      const expenseDate = parseISO(date);

      switch (selectedFilter) {
        case "currentMonth":
          return isAfter(expenseDate, dateLimits.currentMonth);
        case "last3Months":
          return isAfter(expenseDate, dateLimits.last3Months);
        case "last6Months":
          return isAfter(expenseDate, dateLimits.last6Months);
        case "lastYear":
          return isAfter(expenseDate, dateLimits.lastYear);
        default:
          return true; // "all" affiche toutes les dépenses
    }
  });
}, [depenses, selectedFilter, dateLimits]);

  // Calcul du total des depenses par categorie
  const depensesByCategory = filteredDepenses.reduce((acc, dx) => {
    const categorie = dx.category;
    acc[categorie] = (acc[categorie] || 0) + dx.amount;
    return acc;
  }, {});

  // Calcul du total des depenses
  const totalAmount = filteredDepenses.reduce((acc, dx) => acc + dx.amount, 0);

  // Formatage des données pour le graphique
  const data = Object.keys(depensesByCategory).map((categorie) => ({
    name: categorie,
    value: depensesByCategory[categorie],
  }));

  // COULEURS
  const COLORS = [
  "#A40C8B",
  "#7E22CE",
  "#5B21B6",
  "#3B0764",
  "#6366F1",
  "#2563EB",
  "#1E40AF",
  "#0E7490",
  "#9333EA",
  "#C084FC"
  ];


  // Customized Label
  const CustomizedLabel = () => {
    return (
      <> 
        <text x="50%" y="50%" dy={-10} textAnchor="middle" fontSize={14} fontWeight={600} className='sub' >
        {`Dépenses`}
      </text>
      <text x="50%" y="50%" dy={+15} textAnchor="middle" fontSize={14} fontWeight={600}>
        {`${totalAmount} €`}
      </text>
      </>
    );
  };

  // Handler
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterSelect = useCallback((filter) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  }, []);


  return (
    <div className="depenses-container">
      <motion.div
        initial={{ opacity: 0, x: -500 }}
        animate={{ opacity: 1 , x: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
      <h2>Dépenses</h2>
      <p>Suivez vos dépenses et ajustez votre budget facilement.</p>

      {/* Graphique Circulaire */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={170}>
          <div className="depenses-btn-modal" onClick={handleClick}><IoAddSharp /></div>
          <div className="depenses-btn-filter" onClick={handleFilterClick}><IoFilterOutline /></div>
          {isFilterOpen && (
            <motion.div
              className="filter-container"
              initial={{ opacity: 0 , y: -10}}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="filter-item" onClick={() => handleFilterSelect("all")}>
                <p>Tous</p>
              </div>
              <div className="filter-item" onClick={() => handleFilterSelect("currentMonth")}>
                <p>Mois actuel</p>
              </div>
              <div className="filter-item" onClick={() => handleFilterSelect("last3Months")}>
                <p>3 derniers mois</p>
              </div>
              <div className="filter-item" onClick={() => handleFilterSelect("last6Months")}>
                <p>6 derniers mois</p>
              </div>
              <div className="filter-item" onClick={() => handleFilterSelect("lastYear")}>
                <p>Dernière année</p>
              </div>
            </motion.div>
          )}
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={80}
              innerRadius={50}
              fill='#8884d8'
              isAnimationActive={true}
              cornerRadius={5}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Customized
              component={CustomizedLabel}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        {/* Légende des catégories */}
        <div className="legend-container">
          {data.map((entry, index) => (
            <div key={index} className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span className="legend-label">{entry.name}</span>
            </div>
          ))}
        </div>
        
      </div>
      <div className="depenses-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Catégorie</th>
              <th>Montant</th>
              <th>Service</th>
            </tr>
          </thead>
          <tbody>
            {filteredDepenses.map((dx, index) => (
              <motion.tr 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.7 + index * 0.1 }}
              >
                <td>{formattedDate(dx.date)}</td>
                <td>{dx.category}</td>
                <td>-{dx.amount} €</td>
                <td>{dx.service}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="depenses-modal">
          <div className="depenses-modal-content">
            <h2>Ajouter une transaction</h2>
            <div className="btn-close-modal" onClick={handleClick}><RxCross2/></div>
            <form>
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" />
              <label htmlFor="category">Catégorie</label>
              <input type="text" id="category" name="category" />
              <label htmlFor="amount">Montant</label>
              <input type="number" id="amount" name="amount" />
              <label htmlFor="service">Service</label>
              <input type="text" id="service" name="service" />
              <button type="submit">Ajouter</button>
            </form>
          </div>
        </div>
      )}
      </motion.div>
    </div>
  )
}

export default Depenses