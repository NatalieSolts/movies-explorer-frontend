import './Form.css';
import { useRef, useState } from 'react';

function Form ({
    name,
    onSubmit,
    txtBtnForm,
    onChange,
    children
}) {
    const [validForm, setValidForm] = useState(false);
    const ref = useRef(null);
    function handleChange (event) {
        const isValidForm = ref.current.elements.length
            ? [...ref.current.elements].some(
                (element) => element.validity.valid === false
            )
            : false;
        setValidForm(!isValidForm);
        onChange(event);
    }
    function handleSubmit (event) {
        event.preventDefault();
        onSubmit(event)
    }
    return (
        <form onSubmit={handleSubmit} onChange={handleChange} name={name} id={name} className={`form form_type_${name}`} noValidate ref={ref} >
            <div>
                {children}
            </div>
            <button type="submit" form={name} className={`form__button`} disabled={!validForm}            >
                {txtBtnForm}
            </button>
        </form>
    )
}
export default Form
