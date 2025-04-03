const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getCards,
  createCards,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

// Rota para buscar todos os cards
router.get("/", getCards);

router.post("/", createCards);

router.delete("/:cardId", deleteCardById);

router.put("/:cardId/likes", likeCard);

router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
