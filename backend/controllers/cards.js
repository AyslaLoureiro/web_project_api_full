const { Error } = require("mongoose");
const AppError = require("../utils/AppError.js");
const Card = require("../models/card.js");

function getCards(_req, res) {
  return Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new AppError("Nenhum cartão encontrado, 404");
      }

      return res.status(200).json(cards);
    })
    .catch((error) => {
      console.error("getCards Error:", error);
      return error;
    });
}

function createCards(req, res) {
  const { name, link } = req.body;

  if (!name && !link) {
    const error = new Error("Dados inválidos");
    error.status = 400;
    throw error;
  }

  const newCard = {
    name,
    link,
    owner: req.user._id,
  };

  return Card.create(newCard)
    .then((card) => {
      if (!card) {
        throw new AppError("Error ao criar o cartão", 500);
      }

      return res.status(201).json(card);
    })
    .catch((error) => {
      console.error("createCards Error:", error);
      return error;
    });
}

function deleteCardById(req, res) {
  const { cardId } = req.params;

  if (!cardId) {
    throw new AppError("Dados inválidos", 400);
  }

  const userId = req.user._id;

  return Card.deleteOne({ _id: cardId, owner: userId })
    .orFail(() => {
      throw new AppError("Error ao deletar o cartão", 500);
    })
    .then(() => {
      return res.status(204).send({
        message: "Cartão excluído com sucesso",
      });
    })
    .catch((error) => {
      console.error("deleteCardById Error:", error);
      return error;
    });
}

function likeCard(req, res) {
  const { cardId } = req.params;

  if (!cardId) {
    throw new AppError("Dados inválidos", 400);
  }

  const userId = req.user._id;

  return Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: {
        likes: userId,
      },
    },
    {
      new: true,
    }
  )
    .orFail(() => {
      throw new AppError("Error ao dar like no cartão", 500);
    })
    .then((newCard) => {
      return res.status(200).json({
        message: "Like efetuado com sucesso",
        newCard: { ...newCard._doc, isLiked: true },
      });
    })
    .catch((error) => {
      console.error("likeCard Error:", error);
      return error;
    });
}

function dislikeCard(req, res) {
  const { cardId } = req.params;

  if (!cardId) {
    throw new AppError("Dados inválidos", 400);
  }

  const userId = req.user._id;

  return Card.findByIdAndUpdate(
    cardId,
    {
      $pull: {
        likes: userId,
      },
    },
    {
      new: true,
    }
  )
    .orFail(() => {
      throw new AppError("Error ao dar like no cartão", 500);
    })
    .then((newCard) => {
      return res.status(200).json({
        message: "Dislike efetuado com sucesso",
        newCard: { ...newCard._doc, isLiked: false },
      });
    })
    .catch((error) => {
      console.error("dislikeCard Error:", error);
      return error;
    });
}

module.exports = {
  getCards,
  createCards,
  deleteCardById,
  likeCard,
  dislikeCard,
};
