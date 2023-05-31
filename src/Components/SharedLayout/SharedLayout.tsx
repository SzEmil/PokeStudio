import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { BtnLogOut } from '../BtnLogOut/BtnLogOut';
import css from './SharedLayout.module.css';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../User/User';
import { PokeballLoader } from '../PokeballLoader/PokeballLoader';
import { useState } from 'react';
import { Recorces } from '../Recorses/Recorces';

export const SharedLayout = () => {
  const currentYear: number = new Date().getFullYear();
  const { isLoggedIn } = useAuth();
  const [isRecorcesOpen, setIsRecorcesOpen] = useState(false);
  return (
    <div>
      <header className={css.head}>
        <div className={css.headWrapper}>
          <NavLink className={css.logo} to="/">
            Poke<span className={css.logoColor}>Studio</span>
          </NavLink>
          <nav className={css.nav}>
            <div className={css.linksBar}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? css.activeLink : css.noActiveLink
                }
                to="/"
              >
                <span className={css.link}>HOME</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? css.activeLink : css.noActiveLink
                }
                to="/pokedex"
              >
                <span className={css.link}>Pokédex</span>
              </NavLink>
              {!isLoggedIn ? (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? css.activeLink : css.noActiveLink
                  }
                  to="/register"
                >
                  <span className={css.link}> Login/Register</span>
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
            <p
              className={css.footerLink}
              onClick={() => setIsRecorcesOpen(prevVal => !prevVal)}
            >
              Resorces
            </p>
          </p>
          <p className={css.footerDescription}>PokeStudio © {currentYear}</p>
        </div>
      </footer>
      {isRecorcesOpen ? <Recorces /> : null}
    </div>
  );
};
