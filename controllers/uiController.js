exports.showHomePage = function(req, res) {
		res.render("index", {
			role: "accountant"
		});
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

	function AttendeeData(name, email, month,year, uanno, empid, pay,agp,dada,hra,cca,diffi,othspl,tata, grosstot,provi,proftax,inctax,othded,
		revstamp,totalded,netsalary,accno,bankname) {
	    this.Name = name;
	    this.EmailID = email;
		this.Month=month;
		this.Year = year;
		this.Uanno = uanno;
		this.Empid= empid;
		this.Pay= pay;
		this.Agp= agp;
		this.Dada= dada;
		this.Hra= hra;
		this.Cca= cca;
		this.Diffi= diffi;
		this.Othspl= othspl;
		this.Tata= tata;
		this.Grosstot= grosstot;
		
		this.Provi= provi;
		this.Proftax= proftax;
		this.Inctax= inctax;
		this.Othded= othded;
		this.Revstamp= revstamp;
		this.Totalded= totalded;
		this.Netsalary= netsalary;
		this.Accno= accno;
		this.Bankname= bankname;

	};

	var Attendees = [];
	var num = 0;
	var readCSVPromise = new Promise(function(resolve, reject) {
		obj.from.path(path.join(__dirname, '../uploads/sheetSelected.csv')).to.array(function(data) {
			for (var index = 0; index < data.length; index++) {
				num++;
	        	Attendees.push(new AttendeeData(data[index][0], data[index][1], data[index][2], data[index][3], data[index][4], data[index][5], data[index][6], data[index][7], data[index][8], data[index][9], 
					data[index][10], data[index][11], data[index][12], data[index][13], data[index][14], data[index][15], data[index][16], 
					data[index][17], data[index][18], data[index][19], data[index][20], data[index][21], data[index][22], data[index][23]));
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
				ramesh: Attendees[index].Name,
				ABC123: Attendees[index].EmailID,
				mahina:Attendees[index].Month,
				saal:Attendees[index].Year,
				uanno: Attendees[index].Uanno,
				ekdachaid: Attendees[index].Empid,
				haypay: Attendees[index].Pay,
				fundmhane: Attendees[index].Provi,
				yanchagp: Attendees[index].Agp,
				proftaxha: Attendees[index].Proftax,
				dadavada: Attendees[index].Dada,
				lootkut: Attendees[index].Inctax,
				housing: Attendees[index].Hra,
				othercuts: Attendees[index].Othded,
				ccasta: Attendees[index].Cca,
				revchastamp: Attendees[index].Revstamp,
				kasladiff: Attendees[index].Diffi,
				special26: Attendees[index].Othspl,
				tatabata: Attendees[index].Tata,
				grossew: Attendees[index].Grosstot,
				sagleded: Attendees[index].Totalded,
				nethathme: Attendees[index].Netsalary,
				dontshare: Attendees[index].Accno,
				capital: Attendees[index].Bankname,
 

			//   catch: "Nidhi"
			
			};
				lootkut: Attendees[index].Inctax,
				str = str.replace(/\b(?:ramesh|ABC123|mahina|saal|uanno|ekdachaid|haypay|fundmhane|yanchagp|proftaxha|dadavada|lootkut|housing|othercuts|ccasta|revchastamp|kasladiff|special26|tatabata|grossew|sagleded|nethathme|dontshare|capital)\b/gi, matched => mapObj[matched]);
			//console.log(templateStr);


			var createPromiseForEach = new Promise(function(resolve, reject) {
				pdf.create(str, options).toFile('./pdfs/salarySlip'+Attendees[index].Name+'.pdf', function(err, res) {
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
						subject: 'Salary Slip for the month of' + Attendees[index].Month,
						text: 'Dear Sir / Madam,\nPlease find attached herewith Salary  Slip for the month '+ Attendees[index].Month+ ' - ' + Attendees[index].Year +'.\nYou are requested to sign the pay register at Administration Office (Staff Counter).\nThanking You,\n	PICT. Admin. Dept.',
						attachments: [
						    {
						     path: path.join(__dirname, '../pdfs/salarysilp'+Attendees[index].Name+'.pdf')
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