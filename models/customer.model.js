module.exports = (sequelize, Sequelize) => {
	const Customer = sequelize.define('customer', {	
	  empID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
      },
	  empName: {
			type: Sequelize.STRING
	  },
	  uan: {
			type: Sequelize.INTEGER
	  },
	  dept: {
			type: Sequelize.STRING
	  },
	designation:{
		type: Sequelize.STRING

	},
	basicPay:{
		type: Sequelize.INTEGER

	},
	gp:{
		type: Sequelize.INTEGER

	}, 
	pf:{
		type: Sequelize.DECIMAL

	}, 
	bankAccNum:{
		type: Sequelize.STRING

	},
	bankName:{
		type: Sequelize.STRING

	}, 
	doj:{
		type: Sequelize.DATE

	}, 
	salaryCategory:{
		type: Sequelize.STRING
		
	}

	});
	
	return Customer;
}
//empID	empName	uan	dept	designation	basicPay	gp	pf	bankAccNum	bankName	doj	salaryCategory
