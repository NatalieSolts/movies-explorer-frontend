import './SearchForm.css';
import Section from '../Section/Section';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <Section type="small" >
      <form className='search-form'>
        <input name="movie-search" id="movie-search" type="text" required={true} className='search-form__input' placeholder="Фильм" />
        <button className="search-form__submit" type="submit"></button>
        <FilterCheckbox />
      </form>
    </Section>
  )
}

export default SearchForm;
