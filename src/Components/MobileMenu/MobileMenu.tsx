import css from './MobileMenu.module.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../User/User';
import { BtnLogOut } from '../BtnLogOut/BtnLogOut';
import { Pokeball } from '../UI/Pokeball';
import { Button } from '../UI/Button';
import {
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineUserCircle,
  HiOutlineXMark,
} from 'react-icons/hi2';
import { LuSwords } from 'react-icons/lu';

type MobileMenuProps = {
  setIsMobileMenuOpen(type: boolean): void;
};

const NAV = [
  { to: '/', label: 'Home', icon: <HiOutlineHome /> },
  { to: '/pokedex', label: 'Pokédex', icon: <HiOutlineSquares2X2 /> },
  { to: '/battle-arena', label: 'Battle Arena', icon: <LuSwords /> },
  { to: '/profile', label: 'Profile', icon: <HiOutlineUserCircle /> },
];

export const MobileMenu = ({ setIsMobileMenuOpen }: MobileMenuProps) => {
  const { isLoggedIn } = useAuth();
  const close = () => setIsMobileMenuOpen(false);

  return (
    <div className={css.mobileMenu}>
      <div className={css.head}>
        <div className={css.brand}>
          <Pokeball size={26} />
          <span>
            Poké<span className={css.accent}>Studio</span>
          </span>
        </div>
        <button className={css.btnClose} onClick={close} aria-label="Close menu">
          <HiOutlineXMark size={22} />
        </button>
      </div>

      <nav className={css.nav}>
        {NAV.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={close}
            className={({ isActive }) =>
              `${css.link} ${isActive ? css.linkActive : ''}`
            }
          >
            <span className={css.linkIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={css.bottom}>
        {isLoggedIn ? (
          <div className={css.userArea}>
            <User />
            <div className={css.btnRow}>
              <BtnLogOut />
            </div>
          </div>
        ) : (
          <div className={css.btnRow}>
            <NavLink to="/login" onClick={close} style={{ flex: 1 }}>
              <Button variant="ghost" fullWidth>
                Sign in
              </Button>
            </NavLink>
            <NavLink to="/register" onClick={close} style={{ flex: 1 }}>
              <Button variant="primary" fullWidth>
                Get started
              </Button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
