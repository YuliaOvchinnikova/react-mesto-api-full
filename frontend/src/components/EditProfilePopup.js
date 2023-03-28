import PopupWithForm from './PopupWithForm';
import {
  useState,
  useEffect,
  useContext,
} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
}) {
  const currentUser = useContext(
    CurrentUserContext
  );
  const [name, setName] = useState('');
  const [description, setDescription] =
    useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Edit profile"
      name="edit"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        id="username-input"
        name="username"
        placeholder="Your name"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__input-error username-input-error"></span>
      <input
        className="popup__input popup__input_type_about"
        type="text"
        id="about-input"
        name="about"
        placeholder="Your description"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={
          handleDescriptionChange
        }
      />
      <span className="popup__input-error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
