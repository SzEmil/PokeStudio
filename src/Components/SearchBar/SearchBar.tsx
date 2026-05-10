import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent } from 'react';
import { setFilterData } from '../../Redux/filter/filterSlice';
import { selectFilterInput } from '../../Redux/filter/filterSelectors';
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2';
import css from './SearchBar.module.css';

type SearchBarPropsType = {
  filterType: 'home' | 'search';
  placeholder?: string;
};

export const SearchBar = ({ filterType, placeholder = 'Search Pokémon by name…' }: SearchBarPropsType) => {
  const dispatch = useDispatch();
  const filterInput = useSelector(selectFilterInput);

  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterData(e.target.value));
  };

  return (
    <div className={css.wrap}>
      <span className={css.icon}>
        <HiOutlineMagnifyingGlass size={18} />
      </span>
      <input
        className={css.input}
        type="text"
        placeholder={placeholder}
        name="pokeName"
        value={filterInput}
        onChange={filterType === 'home' ? handleInputOnChange : undefined}
        autoComplete="off"
      />
      {filterInput && (
        <button
          className={css.clear}
          type="button"
          aria-label="Clear search"
          onClick={() => dispatch(setFilterData(''))}
        >
          <HiOutlineXMark size={16} />
        </button>
      )}
    </div>
  );
};
