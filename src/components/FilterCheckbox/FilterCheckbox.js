import './FilterCheckbox.css';
import { useEffect, useState } from 'react';

function FilterCheckbox ({ setIsChecked, isSaveValuesInLocalStorage }) {
  const [isToggle, setIsToggle] = useState(null)
  const isCheckedInLS = localStorage.getItem('filterCheckbox');
  function handleChange (event) {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    setIsToggle(isChecked)
  }
  useEffect(() => {
    if (isSaveValuesInLocalStorage) {
      setIsChecked(isCheckedInLS === 'true');
      setIsToggle(isCheckedInLS === 'true');
    }
  }, [])
  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__label-toggle' htmlFor='short-movies'>
        <input
          className='filter-checkbox__toggle-checkbox-novisible'
          type='checkbox'
          name='short-movies'
          id='short-movies'
          defaultChecked={isSaveValuesInLocalStorage ? isCheckedInLS === 'true' : false}
          onChange={handleChange}
        />
        <span className={`filter-checkbox__toggle-checkbox-visible ${isToggle && 'filter-checkbox__toggle-checkbox-visible_checked'}`} />
        Короткометражки
      </label>
    </div>
  )
}
export default FilterCheckbox;
