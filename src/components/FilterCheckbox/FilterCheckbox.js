import './FilterCheckbox.css';
import { useState } from 'react';

function FilterCheckbox () {
  const [isToggle, setIsToggle] = useState(true)
  function handleChange () {
    setIsToggle(!isToggle)
  }
  return (
    <div className='filter-checkbox'>
      <div className='filter-checkbox__toggle'>
        <label className='filter-checkbox__label-toggle' htmlFor='short-films'>
          <input
            className='filter-checkbox__toggle-checkbox-novisible'
            type='checkbox'
            name='short-films'
            id='short-films'
            checked={isToggle}
            onChange={handleChange}
          />
          <span className={`filter-checkbox__toggle-checkbox-visible ${isToggle && 'filter-checkbox__toggle-checkbox-visible_checked'}`} />
          Короткометражки
        </label>
      </div>
    </div>
  )
}
export default FilterCheckbox;
