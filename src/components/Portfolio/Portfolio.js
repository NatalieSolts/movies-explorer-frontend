import './Portfolio.css';
import { portfolioList } from '../../utils/config';
import { Link } from 'react-router-dom';

function Portfolio () {
  return (
    <div className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__cases '>
        {portfolioList.map(({ name, link }, index) => {
          return (<li className='portfolio__item' key={index}>
            <Link href={link} rel="noreferrer" target="_blank" className="portfolio__link"  >
              <p className='portfolio__link-description'>{name}</p>
              <p className='portfolio__link-description'>&#x2197;</p>
            </Link>
          </li>)
        })}
      </ul>
    </div>
  )
}

export default Portfolio;
