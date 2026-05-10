import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Notiflix from 'notiflix';
import { AppDispatch } from '../../Redux/store';
import { loginUser } from '../../Redux/auth/authOperations';
import { selectAuthIsLoading } from '../../Redux/auth/authSelectors';
import { PokeballLoader } from '../../Components/PokeballLoader/PokeballLoader';
import { Pokeball } from '../../Components/UI/Pokeball';
import { Button } from '../../Components/UI/Button';
import css from './Login.module.css';
import { LuMail, LuLock, LuArrowRight } from 'react-icons/lu';

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(selectAuthIsLoading);

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    if (password.length < 6) {
      Notiflix.Notify.failure('Password must be at least 6 characters.');
      return;
    }
    const credentials = {
      email: (form.elements.namedItem('email') as HTMLInputElement).value.toLowerCase(),
      password,
    };
    dispatch(loginUser(credentials));
    form.reset();
  };

  return (
    <div className={css.shell}>
      <motion.div
        className={css.aside}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={css.asideOrb} />
        <div className={css.asideContent}>
          <Pokeball size={48} />
          <h2>
            Welcome back, <br />
            <span className={css.accent}>Trainer.</span>
          </h2>
          <p>Continue your journey, claim daily rewards, and battle in the Arena.</p>
          <ul>
            <li>1,025+ Pokémon to discover</li>
            <li>Booster packs with rare & legendary pulls</li>
            <li>3v3 turn-based battles with type bonuses</li>
            <li>Achievements, daily streaks, profile stats</li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        className={css.formCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          <PokeballLoader label="Signing in" />
        ) : (
          <>
            <span className={css.eyebrow}>Sign in</span>
            <h1 className={css.title}>Step back into PokéStudio</h1>
            <form className={css.form} onSubmit={handleOnSubmit}>
              <label className={css.field}>
                <span>Email</span>
                <div className={css.input}>
                  <LuMail />
                  <input type="email" name="email" required autoComplete="email" />
                </div>
              </label>
              <label className={css.field}>
                <span>Password</span>
                <div className={css.input}>
                  <LuLock />
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    autoComplete="current-password"
                  />
                </div>
              </label>
              <Button type="submit" variant="primary" size="lg" iconRight={<LuArrowRight />} fullWidth>
                Sign in
              </Button>
            </form>
            <p className={css.foot}>
              No account yet?{' '}
              <NavLink className={css.link} to="/register">
                Create one
              </NavLink>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
