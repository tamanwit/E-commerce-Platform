const Razorpay = require('razorpay')
const crypto = require('crypto')
const userModel = require('../model/userModel')
require('dotenv').config()


const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_API,
    key_secret:process.env.RAZORPAY_SECRET,
})


const create_order = async (req, res)=>{
    try{
        const {amount} = req.body
        const order = await razorpay.orders.create({
            amount: Math.round(amount*100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        })

        return res.status(201).json({
            success: true,
            order: order
        })
    } catch(error){
        return res.status(500).json({
            message : `internal server error`
        })
    }
}

const verify_payment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_SECRET
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    await userModel.findByIdAndUpdate(req.user.id, { $set: { cart: [] } });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

module.exports = {
    create_order,
    verify_payment,
}
