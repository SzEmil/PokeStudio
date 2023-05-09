import css from './PokemonCard.module.css';
import { nanoid } from '@reduxjs/toolkit';

export const PokemonCard = ({ pokemon }: any) => {
  const handleGrowFirstLetter = (name: string) => {
    const bigLetter = name[0].toUpperCase();
    return name.replace(bigLetter.toLocaleLowerCase(), bigLetter);
  };
  const hotPokemon = pokemon;
  return (
    <>
      <div className={css.cardBox}>
        <div className={css.titleBox}>
          <h2 className={css.title}>Pokemon of a day</h2>
        </div>
        <div
          className={css.card}
          style={{
            background: `radial-gradient(circle,${hotPokemon?.details.color.name} 10%,rgba(255, 255, 255, 0) 87%)`,
          }}
        >
          <div className={css.headBar}>
            <div>
              <h2 className={css.name}>
                {handleGrowFirstLetter(hotPokemon?.overview?.name)}
                <span className={css.nameTag}>#{hotPokemon?.overview?.id}</span>
              </h2>
              <div className={css.typesBox}>
                <p className={css.typeText}>Type: </p>
                <ul className={css.typeList}>
                  {hotPokemon?.overview.types.map(
                    (type: { type: { name: string } }) => (
                      <li key={`${type.type.name}+${nanoid()}`}>
                        <p className={css.typeTextmodifier}>{type.type.name}</p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div>
              <p className={css.overall}>
                {hotPokemon?.overview.base_experience}
              </p>
            </div>
          </div>

          <div className={css.imageBox}>
            <img
              className={css.image}
              src={hotPokemon?.overview.sprites.other.home.front_default}
            />
          </div>

          <div className={css.checkDescription}>
            <p className={css.checkDescriptionText}>?</p>
          </div>

          <div className={css.description}>
            <p className={css.descriptionText}>
              {
                hotPokemon.details.flavor_text_entries.find(
                  (item: ReturnType<typeof hotPokemon.details>) =>
                    item.language.name === 'en'
                ).flavor_text
              }
            </p>
          </div>

          <div className={css.overview}>
            <div>
              <h2 className={css.overviewTitle}>Statistics</h2>
              <ul className={css.stats}>
                {hotPokemon?.overview.stats.map(
                  (stat: ReturnType<typeof hotPokemon>) => (
                    <li key={nanoid()}>
                      <p className={css.statsText}>
                        {stat.stat.name}:{' '}
                        <span className={css.statsTextOvrl}>
                          {stat.base_stat}
                        </span>
                      </p>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h2 className={css.overviewTitle}>Abilities</h2>
              <ul className={css.abilities}>
                {hotPokemon?.overview.abilities.map(
                  (
                    ability: ReturnType<typeof hotPokemon.overview.abilities>
                  ) => (
                    <li
                      className={css.ability}
                      key={`${ability.ability.name}+${nanoid()}`}
                    >
                      <p
                        className={css.abilitiesText}
                        style={{
                          background: `linear-gradient(180deg, ${hotPokemon?.details.color.name} 40%, rgba(40,40,40,1) 100%)`,
                        }}
                      >
                        {ability.ability.name}
                      </p>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
