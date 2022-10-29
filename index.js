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
app.use('/', articlesController);


app.get('/', (req, res) => {
    Article.findAll()
    .then(articles => {
        res.render('index', {articles: articles});
    })
});

app.get('/:slug', (req, res) => {
    let slug = req.params.slug;
    Article.findOne({
        where: {slug: slug}
    })
    .then(article => {
        if(article != undefined){
            res.render('');
        } else{
            res.redirect('/');
        }
    })
    .catch(errp => {
        res.redirect('/')
    })
})

app.listen(8080, () => {
    console.log('Servidor rodando\nhttp://localhost:8080');
})