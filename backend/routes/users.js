const router = require("express").Router();
const {
  login,
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require("../controllers/users.js");
const auth = require("../middleware/auth.js");

// Rota para buscar todos os usuários
router.get("/", auth, getUsers);

// Rota para obter usuário pelo ID
router.get("/me", auth, getUserById);

router.post("/signup", createUser);

router.post("/signin", login);

// para trocar apenas uma coisa
router.patch("/", auth, updateUserProfile);

// para trocar tudo
router.put("/", auth, updateUserAvatar);

module.exports = router;
