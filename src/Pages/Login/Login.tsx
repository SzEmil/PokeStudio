import css from './Login.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { FormEvent } from 'react';
import { loginUser } from '../../Redux/auth/authOperations';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const credentials = {
      email: (
        form.elements.namedItem('email') as HTMLInputElement
      ).value.toLowerCase(),
      password: (
        form.elements.namedItem('password') as HTMLInputElement
      ).value.toLowerCase(),
    };
    dispatch(loginUser(credentials));
    form.reset();
  };
  return (
    <div className={css['form-container']}>
      <h2 className={css['form-title']}>Login</h2>
      <form className={css.form} onSubmit={handleOnSubmit}>
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
          Login
        </button>
      </form>
      <p className={css.info}>
        Still no account? Sign up{' '}
        <NavLink className={css.navLink} to="/register">
          here
        </NavLink>
      </p>
    </div>
  );
};

export default Login;
