import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';

export const SharedLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/">LOGO</NavLink>
          <NavLink to="/">HOME</NavLink>
        </nav>
      </header>
      <Suspense fallback={<div>Loading components...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
