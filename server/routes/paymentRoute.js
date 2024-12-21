const { capturePayment, verifySignature } = require('../controllers/payment');

const  express  = require('express');
const router=express.Router();
router.post('/capturePayment',capturePayment);
router.post('/verifySignature',verifySignature);

module.exports=router;