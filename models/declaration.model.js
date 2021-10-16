
module.exports = (sequelize, Sequelize) => {
	const Declaration = sequelize.define('Declaration', {	
	  empID: {
            type: Sequelize.STRING,
            //  autoIncrement: true,
            primaryKey: true
      },
	//   empName: {
	// 		type: Sequelize.STRING
	//   },

    //   Pan_No:{
	// 	type: Sequelize.STRING
	// },
	 
	tax_on_income:{
		type: Sequelize.INTEGER

	},
	total_tax:{
		type: Sequelize.INTEGER

	},
	climit:{
		type: Sequelize.INTEGER

	}, 
    // glimit:{
	// 	type: Sequelize.INTEGER

	// }, 
	dlimit:{
		type: Sequelize.INTEGER

	}, 
    // elimit:{
	// 	type: Sequelize.INTEGER

	// }, 
    // ccclimit:{
	// 	type: Sequelize.INTEGER

	// }, 
    // ccdlimit:{
	// 	type: Sequelize.INTEGER

	// }, 
    ddlimit:{
		type: Sequelize.INTEGER

	} 

	});
  

	return Declaration;
}
