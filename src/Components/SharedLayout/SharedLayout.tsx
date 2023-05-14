import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { BtnLogOut } from '../BtnLogOut/BtnLogOut';
import css from './SharedLayout.module.css';

export const SharedLayout = () => {
  return (
    <div>
      <header className={css.head}>
        <div className={css.headWrapper}>
          <NavLink className={css.logo} to="/">
            Poke<span className={css.logoColor}>Studio</span>
          </NavLink>
          <nav className={css.nav}>
            <div className={css.linksBar}>
              <NavLink className={css.link} to="/">
                HOME
              </NavLink>
              <NavLink
                className={css.link}
                style={{ color: 'grey', pointerEvents: 'none' }}
                to="/pokedex"
              >
                Poke-Dex
              </NavLink>
              <NavLink className={css.link} to="/login">
                Login
              </NavLink>
              <NavLink className={css.link} to="/register">
                Register
              </NavLink>
              <BtnLogOut />
            </div>
          </nav>
        </div>
      </header>
      <Suspense fallback={<div>Loading components...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
