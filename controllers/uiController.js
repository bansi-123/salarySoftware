exports.showHomePage = function(req, res) {
	res.render('index');
}

exports.uploadFiles = function(req, res) {
	res.render('sendmails');
}

exports.downloadSample = function(req,res) {
	var fs = require('fs');
	var pdf = require('html-pdf');
	var path = require('path')
	var html, options;

	try {
		html = fs.readFileSync('./uploads/templateSelected.html', 'utf8');
		options = { height: '676px',
					width: '878px',
					timeout: 30000,
					base: 'file://' + path.join(__dirname, '../public/img/') };
	} catch(err) {
		res.send("No Template Available.")
	}

	var createPromise = new Promise(function(resolve, reject) {
		pdf.create(html, options).toFile('./pdfs/samplepdf.pdf', function(err, res) {
		  if(err)
		  	reject(err);
		  else
		  	resolve(res)
		});
	})

	// Use promise here - DONE
	createPromise.then(function(result) {
		console.log('File is - ', result);
		res.sendFile(path.join(__dirname, '../pdfs/samplepdf.pdf'));
	})
}

exports.sendEmails = function(req, res) {
	var csv = require('csv');
	var path = require('path');
	var fs = require('fs');
	var pdf = require('html-pdf');
	const nodemailer = require('nodemailer');
	var config = require('../config');

	var obj = csv();

	function AttendeeData(name, email) {
	    this.Name = name;
	    this.EmailID = email;
	};

	var Attendees = [];
	var num = 0;
	var readCSVPromise = new Promise(function(resolve, reject) {
		obj.from.path(path.join(__dirname, '../uploads/sheetSelected.csv')).to.array(function(data) {
			for (var index = 0; index < data.length; index++) {
				num++;
	        	Attendees.push(new AttendeeData(data[index][0], data[index][1]));
	    	}
	    	resolve(Attendees);
		});
	})

	var htmlSource;
	readCSVPromise.then(function(result) {

		htmlSource = fs.readFileSync("./uploads/templateSelected.html", "utf8");
	
	}).then(function(){

		var templateStr = htmlSource.toString();
		options = { height: '676px',
					width: '878px',
					timeout: 30000,
					base: 'file://' + path.join(__dirname, '../public/img/') };

		// TODO make this synchronous 

		// var i = 0;
  //           async.each(result,function(item){
  //           normal_mail(item.email, item.firstName, subject, message);
  //               i++;
  //           },function(err){
  //               console.log("hello");
  //             res.redirect('/admin');
  //           });
  //           if(i == result.length)
  //              res.redirect('/admin');

        function prepareAndMail(index) {
        	var tempHTML = templateStr.replace("mojojojo", Attendees[index].Name)

			var createPromiseForEach = new Promise(function(resolve, reject) {
				pdf.create(tempHTML, options).toFile('./pdfs/salarySlip'+Attendees[index].Name+'.pdf', function(err, res) {
				  if(err)
				  	reject(err);
				  else
				  	resolve(res)
				});
			})

			createPromiseForEach.then(function(result) {
				const transporter = nodemailer.createTransport({
									service: 'Gmail',
						  			auth: {
						    		user: config.email,
						    		pass: config.password
						 }
					});
				
				const options = {
						from: config.email,
						to: Attendees[index].EmailID,
						subject: 'Your Salary Slip is here!',
						text: 'Sir/Maam, \n \n Attached below is the Salary Slip. In case of any queries, contact the admin department ',
						attachments: [
						    {
						     path: path.join(__dirname, '../pdfs/salarySlip'+Attendees[index].Name+'.pdf')
						    }
						]
					};

				transporter.sendMail(options, (error, info) =>{
					if(error) {
						console.log('----------------------ERROR---------------------------')
						console.log(error)
					} else {
						console.log('----------------------DONE---------------------------')
						console.log(info)
					}
				});
			})
        }
		
		for (var index = 0; index < num; index++) {
	      	prepareAndMail(index)
	    }
	})
	res.send("success")
}
