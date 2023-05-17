import css from './PokePack.module.css';
import { useState } from 'react';

type PokePackPropsType = {
  type: 'silver' | 'gold' | string | undefined;
  handleOnClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

export const PokePack = ({ type, handleOnClick }: PokePackPropsType) => {
  const [isPickedPack, setIsPickedPack] = useState(false);

  // po kliknieciu wykonuje sie fetch z randomowych pokemonem na podstawie id na podstaiwe algortymu.
  // fetch wykonuje się w nowym reducerze PokeShop który posiada wartość currentPackedPokemon: null | {}. po fetchu można pobrać zawartość ze stanu i wyśweitlić w odpowiednim komponencie jako trafiony pokemon.
  // current pokemon posiada to co hotpokemon czyli overview oraz details czyli po załadowaniu trzeba zrobić dodatkowy fetch ze species i wtedy całość zapakować do stanu current pokemon. Dopóki zawartość stanu nie sie wypełni czyli !== null to przycisk add musi być niedostapny tak samo quicsell
  // Na planszy bedzie też przycisk Add(trzeba zmienić by po kliknięciu wykonal sie tez dispatch(add card) tak aby dodać te karte obiekt ju uzupełniony do stanu user.cards) do shelf który pozwoli na dodanie do shelfa usera oraz jego database czyli wystarczy dispatchAddCard w sumie, oraz button quicksell który powoduje wyczysczenie stanu current pokemon, zamkniecie planszy oraz dodanie do stanu coins gracza oraz coins w bazie danych odpowiedniej ilosc coins na podstwie algorytmu wyliczającego cene
  let price = 0;
  if (type === 'gold') price = 500;
  if (type === 'silver') price = 200;

  return (
    <div
      className={`${css.card} ${isPickedPack ? css.picked : ''}`}
      onClick={() => setIsPickedPack(prevState => !prevState)}
    >
      <h2 className={css.title}>Gold Pack</h2>
      <p className={css.price}>{type === 'gold' && price}$</p>
      {isPickedPack && (
        <div className={css.overlay}>
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
      )}
    </div>
  );
};
