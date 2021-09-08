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

	function AttendeeData(name, email,uan, pay,pf,gp,prof_tax,da,in_tax,hra,cca,rev_stmp,diff,oth_spl,ta,gross_sal, total_ded, net_sal) {
		this.Name = name;
	    this.EmailID = email;
		this.uan=uan;
		this.pay = pay;
		
		this.gp = gp;
		this.pf = pf;
		this.da = da;
		this.hra = hra;
		this.cca = cca;
		this.ta = ta;
		this.diff=diff;
		this.oth_spl=oth_spl;
		this.prof_tax = prof_tax;
		this.in_tax = in_tax;
		
		this.rev_stmp = rev_stmp;
		this.gross_sal = gross_sal;
		this.total_ded = total_ded;
		this.net_sal = net_sal;
	};

	var Attendees = [];
	var num = 0;
	var readCSVPromise = new Promise(function(resolve, reject) {
		obj.from.path(path.join(__dirname, '../uploads/sheetSelected.csv')).to.array(function(data) {
			for (var index = 0; index < data.length; index++) {
				num++;
	        	Attendees.push(new AttendeeData(data[index][0], data[index][1], data[index][2],data[index][3],data[index][4],data[index][5],data[index][6],data[index][7],data[index][8],data[index][9],data[index][10],data[index][11],data[index][12],data[index][13],data[index][14],data[index][15],data[index][16],data[index][17],data[index][18],data[index][19]));
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
			  one: Attendees[index].Name,
			 two: Attendees[index].EmailID,
			  //three: Attendees[index].bankName,
			//   four:Attendees[index].Name,
			  five:Attendees[index].uan,
			  six:Attendees[index].pay,
			  seven:Attendees[index].pf,
			  eight:Attendees[index].gp,
			  nine:Attendees[index].prof_tax,
			  ten:Attendees[index].da,
			  eleven:Attendees[index].in_tax,
			  twelve:Attendees[index].hra,
			//   thirteen:Attendees[index].othded,
			  fourteen:Attendees[index].cca,
			  fifteen:Attendees[index].rev_stmp,
			  sixteen:Attendees[index].diff,
			  seventeen:Attendees[index].oth_spl,
			  eighteen:Attendees[index].ta,
			  nineteen:Attendees[index].gross_sal,
			  twenty:Attendees[index].total_ded,
			  twentyone:Attendees[index].net_sal,
			//   catch: "Nidhi"
			
			};
			str = str.replace(/\b(?:one|five|six|seven|eight|nine|ten|eleven|twelve|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|twentyone)\b/gi, matched => mapObj[matched]);
			//console.log(templateStr);


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
						to: Attendees[index].uan,
						subject: 'Salary Slip for the month',
						text: 'Dear Sir / Madam \n Please find attached herewith Salary Slip for the month JUNE - 2021.\n You are requested to sign the pay register at Administration Office (Staff Counter) after rejoin the college.\n Thanking You \n	PICT. Admin. Dept.',
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
	res.send("success")
}