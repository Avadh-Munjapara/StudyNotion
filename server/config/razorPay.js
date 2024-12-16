const razorPay=require('razorpay');
require('dotenv').config();
const instance=new razorPay({
    key_id:RAZOR_KEY,
    key_secret:RAZOR_SECRET
})
exports.module=instance;