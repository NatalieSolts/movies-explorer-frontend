import { useEffect, useState } from 'react';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Logo from '../Logo/Logo';
import Section from '../Section/Section';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ onRegister, loggedIn }) => {
  const [values, setValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies', { replace: true });
    }
  }, [loggedIn]);

  function onSubmit (event) {
    event.preventDefault();
    const { email, password, name } = values;
    onRegister({ email, password, name });
  }

  function onSubmit (event) {
    event.preventDefault();
    const { email, password, name } = values;
    onRegister({ email, password, name });
  }

  function handleChange (event) {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  }
  return (
    <main>
      <Section type='auth'>
        <Logo />
        <h1 className='section__title'>Добро пожаловать!</h1>
        <Form name='login' txtBtnForm='Зарегистрироваться' onChange={handleChange} onSubmit={onSubmit}     >
          <Input type='text' name='name' required={true} label='Имя' maxLength={30} minLength={6}
          />
          <Input type='email' name='email' required={true} minLength={6} maxLength={30} label='E-mail' pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$" autoFocus={true} />
          <Input label='Пароль' type='password' name='password' required={true} minLength={6} maxLength={30} />
        </Form>
        <p className='section__text'>Уже зарегистрированы?<Link className="section__link" to="/signin">Войти</Link></p>
      </Section>
    </main>
  )
}

export default Register;
