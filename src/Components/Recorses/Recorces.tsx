import { nanoid } from '@reduxjs/toolkit';
import css from './Recorces.module.css';
export const Recorces = () => {
  return (
    <div className={css.recorces}>
      <ul className={css.list}>
        <li key={nanoid()}>
          <a
            className={css.link}
            href="https://pokeapi.co/docs/v2#resource-listspagination-section"
          >
            PokeApi
          </a>
        </li>
        <li key={nanoid()}>
          <a className={css.link} href="https://i.redd.it/dnlz6c3xni951.jpg">
            Game Background
          </a>
        </li>
        <li key={nanoid()}>
          <a
            className={css.link}
            href="https://cdn.leonardo.ai/users/0b683e71-42fa-4e1b-8356-6df8f6f5706e/generations/6606818d-b1ce-47ce-99b9-c2e7043f0a46/Leonardo_Diffusion_pokemon_pack_background_golden_background_v_2.jpg"
          >
            Gold Pack (Leonardo.AI)
          </a>
        </li>
        <li key={nanoid()}>
          <a
            className={css.link}
            href="https://cdn.leonardo.ai/users/0b683e71-42fa-4e1b-8356-6df8f6f5706e/generations/acead86b-1e48-4ef9-ae3a-5d49cb4d2695/Leonardo_Diffusion_Squirtle_pokemon_pack_background_Silver_col_0.jpg"
          >
            Silver Pack (Leonardo.AI)
          </a>
        </li>
        <li key={nanoid()}>
          <a
            className={css.link}
            href="https://cdn.leonardo.ai/users/0b683e71-42fa-4e1b-8356-6df8f6f5706e/generations/7ff1a077-f5c6-44f6-bf9a-9b096834f2a5/Leonardo_Diffusion_Legendary_pokemon_pack_background_epic_colo_1.jpg"
          >
            Legendary Pack (Leonardo.AI)
          </a>
        </li>
        <li key={nanoid()}>
          <a
            className={css.link}
            href="https://cdn.leonardo.ai/users/0b683e71-42fa-4e1b-8356-6df8f6f5706e/generations/84ef1cbe-d924-4718-b70a-fb412e6307e0/Leonardo_Diffusion_Mysterious_Encounter_Eevee_Pokemon_Sighted_2.jpg"
          >
            Pokenews1 (Leonardo.AI)
          </a>
        </li>
        <li key={nanoid()}>
          <a
            className={css.link}
            href="https://cdn.leonardo.ai/users/0b683e71-42fa-4e1b-8356-6df8f6f5706e/generations/af6d6b31-e137-402e-a87a-603967ff7312/Leonardo_Diffusion_Unforgettable_Journey_Lapras_Pokemon_Leads_0.jpg"
          >
            Pokenews2 (Leonardo.AI)
          </a>
        </li>
        <li key={nanoid()}>
          <a
            className={css.link}
            href="https://cdn.leonardo.ai/users/0b683e71-42fa-4e1b-8356-6df8f6f5706e/generations/cb7665e6-153b-4f3f-933e-fb99c53068a9/Leonardo_Diffusion_Floral_Symphony_Ludicolos_Pokemon_Dance_Del_1.jpg"
          >
            Pokenews3 (Leonardo.AI)
          </a>
        </li>
      </ul>
    </div>
  );
};
