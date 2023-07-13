import './Promo.css';

function Promo () {
  return (
    <section className='promo'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <nav className='promo__nav'>
        <ul className='promo__nav-links'>
          <li><a className='promo__link' href="#about-project">О проекте</a></li>
          <li><a className='promo__link' href="#tech">Технологии</a></li>
          <li><a className='promo__link' href="#about-me">Студент</a></li>
        </ul>
      </nav>
    </section>
  )
}

export default Promo;
