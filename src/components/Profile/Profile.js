import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { useRef, useState } from 'react';

const Profile = () => {
  const [values, setValues] = useState({ name: 'Виталий', email: 'email@yandex.ru' });
  const [isEdited, setIsEdited] = useState(false);
  const [isDisabledStateBtn, setIsDisabledStateBtn] = useState(true)
  const navigate = useNavigate();

  function handleChange (event) {
    const profileNameInputValue = event.target.form['profile-name'].value;
    const profileEmailInputValue = event.target.form['profile-email'].value;

    if (profileNameInputValue !== values.name || profileEmailInputValue !== values.email) {
      setIsDisabledStateBtn(false);
    } else {
      setIsDisabledStateBtn(true);
    }
  }
  function handleCloseEditForm () {
    setIsEdited(false);
  }
  function handleEditClick () {
    setIsEdited(true);
  }
  function handleClickButtonSignOut () {
    navigate("/");
  }
  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form className='profile__form' name='profile__form' textForButtonForm='Сохранить' onChange={handleChange}      >
        <label className="profile__text">
          Имя
          <input className='profile__form-input' type='text' name='profile-name' required minLength={2} maxLength={30} id='profile-name' placeholder='Имя' disabled={!isEdited} defaultValue={values.name} />
        </label>
        <label className="profile__text">
          E-mail
          <input className='profile__form-input' type='email' name='profile-email' required minLength={2} maxLength={30} id='profile-email' placeholder='E-mail' disabled={!isEdited} defaultValue={values.email} />
        </label>

        {isEdited ?
          <div className='profile__form-button-list'>
            <button type='submit' className='profile__form-button' disabled={isDisabledStateBtn}           >Сохранить</button>
            <button type='button' className='profile__form-button' onClick={handleCloseEditForm}            >Отменить</button>
          </div>
          : ''}
      </form>
      <nav className={`profile__links ${isEdited && 'profile__links_is-edited'}`}>
        {!isEdited ? <button type='button' className='profile__link' onClick={handleEditClick}>Редактировать</button> : ''}
        <button type='button' className='profile__link profile__link_type_logout' onClick={handleClickButtonSignOut}>Выйти из аккаунта</button>
      </nav>
    </section >
  )
}

export default Profile;
