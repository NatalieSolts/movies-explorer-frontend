// компонент с информацией о студенте.
import './AboutMe.css';
import imageFoto from '../../images/photo.jpg'
import { Link } from 'react-router-dom';
import Section from '../Section/Section';
const AboutMe = () => {
    return (
    <Section title="Студент" >
      <div className='about-me__column'>
        <div className='about-me__info'>
          <h3 className='about-me__name'>Наталья</h3>
          <h4 className='about-me__profession'>Фронтенд-разработчик, 33года</h4>
          <p className='about-me__text'>Родилась в г. Таллинн, живу сейчас в городе Пскове. У меня есть муж и прекрасная дочь.
Свободное время посвящаю семье, спорту и творчеству. Люблю создавать игрушки в стиле тедди. 
В сфере IT я недавно </p>
          <Link className='about-me__link-github' to="#">Github</Link>
        </div>
        <img className='about-me__photo' src={imageFoto} alt='мое фото - Наталья' />
      </div>
      <h4 className='about-me__portfolio'></h4>
    </Section>
  )
}

export default AboutMe;
