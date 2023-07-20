import './Techs.css';
import Section from '../Section/Section';

const Techs = () => {
  return (
    <Section title="Технологии" type={'grey'} id='tech'>
      <div className='techs'>
        <h3 className='techs__title'>7 технологий</h3>
        <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className='techs__list'>
          <li className='techs__item'> <p className='techs__list-text'> HTML </p> </li>
          <li className='techs__item'> <p className='techs__list-text'> CSS </p> </li>
          <li className='techs__item'> <p className='techs__list-text'> JS </p> </li>
          <li className='techs__item'> <p className='techs__list-text'> React </p> </li>
          <li className='techs__item'> <p className='techs__list-text'> Git </p> </li>
          <li className='techs__item'> <p className='techs__list-text'> Express.js </p> </li>
          <li className='techs__item'> <p className='techs__list-text'> mongoDB </p> </li>
        </ul>
      </div>
    </Section>)
}

export default Techs;
