import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './Components/SharedLayout/SharedLayout';
import { lazy } from 'react';
import Pokemon from '../src/Pages/Pokemon/Pokemon';
import NotFound from '../src/Pages/NotFound/NotFound';
import { RestrictedRoute } from './Components/RestrictedRoute';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './Redux/store';
import { useEffect } from 'react';
import { refreshUser } from './Redux/auth/authOperations';
import { ProtectedRoute } from './Components/ProtectedRoute';
const HomePage = lazy(() => import('../src/Pages/Home/Home'));
// const NotFoundPage = lazy(() => import('../src/Pages/NotFound/NotFound'));
const PokeDexPage = lazy(() => import('../src/Pages/PokeDex/PokeDex'));
// const PokemonPage = lazy(() => import('../src/Pages/Pokemon/Pokemon'));
const LoginPage = lazy(() => import('../src/Pages/Login/Login'));
const RegisterPage = lazy(() => import('../src/Pages/Register/Register'));

export const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="pokedex"
            element={
              <ProtectedRoute component={PokeDexPage} redirectTo="/register" />
            }
          />
          <Route path="pokemon/:id" element={<Pokemon />}></Route>
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
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
