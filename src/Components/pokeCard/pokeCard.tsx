interface PokemonProps {
  pokemon: {
    name: string;
    url: string;
  };
}

export const PokeCard = ({ pokemon: { name, url } }: PokemonProps) => {
  const handlePokeIndex = (url: string) => {
    const index = url
      .split('')
      .slice(0, length - 1)
      .slice(34)
      .join('');
    return index;
  };
  return (
    <>
      <div>
        <span>{name}</span>
        <img
          alt={name}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${handlePokeIndex(
            url
          )}.png`}
        />
      </div>
    </>
  );
};
