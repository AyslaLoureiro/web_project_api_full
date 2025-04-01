import ClosePopupIcon from "../images/closepopupicon.png";

export default function InfoTooltip({ icon, text, isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup__open" : ""}`}>
      <div className="overlay"></div>
      <div className="popup__form-itens">
        <div className="popup__button-close">
          <img src={ClosePopupIcon} alt="icon close" onClick={onClose} />
        </div>
        <div className="popup__info">
          <img src={icon} alt="icon" />
          <p className="popup__info-text">{text}</p>
        </div>
      </div>
    </div>
  );
}
