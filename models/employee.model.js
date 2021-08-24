// 
// 
// MODIFY THISSSSSSSSSSSSSSSSSSSSSSS
// 
// 
// 
module.exports = (sequelize, Sequelize) => {
	const Employee = sequelize.define('Employee', {	
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
	pay:{
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
		
	},
	ifscCode:{
		type: Sequelize.STRING
	},
	groupInsurance:{
		type: Sequelize.INTEGER
	},
	payBand:{
		type: Sequelize.STRING
	},
	designationCategory:{
		type: Sequelize.STRING
	},
	branchName:{
		type: Sequelize.STRING
	},
	emailID:{
		type: Sequelize.STRING
	}

	});
	
	return Employee;
}
//empID	empName	uan	dept	designation	pay	gp	pf	bankAccNum	bankName	doj	salaryCategory
