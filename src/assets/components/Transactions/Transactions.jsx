import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../../context/AuthContext';
import { API_ENDPOINTS } from '../../../config/api';
import { RxCross2 } from 'react-icons/rx';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import Loader from '../Loader/Loader';
import './Transactions.scss';

function Transactions() {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    type: 'positive', 
    amount: '',
    category: '',
    service: '',
    date: '',
  });

  useEffect(() => {
  const fetchTransactions = async () => {
    if (!user) return; // Skip si pas connecté

    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch(API_ENDPOINTS.TRANSACTIONS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`, // Token de AuthContext
        },
      });

      const data = await res.json();
      console.log('Transactions fetched:', data); // Pour debug

      if (res.ok && data.success) {
        setTransactions(data.data || []); // data.data est le array de transactions
      } else {
        setErrorMessage(data.message || 'Erreur lors du chargement des transactions.');
      }
    } catch (error) {
      setErrorMessage('Erreur de connexion au serveur.');
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchTransactions();
}, [user]);


  const validateForm = () => {
    if (!form.type) {
      setErrorMessage('Le type de transaction est requis.');
      return false;
    }
    if (!form.amount || form.amount <= 0) {
      setErrorMessage('Le montant doit être un nombre positif.');
      return false;
    }
    if (!form.category.trim()) {
      setErrorMessage('La catégorie est requise.');
      return false;
    }
    if (!form.service.trim()) {
      setErrorMessage('Le service est requis.');
      return false;
    }
    if (!form.date) {
      setErrorMessage('La date est requise.');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch(API_ENDPOINTS.TRANSACTIONS_CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log('Réponse de /api/transactions:', data);

      if (res.ok) {
        setSuccessMessage(data.message || 'Transaction ajoutée avec succès !');
        setIsOpen(true);
      } else {
        setErrorMessage(data.message || 'Une erreur s’est produite lors de l’ajout de la transaction.');
      }
    } catch (error) {
      setErrorMessage('Erreur de connexion au serveur.');
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const formattedDate = (date) => {
    try {
      return format(parseISO(date), 'd MMM yyyy', { locale: fr });
    } catch (error) {
      console.error('Erreur de formatage de date:', error);
      return date;
    }
  };

  // Données statiques pour la démo (si non connecté)
  const demoTransactions = [
    { id: 1, date: '2024-01-01', category: 'Salaire', amount: 1750, service: 'Meta', type: 'positive' },
    { id: 2, date: '2024-12-01', category: 'Loyer', amount: 650, service: 'Maison', type: 'negative' },
    { id: 3, date: '2024-11-01', category: 'Crédit', amount: 250, service: 'Voiture', type: 'negative' },
    { id: 4, date: '2024-01-01', category: 'Alimentation', amount: 250, service: 'Supermarché', type: 'negative' },
    { id: 5, date: '2024-02-01', category: 'Assurance', amount: 30, service: 'Maaf', type: 'negative' },
    { id: 6, date: '2024-06-01', category: 'Dépôt', amount: 350, service: 'Chèque', type: 'positive' },
    { id: 7, date: '2024-03-01', category: 'Loisirs', amount: 20, service: 'Cinéma', type: 'negative' },
    { id: 8, date: '2024-04-01', category: 'Restaurant', amount: 40, service: 'Shalimar', type: 'negative' },
    { id: 9, date: '2024-05-01', category: 'Transport', amount: 25, service: 'Uber', type: 'negative' },
    { id: 10, date: '2024-06-01', category: 'Loisirs', amount: 15, service: 'Cinéma', type: 'negative' },
    { id: 11, date: '2024-07-01', category: 'Fast-food', amount: 55, service: 'MacDonald', type: 'negative' },
    { id: 12, date: '2024-08-01', category: 'Transport', amount: 135, service: 'SNCF', type: 'negative' },
    { id: 13, date: '2024-09-01', category: 'Loisirs', amount: 22, service: 'Cinéma', type: 'negative' },
    { id: 14, date: '2024-10-01', category: 'Abonnement', amount: 19.99, service: 'Spotify', type: 'negative' },
    { id: 15, date: '2024-11-01', category: 'Carburant', amount: 70, service: 'Total', type: 'negative' },
  ];

  return (
    <div className="transactions-container">
      <motion.div
        initial={{ opacity: 0, x: -500 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        <h2>Transactions</h2>
        <p>Ne perdez plus le fil de vos achats et paiements.</p>
        <div className="transactions-btn" onClick={handleClick}>
          <p>Ajouter une transaction</p>
        </div>
        {isLoading && <Loader />}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="transactions-table">
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
              {user ? (
                transactions.length > 0 ? (
                  transactions.map((tx, index) => (
                    <motion.tr
                      key={tx.id || index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.5 + index * 0.1 }}
                    >
                      <td>{formattedDate(tx.date)}</td>
                      <td>{tx.category}</td>
                      <td className={tx.type === 'negative' ? 'negative' : 'positive'}>
                        {tx.type === 'negative' ? '-' : '+'}
                        {parseFloat(tx.amount).toFixed(2)} €
                      </td>
                      <td>{tx.service}</td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', opacity: 0.6 }}>
                      Aucune transaction pour l’instant
                    </td>
                  </tr>
                )
              ) : (
                demoTransactions.map((tx, index) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.5 + index * 0.1 }}
                  >
                    <td>{formattedDate(tx.date)}</td>
                    <td>{tx.category}</td>
                    <td className={tx.type === 'negative' ? 'negative' : 'positive'}>
                      {tx.type === 'negative' ? '-' : '+'}
                      {parseFloat(tx.amount).toFixed(2)} €
                    </td>
                    <td>{tx.service}</td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {isOpen && (
          <div className="transactions-modal">
            <div className="transactions-modal-content">
              <h2>Ajouter une transaction</h2>
              <div className="btn-close-modal">
                <RxCross2 onClick={handleClick} aria-label="Fermer le modal" />
              </div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  aria-label="Type de transaction"
                >
                  <option value="positive">Revenu</option>
                  <option value="negative">Dépense</option>
                </select>
                <label htmlFor="amount">Montant (€)</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  aria-label="Montant de la transaction"
                  required
                />
                <label htmlFor="category">Catégorie</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Ex: Alimentation"
                  aria-label="Catégorie de la transaction"
                  required
                />
                <label htmlFor="service">Service</label>
                <input
                  type="text"
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  placeholder="Ex: Supermarché"
                  aria-label="Service de la transaction"
                  required
                />
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  aria-label="Date de la transaction"
                  required
                />
                {errorMessage && <p className="error">{errorMessage}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <button type="submit" disabled={isLoading} aria-label="Valider la transaction">
                  {isLoading ? <Loader /> : 'Valider'}
                </button>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Transactions;