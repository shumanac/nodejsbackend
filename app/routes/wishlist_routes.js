const db = require('../../config/db');
var ObjectID = require('mongodb').ObjectID;


// To read the wish list 
module.exports = function (app, db) {
	app.get('/wishlist/:id', (req, res) => {
		const id = req.params.id;
		const details = {
			'_id': new ObjectID(id)
		};
		db.collection('wishlist').findOne(details, (err, item) => {
			if (err) {
				res.send({
					'error': 'An error has occurred'
				});
			} else {
				res.send(item);
			}
		});
	});
	//To create the wish list
	app.post('/wishlistcreate', (req, res) => {
		const wishlist = {
			product: req.body.product,
			title: req.body.title,
			description: req.body.description,
			stockstatus: req.body.stockstatus,
			price: req.body.price
		};
		db.collection('wishlist').insert(wishlist, (err, result) => {
			if (err) {
				res.send({
					'error': 'An error has occurred'
				});
			} else {
				res.send(result.ops[0]);
			}
		});
	});
	//To delete the wish list
	app.delete('/wishlistremove/:id', (req, res) => {
		const id = req.params.id;
		const details = {
			'_id': new ObjectID(id)
		};
		db.collection('wishlist').remove(details, (err, item) => {
			if (err) {
				res.send({
					'error': 'An error has occurred'
				});
			} else {
				res.send('Wish ' + id + ' deleted!');
			}
		});
	});

	//To update the wish list
	app.put('/wishlistedit/:id', (req, res) => {
		const id = req.params.id;
		const details = {
			'_id': new ObjectID(id)
		};
		const wishlist = {
			product: req.body.product,
			title: req.body.title,
			description: req.body.description,
			stockstatus: req.body.stockstatus,
			price: req.body.price
		};
		db.collection('wishlist').update(details, wishlist, (err, result) => {
			if (err) {
				res.send({
					'error': 'An error has occurred'
				});
			} else {
				res.send(wishlist);
			}
		});
	});


};