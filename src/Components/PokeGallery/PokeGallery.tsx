import { useState } from 'react';
import css from './PokeGallery.module.css';
import { nanoid } from '@reduxjs/toolkit';
type galleryPropsType = {
  sprites: {
    back_default: string | undefined;
    back_female: string | undefined;
    back_shiny: string | undefined;
    back_shiny_female: string | undefined;
    front_default: string | undefined;
    front_female: string | undefined;
    front_shiny: string | undefined;
    front_shiny_female: string | undefined;
    other: {
      dream_world: {
        front_default: string | undefined;
      };
      home: {
        front_default: string | undefined;
      };
      'official-artwork': {
        front_default: string | undefined;
      };
    };
  };
};

export const PokeGallery = ({ sprites }: galleryPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleList = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={css.container}>
      <div className={css.galleryCard}>
        <div className={css.galleryCardBar}>
          <h3 className={css.galleryCardTitle}>Gallery</h3>
          <button
            type="button"
            onClick={toggleList}
            className={`${css.button} ${isOpen ? css.isVisible : ''}`}
          >
            ^
          </button>
        </div>
        <div className={`${css.galleryBox} ${isOpen ? css.visible : ''}`}>
          <ul className={css.gallery}>
            {Object.values(sprites).map(
              (sprite, index) =>
                sprite !== null &&
                typeof sprite === 'string' && (
                  <li key={index} className={css.galleryItem}>
                    <img
                      loading="lazy"
                      className={css.image}
                      alt="pokePic"
                      src={sprite}
                    />
                  </li>
                )
            )}
            <li className={css.galleryItem} key={nanoid()}>
              <img
                loading="lazy"
                className={css.image}
                alt="pokePic"
                src={sprites.other.dream_world.front_default}
              />
            </li>
            <li className={css.galleryItem} key={nanoid()}>
              <img
                loading="lazy"
                className={css.image}
                alt="pokePic"
                src={sprites.other.home.front_default}
              />
            </li>
            <li className={css.galleryItem} key={nanoid()}>
              <img
                loading="lazy"
                className={css.image}
                alt="pokePic"
                src={sprites.other['official-artwork'].front_default}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
