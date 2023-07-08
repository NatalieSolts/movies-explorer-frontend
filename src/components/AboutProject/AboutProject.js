import NavTab from '../NavTab/NavTab';
import Section from '../Section/Section';
import './AboutProject.css';

function AboutProject () {
  return (
    <Section title="О проекте" id='about-project'>
      <div className='about-project'>
        <NavTab />
        <div className='about-project__timing'>
          <span className='about-project__timing-item about-project__timing-item_head'>1 неделя</span>
          <span className='about-project__timing-item about-project__timing-item_head'>4 недели</span>
          <span className='about-project__timing-item'>Back-end</span>
          <span className='about-project__timing-item'>Front-end</span>
        </div>
      </div>
    </Section>
  )
}

export default AboutProject;
