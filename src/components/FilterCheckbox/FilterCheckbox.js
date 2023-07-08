import './FilterCheckbox.css';
import { useState } from 'react';

function FilterCheckbox () {
  const [isToggle, setIsToggle] = useState(true)
  function handleChange () {
    setIsToggle(!isToggle)
  }
  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__label-toggle' htmlFor='short-movies'>
        <input
          className='filter-checkbox__toggle-checkbox-novisible'
          type='checkbox'
          name='short-movies'
          id='short-movies'
          checked={isToggle}
          onChange={handleChange}
        />
        <span className={`filter-checkbox__toggle-checkbox-visible ${isToggle && 'filter-checkbox__toggle-checkbox-visible_checked'}`} />
        Короткометражки
      </label>
    </div>
  )
}
export default FilterCheckbox;
