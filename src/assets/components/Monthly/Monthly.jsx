// Importation des hooks React nécessaires et des composants de graphiques (recharts) et animation (framer-motion)
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import "./Monthly.scss";
import { RxCross2 } from "react-icons/rx";

function Monthly() {
  // Déclaration du salaire de l'utilisateur (modifiable dans le futur via un input )
  const [salary, setSalary] = useState(2000);
  const [tempSalary, setTempSalary] = useState(salary);

  // Déclaration des différentes catégories de dépenses, avec name, color et details (label + montant)
  const [expenses, setExpenses] = useState([
    {
        name: 'Loyer',
        color: '#2563EB',
        details: [
          { label: 'Loyer mensuel', amount: 700 }
        ]
    },
    {
        name: 'Crédit',
        color: '#10B981',
        details: [
          { label: 'Crédit voiture', amount: 200 },
          { label: 'Crédit téléphone', amount: 100 }
        ]
    },
    {
      name: 'Assurance',
      color: '#EF4444',
      details: [
        { label: 'Assurance voiture', amount: 50 },
        { label: 'Assurance maison', amount: 100 }
      ]
    },
    {
      name: 'Abonnement',
      color: '#7E22CE',
      details: [
        { label: 'Netflix', amount: 15 },
        { label: 'Spotify', amount: 10 },
        { label: 'Internet', amount: 30 },
        { label: 'Xbox Game Pass', amount: 15 },
        { label: 'Adobe', amount: 50 },
      ]
    },
    {
      name: 'Autres',
      color: '#F59E0B',
      details: [
        { label: 'Essence', amount: 100 }
      ]
    }
  ]);

  const [tempExpenses, setTempExpenses] = useState(expenses);

  // Gestion Modal
  const [showModalSalary, setShowModalSalary] = useState(false);
  const [showModalExpense, setShowModalExpense] = useState(false);

  const handleModalSalary = () => {
    setShowModalSalary(!showModalSalary);
  }

  const handleModalExpense = () => {
    setShowModalExpense(!showModalExpense);
  }

  const addSalary = () => {
      setSalary(tempSalary);
      handleModalSalary(false);
  }
  // Calcul dynamique du montant total pour chaque catégorie de dépenses
  const calculatedExpenses = expenses.map(expense => {
    const value = expense.details.reduce((acc, detail) => acc + detail.amount, 0); // Additionne tous les montants
    return { ...expense, value }; // Retourne l'objet avec le total "value" ajouté
  });

  // Calcul du total de toutes les dépenses (optimisé avec useMemo pour éviter les recalculs inutiles)
  const totalExpenses = useMemo(() => {
    return calculatedExpenses.reduce((acc, expense) => acc + expense.value, 0);
  }, [calculatedExpenses]);

  // Calcul du montant restant après déduction des dépenses
  const remaining = salary - totalExpenses;

  // Préparation des données pour le graphique en camembert
  const data = [
    ...calculatedExpenses, // Ajout de toutes les catégories de dépenses
    { name: 'Salaire restant', value: remaining > 0 ? remaining : 0, color: '#A3E635' } // Si négatif, on met 0 pour ne pas fausser le graphique
  ];


  return (
    <div className="monthly-container">
      {/* Animation d’entrée avec framer-motion */}
      <motion.div
        initial={{ opacity: 0, x: -500 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {/* Titre et description */}
        <h2>Mensuel</h2>
        <p>Votre salaire et vos dépenses mensuelles.</p>

        {/* Affichage du salaire actuel */}
        <div className="monthly-add-salary" onClick={handleModalSalary}>
          <p>Salaire actuel : {salary} €</p>
        </div>

        {/* Message d’avertissement si les dépenses dépassent le salaire */}
        {remaining < 0 && (
          <p className="monthly-warning">
            ⚠️ Attention, vos dépenses dépassent votre salaire de {Math.abs(remaining)} € !
          </p>
        )}

        {/* Graphique circulaire des dépenses + salaire restant */}
        <div className="monthly-salary-depenses">
          <PieChart width={400} height={400}>
            <Pie
              data={data} // Données à afficher
              cx="50%" // Position horizontale du centre
              cy="50%" // Position verticale du centre
              outerRadius={100} // Rayon extérieur
              innerRadius={75} // Rayon intérieur (donut style)
              paddingAngle={2} // Espace entre chaque part
              cornerRadius={5} // Arrondi des coins
              fill="#8884d8"
              dataKey="value" // Clé utilisée pour les valeurs
              label // Affiche les labels
            >
              {/* Attribution des couleurs à chaque catégorie */}
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {/* Affichage d'un tooltip au survol */}
            <Tooltip />
          </PieChart>
            {/* Légende des catégories de dépenses avec couleurs associées */}
            <div className="monthly-legend">
            {data.map((entry, index) => (
                <div key={index} className="legend-item">
                <div
                    className="color-box"
                    style={{ backgroundColor: entry.color }}
                />
                <span>{entry.name}</span>
                </div>
            ))}
            </div>
        </div>

        {/* Détails complets des dépenses par catégorie */}
        <motion.div
          initial={{ opacity: 0, y: 500 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.7 }}
        >
        <div className="monthly-details">
          {calculatedExpenses.map((expense, index) => (
            <div key={index} className="category-details" style={{'--hover-color': `${expense.color}`}}>
              {/* Nom de la catégorie + total en € */}
              <h4>{expense.name} - {expense.value} €</h4>
              {/* Liste de tous les sous-détails de la catégorie */}
              <ul>
                {expense.details.map((detail, i) => (
                  <li key={i}>
                    {detail.label} : {detail.amount} €
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </motion.div>
      </motion.div>

          {/* Modal de modification du salaire */}
          {showModalSalary && (
            <div className="add-salary-modal">
              <div className="add-salary-modal-content">
                <div className="btn-close-modal" onClick={handleModalSalary}><RxCross2/></div>
                <h2>Modifier mon salaire</h2>
                <form action="">
                    <div className="add-salary-modal-input">
                        <label htmlFor="amount-salary">Montant :</label>
                        <input
                        id="amount-salary"
                        type="number"
                        value={tempSalary}
                        onChange={(e) => setTempSalary(e.target.value)}
                        />
                    </div>
                    
                    <button type="submit" onClick={addSalary}>Valider</button>
                </form>
              </div>
            </div>
          )}
    </div>
  );
}

export default Monthly;
