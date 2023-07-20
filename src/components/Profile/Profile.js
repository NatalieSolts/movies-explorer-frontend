import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({ onEditProfile, isLoading, onSignOut }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [isDisabledStateBtn, setIsDisabledStateBtn] = useState(true)
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const [values, setValues] = useState(currentUser ? { 'profile-name': currentUser.name, 'profile-email': currentUser.email } : {});

  function handleChange (event) {
    const profileNameInput = event.target.form['profile-name'];
    const profileEmailInput = event.target.form['profile-email'];
    setValues({ ...values, [event.target.name]: event.target.value });

    if (profileNameInput.value !== currentUser.name || profileEmailInput.value !== currentUser.email) {
      if (profileNameInput.validity.valid && profileEmailInput.validity.valid) {
        setIsDisabledStateBtn(false);
        return;
      }
    }
    setIsDisabledStateBtn(true);
  }

  function handleSubmit (event) {
    event.preventDefault();
    onEditProfile(values['profile-email'], values['profile-name'])
  }

  function handleCloseEditForm () {
    setIsEdited(false);
  }

  function handleEditClick () {
    setIsEdited(true);
  }

  function handleClickButtonSignOut () {
    onSignOut();
  }

  useEffect(() => {
    const { name, email } = currentUser;
    setValues({ 'profile-name': name, 'profile-email': email });
  }, [currentUser]);

  return (
    <main>
      <section className='profile'>
        <h1 className='profile__title'>Привет, {values['profile-name']}!</h1>
        <form className='profile__form' name='profile__form' onChange={handleChange} onSubmit={handleSubmit}     >
          <label className="profile__text">
            Имя
            <input className='profile__form-input' type='text' name='profile-name' required minLength={2} maxLength={30} id='profile-name' placeholder='Имя' disabled={!isEdited} value={values['profile-name']}
            />
          </label>
          <label className="profile__text">
            E-mail
            <input className='profile__form-input' type='email' name='profile-email' required minLength={2} maxLength={30} id='profile-email' placeholder='E-mail' disabled={!isEdited} pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$" value={values['profile-email']} />
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
    </main>
  )
}

export default Profile;
