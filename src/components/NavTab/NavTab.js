import './NavTab.css';
import { aboutProjects } from '../../utils/config';

function NavTab () {
  return (
    <div className='nav-tab'>
      {aboutProjects.map((item, index) => {
        return (
          <article className='nav-tab__column' key={index}>
            <h3 className='nav-tab__heading'>{item.title}</h3>
            <p className='nav-tab__text'>{item.description}</p>
          </article>
        )
      })}
    </div>
  )
}
export default NavTab;
