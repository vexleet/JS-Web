const Article = require('../models/Article');
const Edit = require('../models/Edit');

module.exports = {
    index: async (req, res) => {
        let articles = await Article.find();
		if(articles.length > 0){
			let lastArticle = articles[articles.length - 1];

			let lastEditId = lastArticle.edits[lastArticle.edits.length - 1].toString();
			let mostRecentEdit = await Edit.findById(lastEditId);

			let latestArticle = {
				title: lastArticle.title,
				content: mostRecentEdit.content.split(/\s+/).slice(0,50).join(" "),
				_id: lastArticle._id,
			}

			let lastThreeArticles = [];

			if (articles.length >= 2) {
				lastThreeArticles = articles.slice(-4);
				lastThreeArticles.pop();
			}

			res.render('home/index', {
				latestArticle,
				lastThreeArticles,
			});
		}else{
			res.render('home/index');
		}
        
    }
};