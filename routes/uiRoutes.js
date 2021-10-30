module.exports = function(app, uploadOptions) {
	var uiControls = require('../controllers/uiController');

	app.route('/upload')
		.get(uiControls.showHomePage);

	// app.route('/upload')
  	// 	.get(function (req, res) {
			
	// 		res.redirect(uiControls.showHomePage, {
	// 			role: "accountant"
	// 		});
  	// 	});
	
	app.route('/send')
		.post(uploadOptions, uiControls.uploadFiles);

	app.route('/sample')
		.get(uiControls.downloadSample);

	app.route('/started')
		.post(uiControls.sendEmails);
}