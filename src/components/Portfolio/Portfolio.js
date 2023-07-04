import { portfolioList } from '../../utils/config';
import './Portfolio.css';

function Portfolio () {
  return (
    <div className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__sites '>
        {portfolioList.map(({ name, link }, index) => {
          return (<li className='portfolio__item' key={index}>
            <a href={link} target="_blank" rel="noreferrer" className="portfolio__link"  >
              <p className='portfolio__link-text'>{name}</p>
              <p className='portfolio__link-text'>&#x2197;</p>
            </a>
          </li>)
        })}
      </ul>
    </div>
  )
}

export default Portfolio;
