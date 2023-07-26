const router = require('express').Router();
const loanModel = require('../models/loanModel')


let LoanDB = new loanModel();

// REQUEST LOAN
router.post('/request', (req, res) => { 
    let {customer_id,principal,interest } = req.body;

    try {
        // Username/Password must not be null/empty
        if (!customer_id || !principal) { 
            return res.status(404).json({
                status: false,
                message:'Customer/Principal must not be empty'
            })
        }
        //INSERT CREDENTIALS INTO DATABASE
        LoanDB.requestLoan(customer_id,principal,interest, (response) => {
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
    } catch (error) {
        return res.status(500).json({
            status: false,
            message:'Something went wrong, Try again.'
        })
    }
})

// LOAN PREVIEW
router.get('/preview/:id', (req, res) => { 
    let { id } = req.params;
    try { 
        // Username/pin must not be null/empty
        if (!id) { 
            return res.status(404).json({
                status: false,
                message:'ID must not be empty'
            })
        }
      
        //CONFIRM CREDENTIALS WITH DATABASE
        LoanDB.findLoanById(id, (response) => {
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
        return res.status(500).json({
            status: false,
            message:'Something went wrong, Try again.'
        })
    }

})

// LOAN LIST
router.get('/all', (req, res) => { 
    try { 
        LoanDB.findLoans((response) => {
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

module.exports = router