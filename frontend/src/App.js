import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { getToken, setToken } from "./utils/token";
import ImagePopup from "./components/ImagePopup";
import PopupEditProfile from "./components/PopupEditProfile";
import PopupAddCard from "./components/PopupAddCard";
import PopupEditAvatar from "./components/PopupEditAvatar";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import PopupCloseConfirmation from "./components/PopupCloseConfirmation";
import { getAPIInstance } from "./utils/api";
import ProtectedRoute from "./components/ProtectedRouter";
import * as auth from "./utils/auth";
import Login from "./components/Login";
import Register from "./components/Register";
import successIcon from "./images/checkiconpopup.png";
import unsuccessIcon from "./images/unsucessicon.png";
import InfoTooltip from "./components/InfoTooltip";

export function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedWithSucess, setLoggedWithSucess] = useState({});
  const navigate = useNavigate();
  const jwt = getToken();
  const api = getAPIInstance(jwt);

  const setInitialCards = () => {
    api
      .getInitialCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados do usuário:", err);
      });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  // valor  | função que seta o valor | valor inicial

  const setUserData = () => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados do usuário:", err);
      });
  };

  useEffect(() => {
    if (jwt) {
      setUserData();
      setInitialCards();
      setIsLoggedIn(true);
    }
  }, [jwt]);

  useEffect(() => {
    // Verifica o estado de login no localStorage
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
      navigate("/");
    }
  }, []);

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .signin(email, password)
      .then((data) => {
        setLoggedWithSucess({
          icon: successIcon,
          text: "Login efetuado com sucesso!",
        });
        setIsInfoToolTipOpen(true);
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          // setUserData();
          localStorage.setItem("isLoggedIn", "true");
          navigate("/");
        }
      })
      .catch((err) => {
        setLoggedWithSucess({
          icon: unsuccessIcon,
          text: "Problema ao efetuar o login! Por favor tente novamente.",
        });
        setIsInfoToolTipOpen(true);
      });
  };

  const handleRegistration = ({ email, password }) => {
    auth
      .signup(email, password)
      .then(() => {
        setLoggedWithSucess({
          icon: successIcon,
          text: "Registro efetuado com sucesso!",
        });
        setIsInfoToolTipOpen(true);
        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch((err) => {
        setLoggedWithSucess({
          icon: unsuccessIcon,
          text: "Problema ao efetuar o registro! Por favor tente novamente.",
        });
        setIsInfoToolTipOpen(true);
      });
  };

  const closeAllPopups = () => {
    console.log("Closed all popups");
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard();
  };

  const closeInfoToolTip = () => {
    setIsInfoToolTipOpen(false);
  };

  const handleSubmitProfile = (name, about, setIsLoading) => {
    // logica para trocar o nome e o about do profile
    // chamar a api para trocar o name e o about do profile
    api.editUserInfo({ name, about }).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      setIsLoading(false);
    });
  };

  const handleSubmitAvatar = (link) => {
    // logica para trocar a imagem do avatar
    // chamar a api para trocar a imagem do avatar
    api.editUserPhoto({ avatar: link }).then((newUserInfo) => {
      setCurrentUser(newUserInfo);
    });
  };

  async function handleCardLike(card) {
    // Verificar mais uma vez se esse cartão já foi curtido
    const isLiked = card.isLiked;
    if (isLiked) {
      await api
        .removeLike(card._id)
        .then(({ newCard }) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard
            )
          );
        })
        .catch((error) => console.error(error));
    } else {
      await api
        .addLike(card?._id)
        .then(({ newCard }) => {
          console.log(">>>>>>>>>>>>>>>>>> newCard", newCard);
          setCards((state) =>
            state.map((currentCard) =>
              currentCard?._id === card?._id ? newCard : currentCard
            )
          );
        })
        .catch((error) => console.error(error));
    }
  }

  function openPopupConfirmation(card) {
    setIsDeletePopupOpen(true);
    setCardToDelete(card);
  }

  async function handleCardDeleted(card) {
    try {
      api.deleteCard(card._id);
      setCards((prevCards) => {
        return prevCards.filter((prevCard) => prevCard._id !== card._id);
      });
    } catch (error) {
      console.error("Erro ao deletar o cartão:", error);
    }
  }

  async function handleAddPlaceSubmit(newCard, setIsLoading) {
    api
      .addNewCard(newCard)
      .then((cardData) => {
        setCards([cardData, ...cards]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleSubmitProfile,
        handleSubmitAvatar,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <div className="page">
                <Header />
                <Main
                  onEditProfileClick={setIsEditProfilePopupOpen}
                  onAddCardClick={setIsAddCardPopupOpen}
                  onEditAvatarClick={setIsEditAvatarPopupOpen}
                  onCardClick={handleCardClick}
                  handleCardLike={handleCardLike}
                  openPopupConfirmation={openPopupConfirmation}
                  cards={cards}
                />
                <Footer />
                <PopupEditProfile
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                />
                <PopupAddCard
                  isOpen={isAddCardPopupOpen}
                  onClose={closeAllPopups}
                  handleSubmit={handleAddPlaceSubmit}
                />
                <PopupEditAvatar
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                />
                <PopupCloseConfirmation
                  isOpen={isDeletePopupOpen}
                  onClose={closeAllPopups}
                  onDeleteCard={() => handleCardDeleted(cardToDelete)}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<Register handleRegistration={handleRegistration} />}
        />
      </Routes>
      {loggedWithSucess && (
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeInfoToolTip}
          text={loggedWithSucess.text}
          icon={loggedWithSucess.icon}
        />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
