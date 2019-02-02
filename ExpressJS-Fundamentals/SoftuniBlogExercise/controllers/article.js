const Article = require('../models/Article');
const User = require('../models/User');
const Comments = require('../models/Comments');

module.exports = {
    createArticleGet: (req, res) => {
        res.render('article/create');
    },
    createArticlePost: async (req, res) => {
        let articleBody = req.body;
        articleBody.author = req.user._id;
        articleBody.summary = articleBody.content.substring(0, articleBody.content.length / 2) + "...";

        let article = await Article.create(articleBody);
        let user = await User.findById(req.user._id);

        user.articles.push(article._id);
        user.save()
            .then(() => {
                res.redirect('/');
            });
    },
    detailsGet: (req, res) => {
        let articleId = req.params.id;

        Article.findById(articleId)
            .populate('author')
            .then((article) => {
                let isAuth = false;

                if (req.user) {
                    if (req.user.isAuthor(article) || req.user.roles.indexOf('Admin') >= 0) {
                        isAuth = true;
                    }
                }

                Comments.find({article: {$in: articleId}})
                    .populate('creator')
                    .then((comments) => {
                        res.render('article/details', {article, isAuth, comments});
                    });


            });
    },
    commentsPost: async (req, res) => {
        let getBody = req.body;
        let articleId = req.params.id;

        let errorMsg = '';

        if (!req.isAuthenticated()) {
            errorMsg = 'You are not logged in!';
        } else if (getBody.content === "") {
            errorMsg = "You have to comment something";
            res.redirect('/article/details' + articleId, {error: errorMsg});
        }

        if (errorMsg) {
            res.render('user/login', {
                'error': errorMsg,
            });
            return;
        }

        getBody.creator = req.user.id;
        getBody.article = articleId;

        await Comments.create(getBody)
            .then(() => {
                res.redirect(`/article/details/${articleId}`);
            })
    },
    editArticleGet: (req, res) => {
        let articleId = req.params.id;

        Article.findById(articleId)
            .then((article) => {
                res.render('article/edit', {article});
            });
    },
    editArticlePost: async (req, res) => {
        let articleId = req.params.id;
        let editArticleBody = req.body;

        let article = await Article.findById(articleId);

        article.title = editArticleBody.title;
        article.content = editArticleBody.content;
        article.summary = editArticleBody.content.substring(0, editArticleBody.content.length / 2) + "...";

        article.save()
            .then(() => {
                res.redirect('/article/details/' + articleId);
            });
    },
    deleteArticleGet: (req, res) => {
        let articleId = req.params.id;

        Article.findById(articleId)
            .then((article) => {
                res.render('article/delete', {article});
            });
    },
    deleteArticlePost: async (req, res) => {
        let articleId = req.params.id;

        let article = await Article.findByIdAndDelete(articleId);

        if (req.user.isAuthor(article) || req.user.roles.indexOf('Admin') >= 0) {
            User.findById(article.author)
                .then((user) => {
                    let indexOfArticle = user.articles.indexOf(articleId);

                    user.articles.splice(indexOfArticle, 1);
                    user.save()
                        .then(() => {
                            res.redirect('/');
                        });
                });
        }
    }
};