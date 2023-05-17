import { PokePack } from '../PokePack/PokePack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { fetchPackedPokemon } from '../../Redux/pokeShop/pokeShopOperations';
import { useSelector } from 'react-redux';
import css from './Shop.module.css';
import { useEffect, useState } from 'react';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import {
  selectPackedPokemon,
  selectPackedPokemonOverwievIsLoading,
  selectPackedPokemonDetailsIsLoading,
} from '../../Redux/pokeShop/pokeShopSelectors';
import { PokeballLoader } from '../PokeballLoader/PokeballLoader';
import { fetchPackedPokemonDetails } from '../../Redux/pokeShop/pokeShopOperations';
import { BtnAddCard } from '../BtnAddCard/BtnAddCard';
import { BtnQuickSellCard } from '../BtnQuickSellCard/BtnQuickSellCard';
import { buyPack } from '../../Redux/auth/authOperations';

export const Shop = () => {
  const dispatch: AppDispatch = useDispatch();
  const packedPokemon: any = useSelector(selectPackedPokemon);
  const isOverviewLoading = useSelector(selectPackedPokemonOverwievIsLoading);
  const isDetailsLoading = useSelector(selectPackedPokemonDetailsIsLoading);

  function randomNumberGold() {
    return Math.floor(Math.random() * 897) + 1;
  }

  const handleOnClickPack = (event: React.MouseEvent<HTMLButtonElement>) => {
    //6% szans na legendarnego
    event.stopPropagation();
    console.log('kupiono paczke');
    dispatch(buyPack(500));
    dispatch(fetchPackedPokemon(randomNumberGold()));
  };

  useEffect(() => {
    if (packedPokemon?.overview === null) return;
    if (packedPokemon?.overview?.species) {
      dispatch(fetchPackedPokemonDetails(packedPokemon.overview.species.url));
    }
  }, [packedPokemon!.overview, dispatch]);

  return (
    <div className={css.pokeShop}>
      <ul>
        <li>
          <PokePack type="gold" handleOnClick={handleOnClickPack} />
        </li>
      </ul>
      <div>
        {isOverviewLoading ? (
          <PokeballLoader />
        ) : (
          <div className={css.wrapper}>
            {packedPokemon!.overview === null ||
            isDetailsLoading ||
            packedPokemon!.details === null ? null : (
              <>
                <div className={css.packedPokemon}>
                  <div className={css.packedPokemonWrapper}>
                    <div className={css.card}>
                      <PokemonCard pokemon={packedPokemon} />
                    </div>
                    <div>
                      <div className={css.description}>
                        <h2 className={css.descriptionTitle}>
                          Congratulations!
                        </h2>
                        <p className={css.descriptionText}>
                          Congratulations on your find! Your pack has brought
                          you a Pokémon named "{packedPokemon.overview.name}".
                          Now you have the option to add it to your Pokédex list
                          or the quick sell option to earn coins.
                        </p>
                      </div>
                      <div className={css.btnAddCardBox}>
                        <BtnAddCard price={500} />
                        <div className={css.btnCardBox}>
                          <BtnQuickSellCard
                            ovrl={packedPokemon.overview.base_experience}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
