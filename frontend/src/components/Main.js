import EdtButton from "../images/EditButton.png";
import AddButton from "../images/addbutton.png";
import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfileClick,
  onAddCardClick,
  onEditAvatarClick,
  onCardClick,
  handleCardLike,
  openPopupConfirmation,
  cards,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div
          className="profile__image-container"
          style={{ backgroundImage: `url(${currentUser?.avatar})` }}
        >
          <button
            className="profile__edit-icon"
            onClick={() => onEditAvatarClick(true)}
          ></button>
          <img
            src={currentUser?.avatar}
            alt="image profile"
            className="profile__image"
          />
        </div>
        <div className="profile__info">
          <div className="profile__content">
            <div className="profile__content-title-button">
              <h1 className="profile__title"> {currentUser?.name} </h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={() => onEditProfileClick(true)}
              >
                <img src={EdtButton} alt="edit button" />
              </button>
            </div>
            <h2 className="profile__explorar"> {currentUser?.about} </h2>
          </div>
        </div>

        <button
          className="profile__add-button"
          type="button"
          onClick={() => onAddCardClick(true)}
        >
          <img src={AddButton} alt="addbutton" />
        </button>
      </section>
      <section className="elements">
        {cards?.map((card) => {
          return (
            <Card
              key={card?._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              openPopupConfirmation={openPopupConfirmation}
            />
          );
        })}
      </section>
    </main>
  );
}
