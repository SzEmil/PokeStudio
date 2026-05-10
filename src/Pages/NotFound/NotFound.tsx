import { NavLink } from 'react-router-dom';
import { Pokeball } from '../../Components/UI/Pokeball';
import { Button } from '../../Components/UI/Button';
import css from './NotFound.module.css';
import { LuHouse } from 'react-icons/lu';

const NotFound = () => {
  return (
    <div className={css.wrap}>
      <div className={css.glow} />
      <Pokeball size={120} spinning />
      <h1>404</h1>
      <p>The trail goes cold here, trainer. The page you’re looking for can’t be found.</p>
      <NavLink to="/">
        <Button variant="primary" size="lg" iconLeft={<LuHouse />}>
          Back to Home
        </Button>
      </NavLink>
    </div>
  );
};

export default NotFound;
