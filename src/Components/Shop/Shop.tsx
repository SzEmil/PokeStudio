import { PokePack } from '../PokePack/PokePack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { fetchPackedPokemon } from '../../Redux/pokeShop/pokeShopOperations';
import { useSelector } from 'react-redux';
import css from './Shop.module.css';
import { useEffect } from 'react';
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
import { selectAuthUserCoins } from '../../Redux/auth/authSelectors';

export const Shop = () => {
  const dispatch: AppDispatch = useDispatch();
  const packedPokemon: any = useSelector(selectPackedPokemon);
  const isOverviewLoading = useSelector(selectPackedPokemonOverwievIsLoading);
  const isDetailsLoading = useSelector(selectPackedPokemonDetailsIsLoading);
  const coins = useSelector(selectAuthUserCoins);

  const legendaryIDs = [
    144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251, 377, 378, 379, 380,
    381, 382, 383, 384, 385, 386, 480, 481, 482, 483, 484, 485, 486, 487, 488,
    489, 490, 491, 492, 493, 494, 638, 639, 640, 641, 642, 643, 644, 645, 646,
    647, 648, 649, 716, 717, 718, 719, 720, 721, 785, 786, 787, 788, 789, 790,
    791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 807, 808, 809,
    888, 889, 890,
  ];
  function randomNumberGold() {
    return Math.floor(Math.random() * 897) + 1;
  }
  function randomNumberSilver() {
    if (Math.random() <= 0.02) {
      // Użytkownik ma 2% szansy, że wylosowane ID będzie należeć do ID legendarnych pokemonów
      const randomIndex = Math.floor(Math.random() * legendaryIDs.length);
      return legendaryIDs[randomIndex];
    } else {
      // Jeśli nie wylosowano legendarnego ID, zwracamy losową liczbę z przedziału 1-898
      return Math.floor(Math.random() * 898) + 1;
    }
  }
  function randomNumberLegendary() {
    const randomIndex = Math.floor(Math.random() * legendaryIDs.length);
    return legendaryIDs[randomIndex];
  }

  const handleOnClickPackGold = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    //9%na legendarnego
    event.stopPropagation();
    if (coins! < 500) return;
    console.log('kupiono paczke');
    dispatch(buyPack(500));
    dispatch(fetchPackedPokemon(randomNumberGold()));
  };

  const handleOnClickPackSilver = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    //2% szans na legendarnego
    event.stopPropagation();
    if (coins! < 200) return;
    console.log('kupiono paczke');
    dispatch(buyPack(200));
    dispatch(fetchPackedPokemon(randomNumberSilver()));
  };

  const handleOnClickPackLegendary = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    //100% szans na legendarnego
    event.stopPropagation();
    if (coins! < 2000) return;
    console.log('kupiono paczke');
    dispatch(buyPack(2000));
    dispatch(fetchPackedPokemon(randomNumberLegendary()));
  };

  useEffect(() => {
    if (packedPokemon?.overview === null) return;
    if (packedPokemon?.overview?.species) {
      dispatch(fetchPackedPokemonDetails(packedPokemon.overview.species.url));
    }
  }, [packedPokemon!.overview, dispatch]);

  return (
    <div className={css.pokeShop}>
      <ul className={css.packList}>
        <li>
          <PokePack type="Silver" handleOnClick={handleOnClickPackSilver} />
        </li>
        <li>
          <PokePack type="Gold" handleOnClick={handleOnClickPackGold} />
        </li>
        <li>
          <PokePack
            type="Legendary"
            handleOnClick={handleOnClickPackLegendary}
          />
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
