import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Notiflix from 'notiflix';
import { AppDispatch } from '../../Redux/store';
import { registerUser } from '../../Redux/auth/authOperations';
import { selectAuthIsLoading } from '../../Redux/auth/authSelectors';
import { PokeballLoader } from '../../Components/PokeballLoader/PokeballLoader';
import { Pokeball } from '../../Components/UI/Pokeball';
import { Button } from '../../Components/UI/Button';
import css from './Register.module.css';
import { LuMail, LuLock, LuUser, LuArrowRight } from 'react-icons/lu';

const Register = () => {
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
      username: (form.elements.namedItem('username') as HTMLInputElement).value.toLowerCase(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.toLowerCase(),
      password,
    };
    dispatch(registerUser(credentials));
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
            Begin your <br />
            <span className={css.accent}>Pokémon adventure.</span>
          </h2>
          <p>
            Create a free trainer account, claim your starter coins and dive into
            PokéStudio.
          </p>
          <ul>
            <li>2,000 starting coins to open your first packs</li>
            <li>Daily quests with growing streak bonuses</li>
            <li>Persistent shelf, achievements, and battle history</li>
            <li>3v3 turn-based battles with real type matchups</li>
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
          <PokeballLoader label="Creating account" />
        ) : (
          <>
            <span className={css.eyebrow}>Create account</span>
            <h1 className={css.title}>Become a trainer</h1>
            <form className={css.form} onSubmit={handleOnSubmit}>
              <label className={css.field}>
                <span>Username</span>
                <div className={css.input}>
                  <LuUser />
                  <input type="text" name="username" required maxLength={24} />
                </div>
              </label>
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
                    autoComplete="new-password"
                  />
                </div>
              </label>
              <Button type="submit" variant="primary" size="lg" iconRight={<LuArrowRight />} fullWidth>
                Create account
              </Button>
            </form>
            <p className={css.foot}>
              Already a trainer?{' '}
              <NavLink className={css.link} to="/login">
                Sign in
              </NavLink>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Register;
