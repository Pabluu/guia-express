const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database');

const Article = require('./articles/Article');
const Category = require('./categories/Category');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

// View engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com sucesso')
    })
    .catch((error) => {
        console.log(error);
    })


app.use('/', categoriesController);
app.use('/pablo', articlesController);


app.get('/', (req, res) => {
    res.render('index')
})

app.listen(8080, () => {
    console.log('Servidor rodando\nhttp://localhost:8080');
})