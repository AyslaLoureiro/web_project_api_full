import closePopupIcon from "../images/closepopupicon.png";

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-image ${card ? "popup__open" : ""}`}>
      <div className="overlay"></div>
      <div className="popup__image-itens">
        <button
          type="button"
          className="popup__button-close popup__image-button-close"
          onClick={onClose}
        >
          <img src={closePopupIcon} alt="icon close" />
        </button>
        <img src={card?.link} alt={card?.name} className="popup__image-zoom" />
        <p className="popup__image-text">{card?.name}</p>
      </div>
    </div>
  );
}
