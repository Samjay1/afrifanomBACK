const db = require('./database');

//DATE AND TIME
const oldDate = new Date()
let date = oldDate.toISOString().split('T')[0];
let time  = oldDate.toLocaleTimeString(); 

class loanModel{
    constructor() {
        global.db = db
    }

    
    // register new user
    requestLoan(customer_id,principal,interest, calback) { 
        let query = `INSERT INTO loan (customer_id,fullname,phone,employment,address,principal,interest,date,time) VALUES (?,?,?,?,?,?,?,?,?);`
       
        try {
            this.findCustomer(customer_id, (res) => { 
                if (res.status) {
                    // console.log('res :>> ', res);
                    let employment = res.response.employment;
                    let fullname = res.response.fullname;
                    let phone = res.response.phone;
                    let address = res.response.address;
                    db.query(query, [customer_id,fullname,phone,employment,address,principal,interest,date,time], (error, response) => {
                        if (error) {
                            // throw error;
                            return calback({
                                status: false,
                                message: 'System error(DB)!: '+error
                            })
                        } else{
                            return calback({
                                status: true,
                                message: 'Loan Request successful!'
                            })
                        }
                    })
                } else {
                    return calback({
                        status: false,
                        message:'Failed to request, Try again'
                    })
                 }
            })
        } catch (error) {
            return calback({
                status: false,
                message: 'System error!'
            })
        }
    }


    // find user
    findCustomer(customer_id, calback) { 
        let query = `SELECT * FROM customer WHERE id=?`
        try {
            db.query(query, [customer_id], (error, response) => {
                // console.log('response :>> ', response);
                if (error) {
                    return calback({
                        status: false,
                        message: 'System error(DB)!: '+error
                    })
                }
                else if (response.length == 0) { 
                    return calback({
                        status: false,
                        message: 'No user found'
                    })
                }
                else { 
                    return calback({
                        status: true,
                        response: response[0]
                    })
                }
            })
        } catch (error) {
            return calback({
                status: false,
                message: 'System error!'
            })
        }
    }

    // find Loan info
    findLoanById(id, calback) { 
        let query = `SELECT * FROM loan WHERE id=?`
        try {
            db.query(query, [id], (error, response) => {
                // console.log('response :>> ', response);
                if (error) {
                    return calback({
                        status: false,
                        message: 'System error(DB)!: '+error
                    })
                }
                else if (response.length == 0) { 
                    return calback({
                        status: false,
                        message: 'No user found'
                    })
                }
                else { 
                    let customer_id = response[0]['customer_id']
                    this.findLoansByCustomerId(customer_id,id, (result) => { 
                        if (result.status) {
                            return calback({
                                status: true,
                                response: {
                                    found: response[0],
                                    history: result.response
                                }
                            })
                        } else {
                            return calback({
                                status: true,
                                response: {
                                    found: response[0],
                                    history: []
                                }
                            })
                        }
                    })
                }
            })
        } catch (error) {
            return calback({
                status: false,
                message: 'System error!'
            })
        }
    }

     // find Loan list
     findLoans(calback) { 
        let query = `SELECT * FROM loan;`
        try {
            db.query(query,(error, response) => {
                console.log('response :>> ', response);
                if (error) {
                    return calback({
                        status: false,
                        message: 'System error(DB)!: '+error
                    })
                }
                else if (response.length == 0) { 
                    return calback({
                        status: false,
                        message: 'No user found'
                    })
                }
                else { 
                    return calback({
                        status: true,
                        response: response
                    })
                }
            })
        } catch (error) {
            return calback({
                status: false,
                message: 'System error!'
            })
        }
     }
    
    findLoansByCustomerId(id,exceptID, calback) { 
        let query = `SELECT * FROM loan WHERE customer_id=? AND NOT id=? ORDER BY id DESC`
        try {
            db.query(query, [id,exceptID], (error, response) => {
                // console.log('response :>> ', response);
                if (error) {
                    return calback({
                        status: false,
                        message: 'System error(DB)!: '+error
                    })
                }
                else if (response.length == 0) { 
                    return calback({
                        status: false,
                        message: 'No loads found'
                    })
                }
                else { 
                    return calback({
                        status: true,
                        response: response
                    })
                }
            })
        } catch (error) {
            return calback({
                status: false,
                message: 'System error!'
            })
        }
    }
}

module.exports = loanModel