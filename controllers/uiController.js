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

	function AttendeeData(name, email,branch, empID, basicPay, gp,pf,da,hra,cca,lwp,ta,prof_tax,in_tax,sal_adv,rev_stmp,gross_sal, total_ded,net_sal ) {
	    this.Name = name;
	    this.EmailID = email;
		this.empID = empID;
		this.branch = branch;
		this.basicPay = basicPay;
		this.gp = gp;
		this.pf = pf;
		this.da = da;
		this.hra = hra;
		this.cca = cca;
		this.lwp = lwp;
		this.ta = ta;
		this.prof_tax = prof_tax;
		this.in_tax = in_tax;
		this.sal_adv = sal_adv;
		this.rev_stmp = rev_stmp;
		this.gross_sal = gross_sal;
		this.total_ded = total_ded;
		this.net_sal = net_sal;


	};

	var Attendees = [];
	var num = 0;

	var readCSVPromise = new Promise(function(resolve, reject) {
		obj.from.path(path.join(__dirname, '../uploads/sheetSelected.csv')).to.array(function(data) {
			for (var index = 1; index < data.length; index++) {
				num++;
	        	Attendees.push(new AttendeeData(data[index][0], data[index][1], data[index][2],data[index][3], data[index][4],data[index][5], data[index][6],data[index][7], data[index][8],data[index][9], data[index][10],data[index][11], data[index][12],data[index][13], data[index][14],data[index][15], data[index][16],data[index][17],data[index][18],));
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
        	// var tempHTML = templateStr.replace("Example", Attendees[index].Name)

			let str = templateStr;
			const mapObj = {
			  Example: Attendees[index].Name,
			  empno: Attendees[index].empID,
			  bob: Attendees[index].branch,
			  uanno: Attendees[index].uan,
			  bpay: Attendees[index].basicPay,
			  pf: Attendees[index].pf,
			  proftax: Attendees[index].prof_tax,
			  da: Attendees[index].da,
			  inctax: Attendees[index].in_tax,
			  hra: Attendees[index].hra,
			  //othded: Attendees[index].othded,
			  cca: Attendees[index].cca,
			  revstamp: Attendees[index].rev_stmp,
			  bpay: Attendees[index].basicPay,
			  //diff
			  totpay: Attendees[index].gross_sal,
			  totded: Attendees[index].total_ded,
			  netsal: Attendees[index].net_sal,


			//   catch: "Nidhi"
			
			};
			str = str.replace(/\b(?:Example|empno|bob|uanno|bpay|pf|agpdp|proftax|da|inctax|hra|cca|revstamp|totpay|totded|netsal)\b/gi, matched => mapObj[matched]);
			// console.log(templateStr);


			var createPromiseForEach = new Promise(function(resolve, reject) {
				pdf.create(str, options).toFile('./pdfs/certificate'+Attendees[index].Name+'.pdf', function(err, res) {
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
						subject: 'Your Android Development Workshop certificate is here!',
						text: 'Hi, \n \nHere is your certificate for participating in the ANDROID DEVELOPMENT WORKSHOP organized by Manan - A Techno Surge on January 19, 2019 at YMCA University of Science and Technology, Faridabad. \n \nThanks for making it a great workshop. \n \nBest, \nNaman Sachdeva \nSecretary, Manan - A Techno Surge \n+91 8222831183',
						attachments: [
						    {
						     path: path.join(__dirname, '../pdfs/certificate'+Attendees[index].Name+'.pdf')
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
	res.render("index1")
}
