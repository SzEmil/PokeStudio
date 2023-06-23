import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { BtnLogOut } from '../BtnLogOut/BtnLogOut';
import css from './SharedLayout.module.css';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../User/User';
import { PokeballLoader } from '../PokeballLoader/PokeballLoader';
import { useState } from 'react';
import { Recorces } from '../Recorses/Recorces';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MobileMenu } from '../MobileMenu/MobileMenu';

export const SharedLayout = () => {
  const currentYear: number = new Date().getFullYear();
  const { isLoggedIn } = useAuth();
  const [isRecorcesOpen, setIsRecorcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    setIsMobileMenuOpen(false);
  });

  return (
    <div>
      <header className={css.head}>
        <div className={css.headWrapper}>
          <p className={css.version}>Alpha 1.3</p>
          <NavLink className={css.logo} to="/">
            Poké<span className={css.logoColor}>Studio</span>
          </NavLink>

          <nav className={css.nav}>
            <div
              className={css.menuMobileBtn}
              onClick={() => setIsMobileMenuOpen(prevVal => !prevVal)}
            >
              <RxHamburgerMenu size={'24px'} />
            </div>
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
          <div className={css.footerDescription}>
            <p
              className={css.footerLink}
              onClick={() => setIsRecorcesOpen(prevVal => !prevVal)}
            >
              Resorces
            </p>
          </div>
          <p className={css.footerDescription}>PokeStudio © {currentYear}</p>
        </div>
      </footer>

      {isRecorcesOpen ? <Recorces /> : null}
      <div
        className={`${css.mobileMenuBox} ${
          isMobileMenuOpen ? css.mobileOpen : null
        }`}
      >
        <MobileMenu setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </div>
    </div>
  );
};
