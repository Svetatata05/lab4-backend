const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

let users = []; // тимчасове зберігання користувачів

// POST /users/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Всі поля обов'язкові" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Пароль занадто короткий" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { name, email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: "Користувач створений", user: { name, email } });
});

// GET /users
router.get("/", (req, res) => {
  const safeUsers = users.map(u => ({ name: u.name, email: u.email }));
  res.json(safeUsers);
});

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Користувачі
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Повертає список користувачів
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список користувачів
 */
router.get("/", (req, res) => {
    const safeUsers = users.map(u => ({ name: u.name, email: u.email }));
    res.json(safeUsers);
  });
  
  /**
   * @swagger
   * /users/register:
   *   post:
   *     summary: Реєстрація нового користувача
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *             required:
   *               - name
   *               - email
   *               - password
   *     responses:
   *       201:
   *         description: Користувач створений
   *       400:
   *         description: Помилка валідації
   */
  router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Всі поля обов'язкові" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Пароль занадто короткий" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = { name, email, password: hashedPassword };
    users.push(newUser);
  
    res.status(201).json({ message: "Користувач створений", user: { name, email } });
  });