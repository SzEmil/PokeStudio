import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { AnimatePresence } from '../UI/AnimatePresenceFix';
import Notiflix from 'notiflix';
import { PokePack } from '../PokePack/PokePack';
import { AppDispatch } from '../../Redux/store';
import { fetchPackedPokemon, fetchPackedPokemonDetails } from '../../Redux/pokeShop/pokeShopOperations';
import {
  selectPackedPokemon,
  selectPackedPokemonOverwievIsLoading,
  selectPackedPokemonDetailsIsLoading,
} from '../../Redux/pokeShop/pokeShopSelectors';
import { selectAuthUserCoins, selectAuthIsLoggedIn } from '../../Redux/auth/authSelectors';
import { buyPack } from '../../Redux/auth/authOperations';
import { addPackOpened } from '../../Redux/stats/statsSlice';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { BtnAddCard } from '../BtnAddCard/BtnAddCard';
import { BtnQuickSellCard } from '../BtnQuickSellCard/BtnQuickSellCard';
import { PackReveal } from './PackReveal';
import css from './Shop.module.css';

const LEGENDARY_IDS = new Set([
  144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251, 377, 378, 379, 380,
  381, 382, 383, 384, 385, 386, 480, 481, 482, 483, 484, 485, 486, 487, 488,
  489, 490, 491, 492, 493, 494, 638, 639, 640, 641, 642, 643, 644, 645, 646,
  647, 648, 649, 716, 717, 718, 719, 720, 721, 785, 786, 787, 788, 789, 790,
  791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 807, 808, 809,
  888, 889, 890,
]);
const LEGENDARY_LIST = Array.from(LEGENDARY_IDS);

function rollSilver(): number {
  if (Math.random() <= 0.02) return LEGENDARY_LIST[Math.floor(Math.random() * LEGENDARY_LIST.length)];
  return Math.floor(Math.random() * 898) + 1;
}
function rollGold(): number {
  if (Math.random() <= 0.09) return LEGENDARY_LIST[Math.floor(Math.random() * LEGENDARY_LIST.length)];
  return Math.floor(Math.random() * 898) + 1;
}
function rollLegendary(): number {
  return LEGENDARY_LIST[Math.floor(Math.random() * LEGENDARY_LIST.length)];
}

export const Shop = () => {
  const dispatch: AppDispatch = useDispatch();
  const packedPokemon: any = useSelector(selectPackedPokemon);
  const isOverviewLoading = useSelector(selectPackedPokemonOverwievIsLoading);
  const isDetailsLoading = useSelector(selectPackedPokemonDetailsIsLoading);
  const coins = useSelector(selectAuthUserCoins);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const [revealing, setRevealing] = useState<null | 'Silver' | 'Gold' | 'Legendary'>(null);

  useEffect(() => {
    if (
      packedPokemon?.overview &&
      packedPokemon?.overview?.species?.url &&
      !packedPokemon?.details
    ) {
      dispatch(fetchPackedPokemonDetails(packedPokemon.overview.species.url));
    }
  }, [packedPokemon?.overview, packedPokemon?.details, dispatch]);

  const handlePackPurchase = (
    type: 'Silver' | 'Gold' | 'Legendary',
    price: number,
    rollFn: () => number
  ) => {
    if (!isLoggedIn) {
      Notiflix.Notify.warning('Sign in to buy booster packs.');
      return;
    }
    if ((coins ?? 0) < price) {
      Notiflix.Notify.failure(`Not enough coins. ${type} pack costs ${price}.`);
      return;
    }
    setRevealing(type);
    const id = rollFn();
    dispatch(buyPack(price));
    dispatch(fetchPackedPokemon(id));
    dispatch(addPackOpened({ legendary: LEGENDARY_IDS.has(id) }));
  };

  const closeReveal = () => setRevealing(null);

  return (
    <div className={css.shop}>
      <header className={css.head}>
        <div>
          <span className={css.eyebrow}>Booster Packs</span>
          <h2 className={css.title}>Find your next legend</h2>
          <p className={css.lead}>
            Tap a pack to open it. Drop the Pokéball, watch it shake, then witness the burst as your new ally is revealed.
          </p>
        </div>
        <div className={css.coinChip}>
          <span className={css.coinDot} />
          <strong>{(coins ?? 0).toLocaleString()}</strong>
          <span>coins</span>
        </div>
      </header>

      <ul className={css.packList}>
        <li>
          <PokePack
            type="Silver"
            handleOnClick={() => handlePackPurchase('Silver', 500, rollSilver)}
          />
        </li>
        <li>
          <PokePack
            type="Gold"
            handleOnClick={() => handlePackPurchase('Gold', 1000, rollGold)}
          />
        </li>
        <li>
          <PokePack
            type="Legendary"
            handleOnClick={() => handlePackPurchase('Legendary', 5000, rollLegendary)}
          />
        </li>
      </ul>

      <AnimatePresence>
        {revealing && (
          <PackReveal
            open={!!revealing}
            tier={revealing}
            packedPokemon={packedPokemon}
            isLoading={isOverviewLoading || isDetailsLoading}
            onClose={closeReveal}
          />
        )}
      </AnimatePresence>

      {!revealing &&
        packedPokemon?.overview &&
        packedPokemon?.details &&
        !isOverviewLoading &&
        !isDetailsLoading && (
          <motion.div
            className={css.recent}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={css.recentHead}>
              <span className={css.eyebrow}>Last opened</span>
              <h3>You can still add or quick-sell your last roll.</h3>
            </div>
            <div className={css.recentBody}>
              <PokemonCard pokemon={packedPokemon} />
              <div className={css.recentActions}>
                <BtnAddCard />
                <BtnQuickSellCard ovrl={packedPokemon.overview.base_experience} />
              </div>
            </div>
          </motion.div>
        )}
    </div>
  );
};
