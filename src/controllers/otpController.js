const {
  cognitoVerifyOTP,
  cognitoResendOTP,
} = require("../services/cognitoService");

const verifyOTP = async (req, res) => { 
  try {
    const cognitoOTPResponse = await cognitoVerifyOTP(req, res);

    console.log("cognitoOTPResponse :", cognitoOTPResponse);
    // return res.send(cognitoOTPResponse)
    if (cognitoOTPResponse.response.ResponseMetadata.HTTPStatusCode == 200) {
      return res.send(cognitoOTPResponse);
    } else {
      return res.status(500).send({ error: cognitoOTPResponse[0] });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const reSendOTP = async (req, res) => {
  const cognitoOTPResponse = await cognitoResendOTP(req, res);
  if (!cognitoOTPResponse.error) {
    return res.send(cognitoOTPResponse);
  } else {
    return res.status(500).send({ error: cognitoOTPResponse.error });
  }
};

module.exports = { verifyOTP, reSendOTP };
