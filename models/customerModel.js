const db = require('./database');

//DATE AND TIME
const oldDate = new Date()
let date = oldDate.toISOString().split('T')[0];
let time  = oldDate.toLocaleTimeString(); 

class customerModel{
    constructor() {
        global.db = db
    }

    
    // insert new customer
    insertOne(fullname,marital,employment,employer,dob,idCard,address, phone,password, calback) { 
        let query = `INSERT INTO customer (fullname,marital,employment,employer,dob,idcard,address,phone,password, date, time) VALUES (?,?,?,?,?,?,?,?,?,?,?);`
       
        try {
            db.query(query, [fullname,marital,employment,employer,dob,idCard,address, phone,password, date, time], (error, response) => {
                if (error) {
                    // throw error;
                    return calback({
                        status: false,
                        message: 'System error(DB)!: '+error
                    })
                } else{
                    return calback({
                        status: true,
                        message: 'New Customer added!'
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

    // update new customer
    updateOne(id, fullname,marital,employment,employer,dob,idCard,address, phone, calback) { 
        let query = `UPDATE customer SET fullname=?,marital=?,employment=?,employer=?,dob=?,idcard=?,address=?, phone=? WHERE id=?;`
       
        try {
            db.query(query, [fullname,marital,employment,employer,dob,idCard,address, phone, id], (error, response) => {
                if (error) {
                    // throw error;
                    return calback({
                        status: false,
                        message: 'System error(DB)!: '+error
                    })
                } else{
                    return calback({
                        status: true,
                        message: 'Update customer!'
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

    // delete customer
    deletecustomer(id, calback) { 
        let query = `DELETE FROM customer WHERE id=?;`
        
        try {
            db.query(query, [id], (error, response) => {
                if (error) {
                    // throw error;
                    return calback({
                        status: false,
                        message: 'System error(DB)!: '+error
                    })
                } else if(response.affectedRows != 0){
                    console.log('response :>> ', response);
                    return calback({
                        status: true,
                        message: 'customer Deleted!'
                    })
                } else {
                    return calback({
                        status: false,
                        message: 'Such customer not available'
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

    // find customer
    findcustomer(id, calback) {
        let query = `SELECT * FROM customer WHERE id=?`
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
                        message: 'No customer found'
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
    // find customer
    findCustomerbyPhone(phone, calback) {
        let query = `SELECT * FROM customer WHERE phone=?`
        try {
            db.query(query, [phone], (error, response) => {
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
                        message: 'No customer found'
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

    // find all customers 
    findAllcustomer(calback) { 
        let query = `SELECT * FROM customer;`
        try {
            db.query(query, (error, response) => {
                if (error) {
                    return calback({
                        status: false,
                        message: 'System error(DB)!: '+error
                    })
                }
                else if (response.length == 0) { 
                    return calback({
                        status: true,
                        message: 'No customer found',
                        response:[]
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

module.exports = customerModel