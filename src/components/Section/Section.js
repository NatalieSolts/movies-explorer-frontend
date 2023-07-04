import './Section.css';
import SectionTitle from '../SectionTitle/SectionTitle';



const Section = ({ title, type, children }) => {
    const sectionClass = `section ${type ? 'section_type_' + type : ''}`;
    return (
        <section className={sectionClass}>
            {title && (<SectionTitle title={title} />)}
            {children}
        </section>
    )
}
export default Section
