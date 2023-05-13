import { SearchForm } from '../../Components/SearchForm/SearchForm';
import { Section } from '../../Components/Section/Section';

import css from "./PokeDex.module.css"
const PokeDex = () => {
  return (
    <div className={css.pokeDex}>
    <Section>
      <SearchForm />
    </Section>
    </div>
  );
};

export default PokeDex;
