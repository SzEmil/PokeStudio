import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from '../UI/AnimatePresenceFix';
import { BtnLogOut } from '../BtnLogOut/BtnLogOut';
import css from './SharedLayout.module.css';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../User/User';
import { PokeballLoader } from '../PokeballLoader/PokeballLoader';
import { Recorces } from '../Recorses/Recorces';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { Pokeball } from '../UI/Pokeball';
import { Button } from '../UI/Button';
import {
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineUserCircle,
  HiOutlineBars3,
} from 'react-icons/hi2';
import { LuSwords } from 'react-icons/lu';

const NAV = [
  { to: '/', label: 'Home', icon: <HiOutlineHome /> },
  { to: '/pokedex', label: 'Pokédex', icon: <HiOutlineSquares2X2 /> },
  { to: '/battle-arena', label: 'Arena', icon: <LuSwords /> },
];

export const SharedLayout = () => {
  const currentYear = new Date().getFullYear();
  const { isLoggedIn } = useAuth();
  const [isRecorcesOpen, setIsRecorcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMobileMenuOpen(false);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <div className={css.shell}>
      <header className={`${css.head} ${scrolled ? css.scrolled : ''}`}>
        <div className={css.headInner}>
          <NavLink className={css.logo} to="/" aria-label="PokéStudio home">
            <Pokeball size={28} />
            <span className={css.logoText}>
              Poké<span className={css.logoAccent}>Studio</span>
            </span>
            <span className={css.versionBadge}>v2.0</span>
          </NavLink>

          <nav className={css.nav}>
            {NAV.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `${css.navLink} ${isActive ? css.navLinkActive : ''}`
                }
              >
                <span className={css.navIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className={css.right}>
            {isLoggedIn ? (
              <>
                <NavLink to="/profile" className={css.profileLink} aria-label="Profile">
                  <User />
                </NavLink>
                <div className={css.logoutWrap}>
                  <BtnLogOut />
                </div>
              </>
            ) : (
              <div className={css.authButtons}>
                <NavLink to="/login">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </NavLink>
                <NavLink to="/register">
                  <Button variant="primary" size="sm" iconLeft={<HiOutlineUserCircle />}>
                    Get started
                  </Button>
                </NavLink>
              </div>
            )}

            <button
              className={css.menuMobileBtn}
              type="button"
              aria-label="Open menu"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
            >
              <HiOutlineBars3 size={22} />
            </button>
          </div>
        </div>
      </header>

      <main className={css.main}>
        <Suspense
          fallback={
            <div className={css.loaderBox}>
              <PokeballLoader label="Summoning Pokémon" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <footer className={css.footer}>
        <div className={css.footerInner}>
          <div className={css.footerBrand}>
            <Pokeball size={20} />
            <span>
              Poké<span className={css.logoAccent}>Studio</span> · {currentYear}
            </span>
          </div>
          <button
            type="button"
            className={css.footerLink}
            onClick={() => setIsRecorcesOpen(p => !p)}
          >
            Resources
          </button>
          <a
            className={css.footerLink}
            href="https://pokeapi.co"
            target="_blank"
            rel="noreferrer"
          >
            Powered by PokéAPI
          </a>
        </div>
      </footer>

      {isRecorcesOpen ? <Recorces /> : null}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={css.mobileBackdrop}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 240, damping: 28 }}
              className={css.mobilePanel}
              onClick={e => e.stopPropagation()}
            >
              <MobileMenu setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
