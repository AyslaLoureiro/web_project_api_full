const { Error } = require("mongoose");
const Card = require("../models/card.js");

function getCards(req, res, next) {
  return Card.find({})
    .then((cards) => {
      if (!cards) {
        const error = new Error("Cartões não encontrados");
        error.status = 404;
        throw error;
      }

      return res.status(200).json(cards);
    })
    .catch((error) => {
      console.error("getCards Error:", error);
      next(error);
    });
}

function createCards(req, res, next) {
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
        const error = new Error("Error ao criar o cartão");
        error.status = 500;
        throw error;
      }

      return res.status(201).json(card);
    })
    .catch((error) => {
      console.error("createCards Error:", error);
      next(error);
    });
}

function deleteCardById(req, res, next) {
  const { cardId } = req.params;

  if (!cardId) {
    const error = new Error("Dados inválidos");
    error.status = 400;
    throw error;
  }

  const userId = req.user._id;

  return Card.deleteOne({ _id: cardId, owner: userId })
    .orFail(() => {
      const error = new Error("Error ao deletar o cartão");
      error.status = 500;
      throw error;
    })
    .then(() => {
      return res.status(204).send({
        message: "Cartão excluído com sucesso",
      });
    })
    .catch((error) => {
      console.error("deleteCardById Error:", error);
      next(error);
    });
}

function likeCard(req, res, next) {
  const { cardId } = req.params;

  if (!cardId) {
    const error = new Error("Dados inválidos");
    error.status = 400;
    throw error;
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
      const error = new Error("Error ao dar like no cartão");
      error.status = 500;
      throw error;
    })
    .then(() => {
      return res.status(200).send({
        message: "Like efetuado com sucesso",
      });
    })
    .catch((error) => {
      console.error("likeCard Error:", error);
      next(error);
    });
}

function dislikeCard(req, res, next) {
  const { cardId } = req.params;

  if (!cardId) {
    const error = new Error("Dados inválidos");
    error.status = 400;
    throw error;
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
      const error = new Error("Error ao dar like no cartão");
      error.status = 500;
      throw error;
    })
    .then(() => {
      return res.status(200).send({
        message: "Dislike efetuado com sucesso",
      });
    })
    .catch((error) => {
      console.error("dislikeCard Error:", error);
      next(error);
    });
}

module.exports = {
  getCards,
  createCards,
  deleteCardById,
  likeCard,
  dislikeCard,
};
