const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category')

const Article = connection.define('article', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Category.hasMany(Article); // UMA categoria tem MUITOS artigos
Article.belongsTo(Category); // Um artigo pertence a UMA categoria

// Article.sync({force: true});

module.exports = Article;