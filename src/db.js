const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./src/database.sqlite",
  logging: false,
  define: {
    timestamps: false
}
});

const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  return User;
};


const ItemModel = (sequelize, DataTypes) => {
  const Item = sequelize.define('items', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT,
    }
  });

  return Item;
};

const PurchaseItemModel = (sequelize, DataTypes) => {
  const PurchaseItem = sequelize.define('purchaseitems', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
    PurchaseItem.associate = (models) => {
    PurchaseItem.belongsTo(models.users, { foreignKey: 'user_id' });
    PurchaseItem.belongsTo(models.items, { foreignKey: 'item_id' });
  };

  return PurchaseItem;
};



const User = UserModel(sequelize, Sequelize.DataTypes);
const Item = ItemModel(sequelize, Sequelize.DataTypes);
const PurchaseItem = PurchaseItemModel(sequelize, Sequelize.DataTypes);

module.exports = {
  User,
  Item,
  PurchaseItem,
  sequelize,
};
