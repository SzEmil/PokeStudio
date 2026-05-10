import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Section } from '../../Components/Section/Section';
import { PokeballLoader } from '../../Components/PokeballLoader/PokeballLoader';
import { selectAuthIsLoggedIn, selectAuthUser } from '../../Redux/auth/authSelectors';
import { Button } from '../../Components/UI/Button';
import css from './BattleArena.module.css';
import { LuSwords } from 'react-icons/lu';

const Battle = lazy(() => import('../../Components/Battle/Battle'));

const BattleArena = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const user = useSelector(selectAuthUser);
  const cards = Math.max(0, (user.cards?.length ?? 1) - 1);

  if (!isLoggedIn) {
    return (
      <Section>
        <div className={css.guard}>
          <h2>Sign in to enter the Arena</h2>
          <p>You need a trainer account and at least 3 Pokémon to battle.</p>
          <NavLink to="/register">
            <Button variant="primary" size="lg" iconLeft={<LuSwords />}>
              Get started
            </Button>
          </NavLink>
        </div>
      </Section>
    );
  }

  if (cards < 3) {
    return (
      <Section>
        <div className={css.guard}>
          <h2>You need at least 3 Pokémon</h2>
          <p>
            Open booster packs in the Store and add Pokémon to your battle squad from your shelf.
          </p>
          <NavLink to="/pokedex">
            <Button variant="primary" size="lg" iconLeft={<LuSwords />}>
              Open Store
            </Button>
          </NavLink>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <Suspense fallback={<PokeballLoader label="Entering the Arena" />}>
        <Battle />
      </Suspense>
    </Section>
  );
};

export default BattleArena;
