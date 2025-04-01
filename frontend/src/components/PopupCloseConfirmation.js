import PopupWithForm from "./PopupWithForm";
export default function PopupCloseConfirmation({
  onClose,
  isOpen,
  onDeleteCard,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onDeleteCard();
    onClose();
  };

  return (
    <PopupWithForm
      name="confirmation"
      id="popup-delete"
      title="Tem Certeza?"
      isOpen={isOpen}
      onClose={onClose}
      buttonName="Sim"
      handleSubmit={handleSubmit}
    />
  );
}
