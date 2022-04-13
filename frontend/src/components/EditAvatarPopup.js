import { useState, useEffect } from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [url, setUrl] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: url,
    });
  }

  function handleChange(event) {
    setUrl(event.target.value);
  }

  useEffect(() => {
    setUrl('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_link"
        type="url"
        id="avatar-input"
        name="avatar"
        placeholder="Ссылка на аватарку"
        required
        value={url}
        onChange={handleChange}
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
