import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SharedLayout } from './Components/SharedLayout/SharedLayout';
import Pokemon from '../src/Pages/Pokemon/Pokemon';
import NotFound from '../src/Pages/NotFound/NotFound';
import { RestrictedRoute } from './Components/RestrictedRoute';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { AppDispatch } from './Redux/store';
import { refreshUser } from './Redux/auth/authOperations';

const HomePage = lazy(() => import('../src/Pages/Home/Home'));
const PokeDexPage = lazy(() => import('../src/Pages/PokeDex/PokeDex'));
const LoginPage = lazy(() => import('../src/Pages/Login/Login'));
const RegisterPage = lazy(() => import('../src/Pages/Register/Register'));
const ProfilePage = lazy(() => import('../src/Pages/Profile/Profile'));
const BattleArenaPage = lazy(() => import('../src/Pages/BattleArena/BattleArena'));

export const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="pokedex"
          element={
            <ProtectedRoute component={PokeDexPage} redirectTo="/register" />
          }
        />
        <Route
          path="battle-arena"
          element={
            <ProtectedRoute component={BattleArenaPage} redirectTo="/register" />
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute component={ProfilePage} redirectTo="/login" />
          }
        />
        <Route path="pokemon/:id" element={<Pokemon />} />
        <Route
          path="login"
          element={<RestrictedRoute component={LoginPage} redirectTo="/" />}
        />
        <Route
          path="register"
          element={
            <RestrictedRoute component={RegisterPage} redirectTo="/" />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
