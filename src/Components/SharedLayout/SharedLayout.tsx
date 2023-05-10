import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
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
              <NavLink className={css.link} to="/pokedex">
                Poke-Dex
              </NavLink>
              <NavLink className={css.link} to="/">
                My account
              </NavLink>
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
