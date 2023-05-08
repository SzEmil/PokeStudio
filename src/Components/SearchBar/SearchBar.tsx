import { useDispatch } from 'react-redux';
import { setFilterData } from '../../Redux/filter/filterSlice';
import { ChangeEvent } from 'react';
import css from './SearchBar.module.css';

export const SearchBar = () => {
  const dispatch = useDispatch();
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
        onChange={handleInputOnChange}
      />
    </div>
  );
};
