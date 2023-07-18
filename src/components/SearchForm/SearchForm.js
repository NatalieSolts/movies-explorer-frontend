import './SearchForm.css';
import Section from '../Section/Section';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';

const SearchForm = ({ setIsChecked, setSearch, isLoading, isSaveValuesInLocalStorage }) => {
  const [isValid, setIsValid] = useState(false);
  function handleChange (event) {
    setIsValid(event.target.validity.valid);
  }
  function handleSubmit (event) {
    event.preventDefault();
    const searchText = event.target.elements['search'].value;
    setSearch(searchText);
    localStorage.setItem('search', searchText);
  }

  return (
    <Section type="small" >
      <form onChange={handleChange} onSubmit={handleSubmit} className='search-form'>
        <input name="search" id="search" type="text" required={true} className='search-form__input' placeholder="Фильм" defaultValue={isSaveValuesInLocalStorage ? localStorage.getItem('search') || '' : ''} />
        <button className="search-form__submit" type="submit" disabled={isLoading ? true : !isValid}></button>
        <FilterCheckbox setIsChecked={setIsChecked} isSaveValuesInLocalStorage={isSaveValuesInLocalStorage} />
      </form>
    </Section>
  )
}

export default SearchForm;
