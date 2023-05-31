import css from './PokePack.module.css';
import { useState } from 'react';

type PokePackPropsType = {
  type: 'Silver' | 'Gold' | 'Legendary' | string | undefined;
  handleOnClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

export const PokePack = ({ type, handleOnClick }: PokePackPropsType) => {
  const [isPickedPack, setIsPickedPack] = useState(false);
  let backgroundImage;
  let price = 0;
  let legendary;
  if (type === 'Gold') {
    price = 1000;
    legendary = 9;
    backgroundImage =
      'https://cdn.leonardo.ai/users/0b683e71-42fa-4e1b-8356-6df8f6f5706e/generations/6606818d-b1ce-47ce-99b9-c2e7043f0a46/Leonardo_Diffusion_pokemon_pack_background_golden_background_v_2.jpg';
  }
  if (type === 'Silver') {
    price = 500;
    legendary = 2;
    backgroundImage = `https://cdn.leonardo.ai/users/0b683e71-42fa-4e1b-8356-6df8f6f5706e/generations/acead86b-1e48-4ef9-ae3a-5d49cb4d2695/Leonardo_Diffusion_Squirtle_pokemon_pack_background_Silver_col_0.jpg`;
  }
  if (type === 'Legendary') {
    price = 5000;
    legendary = 100;
    backgroundImage = `https://cdn.leonardo.ai/users/0b683e71-42fa-4e1b-8356-6df8f6f5706e/generations/7ff1a077-f5c6-44f6-bf9a-9b096834f2a5/Leonardo_Diffusion_Legendary_pokemon_pack_background_epic_colo_1.jpg`;
  }

  return (
    <div
      className={`${css.card} ${isPickedPack ? css.picked : ''}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      onClick={() => setIsPickedPack(prevState => !prevState)}
    >
      <h2 className={css.title}>{type} Pack</h2>
      <p className={css.price}>{price}$</p>
      {isPickedPack && (
        <div className={css.overlay}>
          <p className={css.legendaryChance}>
            Chance for legendary: {legendary}%
          </p>
          <div>
            <button
              className={css.btn}
              type="button"
              onClick={event => {
                event.stopPropagation();
                handleOnClick(event);
                setIsPickedPack(false);
              }}
            >
              Buy
            </button>
            <button
              className={css.btn}
              type="button"
              onClick={event => {
                event.stopPropagation();
                setIsPickedPack(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
