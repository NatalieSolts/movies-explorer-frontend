import Logo from '../Logo/Logo';
import { useState } from 'react';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Section from '../Section/Section';
import { Link } from 'react-router-dom';

function Login ({ onSubmit }) {
  const [values, setValues] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  function handleSubmit () {
    onSubmit(values.email, values.password)
  }
  return (
    <main>
      <Section type='auth'>
        <Logo />
        <h1 className='section__title'>Рады видеть!</h1>
        <Form name='login' txtBtnForm='Войти' onChange={handleChange} onSubmit={handleSubmit}    >
          <Input label='E-mail' type='email' name='email' required={true} minLength={8} maxLength={30} pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$" />
          <Input label='Пароль' type='password' name='password' required={true} minLength={6} maxLength={30} autoComplete='current-password' />
        </Form>
        <p className='section__text'>Ещё не зарегистрированы?<Link className="section__link" to="/signup">Регистрация</Link></p>
      </Section>
    </main>
  )
}

export default Login;
