import css from './PokeNews.module.css';
import { nanoid } from '@reduxjs/toolkit';
// import { useState } from 'react';
// const [isOverviewOpen, setIsOverviewOpen] = useState(false);
const PokeNews = () => {
  return (
    <div>
      <ul className={css.list}>
        <li key={nanoid()}>
          <div className={css.card}>
            <h2 className={css.title}>
              Mysterious Encounter: Eevee Sighted with Unprecedented Evolution
              Potential
            </h2>
            <img
              className={css.image}
              src="https://cdn.leonardo.ai/users/0b683e71-42fa-4e1b-8356-6df8f6f5706e/generations/84ef1cbe-d924-4718-b70a-fb412e6307e0/Leonardo_Diffusion_Mysterious_Encounter_Eevee_Pokemon_Sighted_2.jpg"
              alt="pic"
            />

            <p className={css.description}>
              Researchers discover an Eevee with extraordinary evolutionary
              potential, capable of multiple evolutions simultaneously. This
              revelation may revolutionize Pokémon evolution strategies, as
              trainers ponder the possibilities and untapped power within Eevee.
              Excitement spreads across the Pokémon community, fueling
              anticipation for updates on this groundbreaking discovery.
            </p>
          </div>
        </li>

        <li key={nanoid()}>
          <div className={css.card}>
            <h2 className={css.title}>
              Unforgettable Journey: Lapras Leads Trainers on an Oceanic Odyssey
            </h2>
            <img
              className={css.image}
              src="https://cdn.leonardo.ai/users/0b683e71-42fa-4e1b-8356-6df8f6f5706e/generations/af6d6b31-e137-402e-a87a-603967ff7312/Leonardo_Diffusion_Unforgettable_Journey_Lapras_Pokemon_Leads_0.jpg"
              alt="pic"
            />

            <p className={css.description}>
              Trainers embark on an awe-inspiring adventure guided by Lapras,
              exploring uncharted waters, discovering hidden islands, and
              encountering rare Pokémon. This oceanic odyssey kindles a renewed
              interest in maritime exploration, forging deep bonds between
              trainers and Lapras. The Pokémon community eagerly awaits future
              expeditions and revels in the wonders of the sea.
            </p>
          </div>
        </li>

        <li key={nanoid()}>
          <div className={css.card}>
            <h2 className={css.title}>
              Floral Symphony: Ludicolo's Dance Delights Pokémon Enthusiasts
            </h2>
            <img
              className={css.image}
              src="https://cdn.leonardo.ai/users/0b683e71-42fa-4e1b-8356-6df8f6f5706e/generations/cb7665e6-153b-4f3f-933e-fb99c53068a9/Leonardo_Diffusion_Floral_Symphony_Ludicolos_Pokemon_Dance_Del_1.jpg"
              alt="pic"
            />

            <p className={css.description}>
              Ludicolo, the joyous Water/Grass-type Pokémon, enchants audiences
              with its captivating dance performances. Its rhythmic movements
              and melodious nature reflect the emotions of the crowd, fostering
              unity and appreciation for music. Trainers and onlookers alike are
              left spellbound by Ludicolo's ability to transcend language
              barriers and create an atmosphere of shared happiness.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PokeNews;
