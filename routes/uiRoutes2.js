module.exports = function(app, uploadOptions) {
	var uiControls = require('../controllers/uiController2');

	app.route('/uploadcert')
		.get(uiControls.showHomePage);
	
	app.route('/send')
		.post(uploadOptions, uiControls.uploadFiles);

	app.route('/sample')
		.get(uiControls.downloadSample);

	app.route('/started')
		.post(uiControls.sendEmails);
}