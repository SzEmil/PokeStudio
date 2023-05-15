import css from './Register.module.css';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { registerUser } from '../../Redux/auth/authOperations';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

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
    </div>
  );
};

export default Register;
