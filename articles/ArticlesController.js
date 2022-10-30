const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');

router.get('/articles', (req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    })
        .then(articles => {
            res.render('admin/articles/index', { articles: articles })
        })
});

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/articles/new',
            { categories: categories });
    })
});


router.post('/articles/save', (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    })
        .then(() => {
            res.redirect('/articles');
        })
});


router.post('/admin/articles/delete', (req, res) => {
    let id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            })
                .then(() => {
                    res.redirect('/articles')
                })

        } else {
            res.redirect('/articles');
        }
    } else {
        res.redirect('/articles');
    }
});


router.get('/admin/articles/edit/:id', (req, res) => {
    let id = req.params.id;

    Article.findByPk(id)
    .then(article => {
        Category.findAll()
        .then(categories => {
            console.log({article, categories});
            res.render('admin/articles/edit', {article: article, categories: categories});

        })
    })
    .catch(() => {
        res.redirect('/articles');
    })
})

module.exports = router;