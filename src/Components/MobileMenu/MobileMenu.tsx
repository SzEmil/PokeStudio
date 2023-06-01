import css from './MobileMenu.module.css';
import { nanoid } from '@reduxjs/toolkit';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../User/User';
import { BtnLogOut } from '../BtnLogOut/BtnLogOut';

type MobileMenuProps = {
  setIsMobileMenuOpen(type: boolean): void;
};

export const MobileMenu = ({ setIsMobileMenuOpen }: MobileMenuProps) => {
  const { isLoggedIn } = useAuth();
  return (
    <div className={`${css.mobileMenu}`}>
      <button
        className={css.btnClose}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        X
      </button>
      <nav className={css.nav}>
        <ul className={css.linksBar}>
          <li key={nanoid()} className={css.item}>
            <NavLink
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? css.activeLink : css.noActiveLink
              }
              to="/"
            >
              <span className={css.link}>HOME</span>
            </NavLink>
          </li>
          <li key={nanoid()}>
            <NavLink
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? css.activeLink : css.noActiveLink
              }
              to="/pokedex"
            >
              <span className={css.link}>Pokédex</span>
            </NavLink>
          </li>
          {!isLoggedIn ? (
            <li key={nanoid()}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? css.activeLink : css.noActiveLink
                }
                to="/register"
              >
                <span className={css.link}> Login/Register</span>
              </NavLink>
            </li>
          ) : (
            <li key={nanoid()}>
              <div className={css.user}>
                <User />
                <div className={css.userBtn}>
                  <BtnLogOut />
                </div>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
