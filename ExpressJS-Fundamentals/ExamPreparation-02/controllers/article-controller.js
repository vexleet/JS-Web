const Article = require('../models/Article');
const Edit = require('../models/Edit');

module.exports = {
    getCreateArticle: (req, res) => {
        res.render('article/create');
    },

    postCreateArticle: async (req, res) => {
        let articleBody = req.body;

        let article = await Article.create({
            title: articleBody.title,
        });
        let edit = await Edit.create({
            author: req.user.email,
            content: articleBody.content,
            article: article._id,
        });

        article.edits.push(edit._id);
        article.save()

        res.redirect('/');
    },

    latestArticle: async (req, res) => {
        let article = await Article.find();
        let isAdmin = false;

        if (req.user) {
            if (req.user.roles.indexOf('Admin') >= 0) {
                isAdmin = true;
            }
        }

        let lastArticle = article[article.length - 1];

        let lastEditId = lastArticle.edits[lastArticle.edits.length - 1].toString();
        let mostRecentEdit = await Edit.findById(lastEditId);

        let splitContent = mostRecentEdit.content.split('\r\n\r');

        res.render('article/details', {
            title: lastArticle.title,
            content: splitContent,
            articleId: lastArticle._id,
            isLocked: lastArticle.isLocked,
            isAdmin,
        });
    },

    getAllArticles: async (req, res) => {
        let articles = await Article.find().sort({ title: 'ascending' });

        res.render('article/all-articles', { articles });
    },

    getArticleDetails: async (req, res) => {
        let articleId = req.params.id;
        let isAdmin = false;

        if (req.user) {
            if (req.user.roles.indexOf('Admin') >= 0) {
                isAdmin = true;
            }
        }

        let article = await Article.findById(articleId);
        let lastEditId = article.edits[article.edits.length - 1].toString();
        let mostRecentEdit = await Edit.findById(lastEditId);
        let splitContent = mostRecentEdit.content.split('\r\n\r');

        res.render('article/details', {
            title: article.title,
            content: splitContent,
            articleId,
            isLocked: article.isLocked,
            isAdmin,
        });
    },

    getArticleEdit: async (req, res) => {
        let articleId = req.params.id;
        let isAdmin = false;

        if (req.user) {
            if (req.user.roles.indexOf('Admin') >= 0) {
                isAdmin = true;
            }
        }

        let article = await Article.findById(articleId);
        let lastEditId = article.edits[article.edits.length - 1].toString();
        let mostRecentEdit = await Edit.findById(lastEditId);

        res.render('article/edit', {
            title: article.title,
            content: mostRecentEdit.content,
            articleId,
            isAdmin,
            isLocked: article.isLocked,
        });
    },

    postArticleEdit: async (req, res) => {
        let articleId = req.params.id;
        let articleContent = req.body.content;

        let article = await Article.findById(articleId);
        let newEdit = await Edit.create({
            author: req.user.email,
            content: articleContent,
            article: articleId,
        });

        article.edits.push(newEdit);
        article.save();

        res.redirect(`/article/details/${articleId}`);
    },

    getArticleHistory: async (req, res) => {
        let articleId = req.params.id;

        let article = await Article.findById(articleId);
        let edits = await Edit.find({ article: articleId });

        res.render('article/history', {
            edits,
            title: article.title,
        })
    },

    getArticleHistoryDetails: async (req, res) => {
        let editId = req.params.id;

        let edit = await Edit.findById(editId);
        let article = await Article.findById(edit.article);

        let splitContent = edit.content.split('\r\n\r');

        res.render('article/details-history', {
            title: article.title,
            content: splitContent,
        })
    },

    lockArticle: async (req, res) => {
        let articleId = req.params.id;

        let article = await Article.findById(articleId);

        article.isLocked = true;
        article.save();

        res.redirect(`/article/details/${articleId}`);
    },

    unlockArticle: async (req, res) => {
        let articleId = req.params.id;

        let article = await Article.findById(articleId);

        article.isLocked = false;
        article.save();

        res.redirect(`/article/details/${articleId}`);
    },

    searchArticle: async (req, res) => {
        let searchCriteria = req.body.criteria;

        let articles = await Article.find();
        articles = articles.filter(article => article.title.toLowerCase().includes(searchCriteria.toLowerCase()));

        res.render('article/all-articles', {
            articles
        })
    },
};