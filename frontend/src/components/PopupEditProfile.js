import PopupWithForm from "./PopupWithForm";
import { useRef, useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function PopupEditProfile({ isOpen, onClose }) {
  const { currentUser, handleSubmitProfile } = useContext(CurrentUserContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [name, setName] = useState(currentUser?.name);
  const [description, setDescription] = useState(currentUser?.about);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState();
  const inputNameRef = useRef();
  const inputAboutRef = useRef();

  useEffect(() => {
    setIsFormValid(
      inputNameRef.current.validity.valid &&
        inputAboutRef.current.validity.valid
    ); // true se o input 1 === true e o input 2 === true. Caso contrario false

    setNameErrorMessage(inputNameRef.current.validationMessage); // Seta mensagem de error nos spans
    setDescriptionErrorMessage(inputAboutRef.current.validationMessage); // Seta mensagem de error nos spans
  }, [name, description]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    handleSubmitProfile(name, description, setIsLoading);
    setName("");
    setDescription("");
    onClose();
  };

  return (
    <PopupWithForm
      id="popup__edit-profile"
      title="Editar Perfil"
      buttonName="Salvar"
      isOpen={isOpen}
      onClose={onClose}
      isFormValid={isFormValid}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <div className="popup__form-inputs">
        <input
          ref={inputNameRef}
          className="popup__form-input popup__form-name"
          id="input-name"
          placeholder="Jacques Cousteau"
          minLength="2"
          maxLength="40"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <span className="popup__span-error" id="input-name-error">
          {nameErrorMessage}
        </span>
      </div>

      <div className="popup__form-inputs">
        <input
          ref={inputAboutRef}
          className="popup__form-input popup__form-job"
          id="input-about"
          placeholder="Explorador"
          minLength="2"
          maxLength="400"
          name="about"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <span className="popup__span-error" id="input-about-error">
          {descriptionErrorMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}
