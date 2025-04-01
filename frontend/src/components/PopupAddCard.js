import PopupWithForm from "./PopupWithForm";
import { useRef, useState, useEffect } from "react";

export default function PopupAddCard({ isOpen, onClose, handleSubmit }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [linkErrorMessage, setLinkErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputTitleRef = useRef();
  const inputLinkRef = useRef();

  useEffect(() => {
    const isTitleValid = inputTitleRef.current.validity.valid;
    const isLinkValid = inputLinkRef.current.validity.valid;

    setIsFormValid(isTitleValid && isLinkValid); //  Define isFormValid como true somente se ambos os campos forem validos
    setTitleErrorMessage(
      isTitleValid ? "" : inputTitleRef.current.validationMessage
    );
    setLinkErrorMessage(
      isLinkValid ? "" : inputLinkRef.current.validationMessage
    );
  }, [title, link]);

  const handleSubmitAddCard = (event) => {
    event.preventDefault();

    if (!isFormValid) return; //Interrompe a execução da função se o formulário não estiver válido. Isso impede o envio de dados incompletos ou incorretos

    setIsLoading(true);
    handleSubmit({ name: title, link }, setIsLoading);
    setTitle("");
    setLink("");
    onClose();
  };

  return (
    <PopupWithForm
      id="popup-add"
      title="Novo Local"
      buttonName="Criar"
      isOpen={isOpen}
      onClose={onClose}
      isFormValid={isFormValid}
      handleSubmit={handleSubmitAddCard}
      isLoading={isLoading}
    >
      <div className="popup__form-inputs">
        <input
          ref={inputTitleRef}
          className="popup__form-input popup__form-name popup__add-form-name"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          id="input-title"
          required
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="popup__span-error" id="input-title-error">
          {" "}
          {titleErrorMessage}{" "}
        </span>
      </div>

      <div className="popup__form-inputs">
        <input
          ref={inputLinkRef}
          className="popup__form-input popup__form-job popup__add-form-image"
          placeholder="Link de imagem"
          type="url"
          id="input-image"
          required
          name="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <span className="popup__span-error" id="input-image-error">
          {" "}
          {linkErrorMessage}{" "}
        </span>
      </div>
    </PopupWithForm>
  );
}
