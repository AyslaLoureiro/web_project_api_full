const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const cors = require("cors");

const { PORT = 3000 } = process.env;
const app = express();
app.use(
  cors({
    origin: [
      "http://192.168.0.8:3000",
      "https://around-us.mooo.com",
      "https://wwww.around-us.mooo.com",
    ],
  })
);

// Middleware para parsing de JSON
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/aroundb");

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Rotas de usuários
app.use("/users", userRoutes);

// Rotas de cards
app.use("/cards", cardRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Router not found" });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
