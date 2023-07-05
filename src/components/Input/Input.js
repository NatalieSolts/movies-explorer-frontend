import { useState } from 'react';
import './Input.css';
function Input ({
    defaultError = false,
    autoFocus = false,
    type,
    name,
    required,
    minLength,
    maxLength,
    label,
    defaultValue,
}) {
    const [error, setError] = useState(false)
    function handleChange (event) {
        !event.target.validity.valid
            ? setError(event.target.validationMessage)
            : setError('')
    }
    return (
        <label className="label">
            {label}
            <input
                className={`input
                ${autoFocus ? " input_focus " : ""}
                ${defaultError ? " input_error " : ""}
                `}
                type={type}
                name={name}
                id={name}
                required={required}
                minLength={minLength}
                maxLength={maxLength}
                onChange={handleChange}
                placeholder={label}
                defaultValue={defaultValue || ""}
                autoFocus={autoFocus}
            />
            <span
                className={`label__error ${error || defaultError ? 'label__error_active' : ''}`}
            >Что-то пошло не так...
            </span>
        </label>
    )
}
export default Input
