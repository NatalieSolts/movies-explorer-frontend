import './Section.css';
import SectionTitle from '../SectionTitle/SectionTitle';

const Section = ({ id, title, type, children }) => {
    const sectionClass = `section ${type ? 'section_type_' + type : ''}`;
    return (
        <section className={sectionClass} id={id}>
            {title && (<SectionTitle title={title} />)}
            {children}
        </section>
    )
}
export default Section
