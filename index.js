const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database');


// VIEW ENGINE
app.set('view engine', 'ejs');

// ARQUIVOS ESTÁTICOS
app.set(express.static('public'));

// BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connection
.authenticate()
.then(() => {
    console.log('Conexão feita com sucesso')
})
.catch((error) => {
    console.log(error);
})

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(8080, () =>{
    console.log('Servidor rodando\nhttp://localhost:8080');
})