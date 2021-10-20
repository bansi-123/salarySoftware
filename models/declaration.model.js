
module.exports = (sequelize, Sequelize) => {
	const form = sequelize.define('form', {	
	  empID: {
            type: Sequelize.STRING,
            //  autoIncrement: true,
            primaryKey: true
      },
 
	c:{
		type: Sequelize.INTEGER

	},
	d:{
		type: Sequelize.INTEGER

	},
	dd:{
		type: Sequelize.INTEGER

	}, 
	total:{
		type: Sequelize.INTEGER

	}, 
    gross_sal:{
		type: Sequelize.INTEGER

	} 

	});
  

	return form;
}
