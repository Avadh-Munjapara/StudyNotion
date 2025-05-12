const { capturePayment, verifySignatureAndEnrollStudent } = require('../controllers/payment');

const  express  = require('express');
const router=express.Router();
router.post('/capturePayment',capturePayment);
router.post('/verifySignature',verifySignatureAndEnrollStudent);

module.exports=router;