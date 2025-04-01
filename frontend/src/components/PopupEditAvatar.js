import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function PopupEditAvatar({ isOpen, onClose }) {
  const { currentUser, handleSubmitAvatar } = useContext(CurrentUserContext);
  const [link, setLink] = useState(currentUser?.avatar);
  const [isFormValid, setIsFormValid] = useState(false);
  const [linkErrorMessage, setLinkErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputLinkRef = useRef();

  useEffect(() => {
    if (inputLinkRef.current) {
      const isValid = inputLinkRef.current.validity.valid;
      setIsFormValid(isValid);
      setLinkErrorMessage(
        isValid ? "" : inputLinkRef.current.validationMessage
      );
    } // Seta mensagem de error nos spans
  }, [link]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    handleSubmitAvatar(link, setIsLoading);
    setLink("");
    onClose();
  };

  return (
    <PopupWithForm
      id="popup-avatar-edit"
      title="Alterar a foto do perfil"
      buttonName="Salvar"
      isOpen={isOpen}
      onClose={onClose}
      isFormValid={isFormValid}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <div className="popup__form-edit-inputs">
        <input
          className="popup__form-input popup__input-photo-edit"
          placeholder="link de imagem"
          type="url"
          id="input-avatar"
          value={link}
          required
          name="avatar"
          onChange={(e) => setLink(e.target.value)}
          ref={inputLinkRef}
        />
        <span className="popup__span-error" id="input-avatar-error">
          {linkErrorMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}
