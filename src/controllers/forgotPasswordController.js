const { cognitoForgetPassword,cognitoConfirmForgetPassword } = require('../services/cognitoService');

const forgotPassword=async (req,res)=>{
    try {
        console.log("reach here")
        const cognitoForgetPasswordResponse = await cognitoForgetPassword(req, res)
        console.log("cognitoForgetPasswordResponse :",cognitoForgetPasswordResponse)
        return res.send(cognitoForgetPasswordResponse)
    }catch (error) {
        console.error('API Error:', error);
        return res.send(error)
    }
}

const confirmForgotPassword=async(req,res)=>{
    try {
        console.log("reach here cognitoConfirmForgetPassword")
        const cognitoConfirmForgetPasswordResponse = await cognitoConfirmForgetPassword(req, res)
        console.log("cognitoConfirmForgetPasswordResponse :",cognitoConfirmForgetPasswordResponse)
        return res.send(cognitoConfirmForgetPasswordResponse)
    }catch (error) {
        console.error('API Error:', error);
        return res.send(error)
    }
}

module.exports = { forgotPassword,confirmForgotPassword }