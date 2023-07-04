import Section from '../Section/Section';
import './AboutMe.css';
import imageFoto from '../../images/photo.jpg'
import { Link } from 'react-router-dom';
import Portfolio from '../Portfolio/Portfolio'

function AboutMe () {
  return (
    <Section title="Студент" type='aboutme'>
      <div className='about-me'>
        <div className='about-me__table'>
          <div className='about-me__info'>
            <h3 className='about-me__name'>Наталья</h3>
            <h4 className='about-me__profession'>Фронтенд-разработчик, 33года</h4>
            <p className='about-me__text'>Родилась в г. Таллинн, живу сейчас в городе Пскове. У меня есть муж и прекрасная дочь.
              Свободное время посвящаю семье, спорту и творчеству. Люблю создавать игрушки в стиле тедди.
              В сфере IT я недавно </p>
            <Link className='about-me__link' to="https://github.com/NatalieSolts">Github</Link>
          </div>
          <img className='about-me__image' src={imageFoto} alt='фотография' />
        </div>
        <Portfolio />
      </div>
    </Section>
  )
}

export default AboutMe;
