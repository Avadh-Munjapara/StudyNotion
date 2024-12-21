const { capturePayment, verifySignature } = require('../controllers/payment');

const router=require('express').Router;

router.post('/capturePayment',capturePayment);
router.post('/verifySignature',verifySignature);

module.exports=router;