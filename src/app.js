const express = require("express");
const db = require("./db");

const {bobNexusShoppingList, arnoldBumsteadShoppingList} = require('./data/data');

const app = express();
const {ItemsRouter,UsersRouter} = require('./routes/index');

app.use(express.json());

app.use('/item',ItemsRouter);
app.use('/user', UsersRouter);

const generateInsertStatements = (items) => {
  const insertStatements = items.map(item => {
    const { name, unit } = item;
    return `INSERT INTO "items" (name, unit) VALUES ('${name}', ${unit ? `'${unit}'` : 'NULL'});`;
  });
  return insertStatements.join('\n');
}

db.sequelize.query(`INSERT INTO "users" (name) VALUES ('Bob'), ('Arnold');`)

const bobSqlStatements = generateInsertStatements(bobNexusShoppingList);
const arnoldSqlStatements = generateInsertStatements(arnoldBumsteadShoppingList);

db.sequelize.query(bobSqlStatements)
db.sequelize.query(arnoldSqlStatements)

app.get("/", async (req, res) => {
  return res
    .status(200)
    .json({ msg: "Teste!" });
});

module.exports = app;
