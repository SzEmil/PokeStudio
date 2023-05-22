import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { BtnLogOut } from '../BtnLogOut/BtnLogOut';
import css from './SharedLayout.module.css';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../User/User';
import { PokeballLoader } from '../PokeballLoader/PokeballLoader';


export const SharedLayout = () => {
  const currentYear: number = new Date().getFullYear();
  const { isLoggedIn } = useAuth();
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
              {!isLoggedIn ? (
                <NavLink className={css.link} to="/register">
                  Login/Register
                </NavLink>
              ) : (
                <div className={css.user}>
                  <User />
                  <div className={css.userBtn}>
                    <BtnLogOut />
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
      <Suspense
        fallback={
          <div className={css.loaderBox}>
            <PokeballLoader />
          </div>
        }
      >
        <Outlet />
      </Suspense>
      <footer className={css.footer}>
        <div className={css.footerBox}>
          <p className={css.footerDescription}>
            <a>Resorces</a>
          </p>
          <p className={css.footerDescription}>PokeStudio © {currentYear}</p>
        </div>
      </footer>
    </div>
  );
};
