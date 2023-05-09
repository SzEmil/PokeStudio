import css from './pokeFront.module.css';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
interface PokemonProps {
  pokemon: {
    name: string;
    url: string;
  };
}
//src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${handlePokeIndex(url)}.png`}/>
// src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${handlePokeIndex(url )}.png`}
export const PokeFront = memo(({ pokemon: { name, url } }: PokemonProps) => {
  const handleGrowFirstLetter = (name: string) => {
    const bigLetter = name[0].toUpperCase();
    return name.replace(bigLetter.toLocaleLowerCase(), bigLetter);
  };

  const handlePokeIndex = (url: string) => {
    const index = url
      .split('')
      .slice(0, length - 1)
      .slice(34)
      .join('');
    //dla obrazków pokemonów w wersji rysunkowej odkomentować i podmienić link
    // if (Number(index) < 10) {
    //   console.log(index);
    //   return '00' + index;
    // } else if (Number(index) >= 10 && Number(index) < 100) {
    //   console.log(index);
    //   return '0' + index;
    // }
    return index;
  };

  return (
    <>
      <NavLink to={`/pokemon/${handlePokeIndex(url)}`}>
        <div className={css.card}>
          <img
            className={css.image}
            alt={name}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${handlePokeIndex(
              url
            )}.png`}
          />

          <div className={css.info}>
            <h2 className={css.name}>{handleGrowFirstLetter(name)}</h2>
          </div>
        </div>
      </NavLink>
    </>
  );
});
