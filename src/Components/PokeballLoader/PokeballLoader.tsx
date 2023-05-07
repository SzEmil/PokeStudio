import css from './PokeballLoader.module.css';

export const PokeballLoader = () => {
  return (
    <div>
      <div className={css.wrapper}>
        <div className={css.pokeball}></div>
      </div>
    </div>
  );
};
