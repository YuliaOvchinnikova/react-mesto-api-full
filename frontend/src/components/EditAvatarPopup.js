import {
  useState,
  useEffect,
} from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
}) {
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
      title="Change new profile photo"
      name="change"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_link"
        type="url"
        id="avatar-input"
        name="avatar"
        placeholder="Link of profile photo"
        required
        value={url}
        onChange={handleChange}
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
