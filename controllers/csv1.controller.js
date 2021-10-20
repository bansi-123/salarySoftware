// const stream = require('stream');
// const await = require('await')
// const fs = require('fs');
// const path = require('path');

// const db1 = require('../config/db.config1.js');
// const Declaration = db1.Declaration;

// const csv = require('fast-csv');
// const Json2csvParser = require('json2csv').Parser;

// /**
//  * Upload Single CSV file/ and Import data to MySQL/PostgreSQL database
//  * @param {*} req 
//  * @param {*} res 
//  */
// exports.uploadFile = (req, res) => {
//     try{
//         const Declarations = [];
//         fs.createReadStream(__basedir + "/uploads/" + req.file.filename)
//             .pipe(csv.parse({ headers: true }))
//             .on('error', error => {
//                 console.error(error);
//                 throw error.message;
//             })
//             .on('data', row => {
//                 Declarations.push(row);
//                 console.log(row);
//             })
//             .on('end', () => {
//                 // Save Declarations to MySQL/PostgreSQL database
//                 Declaration.bulkCreate(Declarations).then(() => {
//                     const result = {
//                         status: "ok",
//                         filename: req.file.originalname,
//                         message: "Upload Successfully!",
//                     }
    
//                     res.json(result);
//                 });    
//             });
//     }catch(error){
//         const result = {
//             status: "fail",
//             filename: req.file.originalname,
//             message: "Upload Error! message = " + error.message
//         }
//         res.json(result);
//     }
// }

// /** 
//  * Upload multiple Excel Files
//  *  
//  * @param {*} req 
//  * @param {*} res 
//  */
// exports.uploadMultipleFiles = async (req, res) => {
//     const messages = [];
    
// 	for (const file of req.files) {
//         try{
//             // Parsing CSV Files to data array objects
//             const csvParserStream = fs.createReadStream(__basedir + "/uploads/" + file.filename)
//                         .pipe(csv.parse({ headers: true }));

//             var end = new Promise(function(resolve, reject) {
//                 let Declarations = [];

//                 csvParserStream.on('data', object => {
//                     Declarations.push(object);
//                     console.log(object);
//                 });
//                 csvParserStream.on('end', () => {
//                     resolve(Declarations);
//                 });
//                 csvParserStream.on('error', error => {
//                     console.error(error);
//                     reject
//                 }); // or something like that. might need to close `hash`
//             });
            
//             await (async function() {
//                 let Declarations = await end;

//                 // save Declarations to MySQL/PostgreSQL database
//                 await Declaration.bulkCreate(Declarations).then(() => {
//                     const result = {
//                         status: "ok",
//                         filename: file.originalname,
//                         message: "Upload Successfully!",
//                     }
    
//                     messages.push(result);
//                 }); 
//             }());
//         }catch(error){
//             console.log(error);

//             const result = {
//                 status: "fail",
//                 filename: file.originalname,				
//                 message: "Error -> " + error.message
//             }
//             messages.push(result);
//         }
// 	}

// 	return res.json(messages);
// }


// exports.downloadFile = (req, res) => {
//     Declaration.findAll({attributes: ['empID', 'c', 'd', 'dd', 'total', 'gross_sal' ]}).then(objects => {
//         const jsonDeclarations = JSON.parse(JSON.stringify(objects));
//         const csvFields = ['empID', 'c', 'd', 'dd', 'total', 'gross_sal'];
//         const json2csvParser = new Json2csvParser({ csvFields });
//         const csvData1 = json2csvParser.parse(jsonDeclarations);

//         res.setHeader('Content-disposition', 'attachment; filename=Declarations.csv');
//         res.set('Content-Type', 'text/csv');
//         res.status(200).end(csvData1);
//     });
// }


const stream = require('stream');
const await = require('await')
const fs = require('fs');
const path = require('path');

const db1 = require('../config/db.config1.js');
const form = db1.form;

const csv = require('fast-csv');
const Json2csvParser = require('json2csv').Parser;

/**
 * Upload Single CSV file/ and Import data to MySQL/PostgreSQL database
 * @param {*} req 
 * @param {*} res 
 */
exports.uploadFile = (req, res) => {
    try{
        const Employees = [];
        fs.createReadStream(__basedir + "/uploads/" + req.file.filename)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => {
                console.error(error);
                console.log("here in error")
                throw error.message;
            })
            .on('data', row => {
                Employees.push(row);
                console.log(row);
                console.log("here in data")
            })
            .on('end', () => {
                // Save Employees to MySQL/PostgreSQL database
                form.bulkCreate(Employees).then(() => {
                    const result = {
                        status: "ok",
                        filename: req.file.originalname,
                        message: "Upload Successfully!",
                    }
                    
                    res.json(result);
                });    
            });
    }catch(error){
        const result = {
            status: "fail",
            filename: req.file.originalname,
            message: "Upload Error! message = " + error.message
        }
        res.json(result);
    }
}

/** 
 * Upload multiple Excel Files
 *  
 * @param {*} req 
 * @param {*} res 
 */
exports.uploadMultipleFiles = async (req, res) => {
    const messages = [];
    
	for (const file of req.files) {
        try{
            // Parsing CSV Files to data array objects
            const csvParserStream = fs.createReadStream(__basedir + "/uploads/" + file.filename)
                        .pipe(csv.parse({ headers: true }));

            var end = new Promise(function(resolve, reject) {
                let Employees = [];

                csvParserStream.on('data', object => {
                    Employees.push(object);
                    console.log(object);
                });
                csvParserStream.on('end', () => {
                    resolve(Employees);
                });
                csvParserStream.on('error', error => {
                    console.error(error);
                    reject
                }); // or something like that. might need to close `hash`
            });
            
            await (async function() {
                let Employees = await end;

                // save Employees to MySQL/PostgreSQL database
                await form.bulkCreate(Employees).then(() => {
                    const result = {
                        status: "ok",
                        filename: file.originalname,
                        message: "Upload Successfully!",
                    }
    
                    messages.push(result);
                }); 
            }());
        }catch(error){
            console.log(error);

            const result = {
                status: "fail",
                filename: file.originalname,				
                message: "Error -> " + error.message
            }
            messages.push(result);
        }
	}

	return res.json(messages);
}


exports.downloadFile = (req, res) => {
    form.findAll({attributes: ['empID', 'c', 'd', 'dd', 'total', 'gross_sal' ]}).then(objects => {
        const jsonEmployees = JSON.parse(JSON.stringify(objects));
        const csvFields = [ 'empID', 'c', 'd', 'dd', 'total', 'gross_sal'];
        const json2csvParser = new Json2csvParser({ csvFields });
        const csvData = json2csvParser.parse(jsonEmployees);

        res.setHeader('Content-disposition', 'attachment; filename=Employees.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).end(csvData);
    });
}
//empID	empName	uan	dept	designation	pay	gp	pf	bankAccNum	bankName	doj	salaryCategory
