import css from './Register.module.css';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { registerUser } from '../../Redux/auth/authOperations';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthIsLoading } from '../../Redux/auth/authSelectors';
import { PokeballLoader } from '../../Components/PokeballLoader/PokeballLoader';
import Notiflix from 'notiflix';

const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(selectAuthIsLoading);
  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const userPassword: string = (
      form.elements.namedItem('password') as HTMLInputElement
    ).value.toLowerCase();

    if (userPassword.length < 6)
      return Notiflix.Notify.failure('Password must be at least 6 characters');

    const credentials = {
      username: (
        form.elements.namedItem('username') as HTMLInputElement
      ).value.toLowerCase(),
      email: (
        form.elements.namedItem('email') as HTMLInputElement
      ).value.toLowerCase(),
      password: (
        form.elements.namedItem('password') as HTMLInputElement
      ).value.toLowerCase(),
    };
    dispatch(registerUser(credentials));
    console.log(credentials);
    form.reset();
  };
  return (
    <div className={css['form-container']}>
      {isLoading ? (
        <PokeballLoader />
      ) : (
        <>
          <h2 className={css['form-title']}>Register</h2>
          <form className={css.form} onSubmit={handleOnSubmit}>
            <label className={css['form-label']} htmlFor="username">
              Username:
            </label>
            <input
              className={css['form-input']}
              type="text"
              id="username"
              name="username"
              required
            />

            <label className={css['form-label']} htmlFor="email">
              Email:
            </label>
            <input
              className={css['form-input']}
              type="email"
              id="email"
              name="email"
              required
            />

            <label className={css['form-label']} htmlFor="password">
              Password:
            </label>
            <input
              className={css['form-input']}
              type="password"
              id="password"
              name="password"
              minLength={6}
              required
            />

            <button type="submit" className={css['form-submit']}>
              Register
            </button>
          </form>
          <p className={css.info}>
            Already have an account? Sign in{' '}
            <NavLink className={css.navLink} to="/login">
              here
            </NavLink>
          </p>
        </>
      )}
    </div>
  );
};

export default Register;
