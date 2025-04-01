import TrashButton from "../images/trash.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Card({
  card,
  onCardClick,
  onCardLike,
  openPopupConfirmation,
}) {
  // receber o medoto para abrir o popup de confirmação
  const { currentUser } = useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  const isOwner = card.owner._id === currentUser._id;
  const isLiked = card?.likes.some((like) => like._id === currentUser._id);
  const cardLikeButtonClassName = `elements__heart ${
    isLiked ? "elements__heart_is-active" : ""
  }`;

  return (
    <div className="elements__item">
      {isOwner && (
        <button
          type="button"
          className="elements__trash-button"
          onClick={() => openPopupConfirmation(card)}
        >
          <img src={TrashButton} alt="trash button" />
        </button>
      )}
      <img
        src={card.link}
        alt="elementimg"
        className="elements__image"
        onClick={handleClick}
      />

      <div className="elements__content">
        <h2 className="elements__title"> {card.name} </h2>
        <div className="elements__container-like-button">
          <button
            className={cardLikeButtonClassName}
            alt="heart icon"
            onClick={() => onCardLike({ ...card, isLiked })}
          />
          <span className="elements__count-like"> {card?.likes.length} </span>
        </div>
      </div>
    </div>
  );
}
