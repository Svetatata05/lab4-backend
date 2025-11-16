const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

app.use(cors());
app.use(express.json());

// Swagger налаштування
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lab 4 API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // беремо коментарі з routes
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Lab 4 Backend is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
