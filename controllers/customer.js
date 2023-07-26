const router = require('express').Router();
const bcrypt = require('bcrypt');
const customerModel = require('../models/customerModel')



let CustomerDB = new customerModel();

// REGISTER CUSTOMER
router.post('/register', (req, res) => { 
    let { fullname,marital,employment,employer,dob,idcard,address, phone, password } = req.body;
    try { 
        if (!phone || !password) { 
            res.status(404).json({
                status: false,
                message:'phone/password must not be empty'
            })
        }
      
            //Hashing the password
        const hashedpassword = bcrypt.hashSync(password, 10);
        
        //INSERT CREDENTIALS WITH DATABASE
        CustomerDB.insertOne(fullname,marital,employment,employer,dob,idcard,address, phone, hashedpassword, (response) => {
            if (response.status) {
                return res.status(201).json({
                    status: true,
                    response:response.message
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: 'Account already exist (Change Phone number)',
                    other: response.message
                })
            }
        }) 
    } catch (error) {
        res.status(500).json({
            status: false,
            message:'Something went wrong, Try again.'
        })
    }

})


// LOGIN CUSTOMER
router.post('/login', (req, res) => { 
    let { phone, password } = req.body;
    console.log(phone, password )
    try { 
        // Username/Password must not be null/empty
        if (!phone || !password) { 
            res.status(404).json({
                status: false,
                message:'Phone/Password must not be empty'
            })
        }
      
        //CONFIRM CREDENTIALS WITH DATABASE
        CustomerDB.findCustomerbyPhone(phone, (response) => {
            if (response.status) {
                bcrypt.compare(password, response.response.password)
                    .then((status) => { 
                        if (status) { 
                            return res.status(201).json({
                                status: true,
                                message: 'Login successful',
                                response:response.response
                            })
                        } else {
                            return res.status(404).json({
                                status: false,
                                message: 'Password is incorrect',
                            })
                        }
                    }).catch((error) => { 
                        console.log('error :>> ', error);
                        return res.status(404).json({
                            status: false,
                            message: 'Something went wrong. Try again',
                        })
                    })
            } else {
                return res.status(404).json({
                    status: false,
                    message:'Something went wrong, Try again.'
                })
            }
        }) 
    } catch (error) {
        res.status(500).json({
            status: false,
            message:'Something went wrong, Try again.'
        })
    }

})


// UPDATE CUSTOMER INFO
router.post('/update', (req, res) => { 
    let { id, fullname,marital,employment,employer,dob,idcard,address, phone} = req.body; 
    
    try {
        // must not be null/empty
        if (!phone || !id) {
            return res.status(404).json({
                status: false,
                message:'phone number must not be empty'
            })
        } 
        CustomerDB.updateOne(id, fullname,marital,employment,employer,dob,idcard,address, phone, (response) => {
            // console.log('response :>> ', response);
            if (response.status) {
                return res.status(201).json({
                    status: true,
                    message: response.message,
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: response.message,
                })
            }
        })
    } catch (error){
        console.log('error :>> ', error);
        return res.status(500).json({
            status: false,
            message:'Something went wrong, Try again.'
        })
    }
})
// CUSTOMER PREVIEW
router.get('/customer/:id', (req, res) => { 
    let { id } = req.params;
    try { 
        // Username/pin must not be null/empty
        if (!id) { 
            res.status(404).json({
                status: false,
                message:'ID must not be empty'
            })
        }
      
        //CONFIRM CREDENTIALS WITH DATABASE
        CustomerDB.findcustomer(id, (response) => {
            if (response.status) {
                return res.status(200).json({
                    status: true,
                    message: response.message,
                    response:response.response
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: 'Something went wrong, Try again.',
                    other: response.message
                })
            }
        }) 
    } catch (error) {
        res.status(500).json({
            status: false,
            message:'Something went wrong, Try again.'
        })
    }

})

// ALL CUSTOMERS
router.get('/all', (req, res) => { 
    try { 
        //CONFIRM CREDENTIALS WITH DATABASE
        CustomerDB.findAllcustomer((response) => {
            if (response.status) {
                return res.status(200).json({
                    status: true,
                    message: response.message,
                    response:response.response
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: 'Something went wrong, Try again. 1',
                    response:response.message
                })
            }
        }) 
    } catch (error) {
        res.status(500).json({
            status: false,
            message:'Something went wrong, Try again.'
        })
    }

})

// DELETE CUSTOMER
router.get('/delete/:customer_id', (req, res) => { 
    let {customer_id} = req.params;

    try {
        // must not be null/empty
        if (!customer_id) {
            return res.status(404).json({
                status: false,
                message:'CUSTOMER ID must not be empty'
            })
        }
    
        CustomerDB.deletecustomer(customer_id, (response) => {
            // console.log('response :>> ', response);
            if (response.status) {
                return res.status(201).json({
                    status: true,
                    message: response.message,
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: response.message,
                })
            }
        })
    } catch (error){
        console.log('error :>> ', error);
        return res.status(500).json({
            status: false,
            message:'Something went wrong, Try again.'
        })
    }
})


module.exports = router