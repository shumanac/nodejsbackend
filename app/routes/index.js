const wishlistRoutes = require('./wishlist_routes');
module.exports = function (app, db) {
	wishlistRoutes(app, db);
	// Other route groups could go here, in the future
};