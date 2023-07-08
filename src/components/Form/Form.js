import './Form.css';
import { useState } from 'react';

function Form ({
    name,
    onSubmit,
    textForButtonForm,
    onChange,
    children
}) {
    const [validForm, setValidForm] = useState(true);
    function handleChange (event) {
        event.preventDefault();
        setValidForm(event.target.validity.valid)
        onChange(event)
    }
    function handleSubmit (event) {
        event.preventDefault();
        onSubmit(event)
    }
    return (
        <form onSubmit={handleSubmit} onChange={handleChange} name={name} id={name} action="#" className={`form form_type_${name}`} noValidate        >
            <div>
                {children}
            </div>
            <button type="submit" form={name} className={`form__button`} disabled={!validForm}            >
                {textForButtonForm}
            </button>
        </form>
    )
}
export default Form
