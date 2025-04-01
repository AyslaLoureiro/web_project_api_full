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
router.get("/", auth, getCards);

router.post("/", auth, createCards);

router.delete("/:cardId", auth, deleteCardById);

router.put("/:cardId/likes", auth, likeCard);

router.delete("/:cardId/likes", auth, dislikeCard);

module.exports = router;
