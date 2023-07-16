import './FilterCheckbox.css';
import { useEffect, useState } from 'react';

function FilterCheckbox ({ onFilterMovies, setIsChecked }) {
  const [isToggle, setIsToggle] = useState(null)
  const isCheckedInLS = localStorage.getItem('filterCheckbox');
  function handleChange (event) {
    const isChecked = event.target.checked;
    localStorage.setItem('filterCheckbox', isChecked);
    setIsChecked(isChecked);
    setIsToggle(isChecked)
  }
  useEffect(() => {
    setIsChecked(isCheckedInLS === 'true');
    setIsToggle(isCheckedInLS === 'true');
  }, [])
  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__label-toggle' htmlFor='short-movies'>
        <input
          className='filter-checkbox__toggle-checkbox-novisible'
          type='checkbox'
          name='short-movies'
          id='short-movies'
          defaultChecked={isCheckedInLS === 'true'}
          onChange={handleChange}
        />
        <span className={`filter-checkbox__toggle-checkbox-visible ${isToggle && 'filter-checkbox__toggle-checkbox-visible_checked'}`} />
        Короткометражки
      </label>
    </div>
  )
}
export default FilterCheckbox;
