import { useDispatch } from 'react-redux';
import { setFilterData } from '../../Redux/filter/filterSlice';
import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectFilterInput } from '../../Redux/filter/filterSelectors';
import css from './SearchBar.module.css';

type SearchBarPropsType = {
  filterType: 'home' | 'search';
};
export const SearchBar = ({ filterType }: SearchBarPropsType) => {
  const dispatch = useDispatch();
  const filterInput = useSelector(selectFilterInput);
  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputVal = e?.target.value;
    dispatch(setFilterData(inputVal));
  };
  return (
    <div>
      <input
        className={css.input}
        type="text"
        placeholder="Input pokemon name"
        name="pokeName"
        value={filterInput}
        onChange={filterType === 'home' ? handleInputOnChange : undefined}
      />
    </div>
  );
};
