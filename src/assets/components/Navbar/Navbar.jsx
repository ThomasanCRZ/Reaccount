import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../../context/AuthContext';
import './Navbar.scss';
import Logo from '/imgs/logo/icon-reaccount.svg';
import Avatar from '../../images/Male-icon.svg';
import { RiHome6Fill } from 'react-icons/ri';
import { GrTransaction } from 'react-icons/gr';
import { BsFillCreditCardFill } from 'react-icons/bs';
import { GrMoney } from 'react-icons/gr';
import { IoSettingsSharp } from 'react-icons/io5';
import { IoCalendarNumber } from 'react-icons/io5';
import { IoLogOutOutline } from 'react-icons/io5';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.div
      className="navbar-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="navbar-name-menu-wrapper">
        <div className="navbar-name-app">
          <NavLink to="/">
            <div className="navbar-logo">
              <img src={Logo} alt="Logo Reaccount" />
            </div>
            <div className="navbar-name">
              <h2>Reaccount</h2>
              <div className="navbar-sub">
                <p>Gestionnaire de fonds</p>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="navbar-menu">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? 'navbar-menu-item active' : 'navbar-menu-item')}
          >
            <RiHome6Fill />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            to="/mensuel"
            className={({ isActive }) => (isActive ? 'navbar-menu-item active' : 'navbar-menu-item')}
          >
            <IoCalendarNumber />
            <p>Mensuel</p>
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) => (isActive ? 'navbar-menu-item active' : 'navbar-menu-item')}
          >
            <GrTransaction />
            <p>Transactions</p>
          </NavLink>
          <NavLink
            to="/depenses"
            className={({ isActive }) => (isActive ? 'navbar-menu-item active' : 'navbar-menu-item')}
          >
            <BsFillCreditCardFill />
            <p>Dépenses</p>
          </NavLink>
          <NavLink
            to="/epargnes"
            className={({ isActive }) => (isActive ? 'navbar-menu-item active' : 'navbar-menu-item')}
          >
            <GrMoney />
            <p>Épargnes</p>
          </NavLink>
          <NavLink
            to="/parametres"
            className={({ isActive }) => (isActive ? 'navbar-menu-item active' : 'navbar-menu-item')}
          >
            <IoSettingsSharp />
            <p>Paramètres</p>
          </NavLink>
        </div>
      </div>
      <div className="navbar-log-infos">
        <div className="navbar-log-img">
          {user && user.img ? (
            <img src={user.img} alt={`Avatar de ${user.firstname}`} />
          ) : (
            <img src={Avatar} alt="Avatar par défaut" />
          )}
        </div>
        <div className="navbar-log-user">
          <div className="navbar-log-name">
            <p>{user ? user.firstname : 'John'}</p>
          </div>
          <div className="navbar-log-email">
            <p>{user ? user.email : 'JohnDoe@Reaccount.com'}</p>
          </div>
        </div>
        {user && (
          <button onClick={handleLogout} className="navbar-logout-btn" aria-label="Se déconnecter">
            <IoLogOutOutline />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default Navbar;