const { cognitoLogin } = require('../services/cognitoService');
const { zohoLogin } = require('../services/zohoService');
 
const login = async (req, res) => {
    try {const cognitoLoginResponse = await cognitoLogin(req, res);
        console.log("cognitoLoginResponse",cognitoLoginResponse)
    if (!cognitoLoginResponse?.errorCode) {
        const zohoLoginResponse = await zohoLogin(req, res, cognitoLoginResponse);
        console.log("zohoLoginResponse :", zohoLoginResponse)
        if (zohoLoginResponse?.error) {
            console.log(zohoLoginResponse?.error)
            // { errorCode: 'NotAuthorizedException',msg: ':Please check your login email and password.'}
            console.log({errorCode: 'NotAuthorized',msg:`:${zohoLoginResponse.error}`})
            res.status(200).send({errorCode: 'NotAuthorized',msg:`:${zohoLoginResponse.error}`})
        } else {
            console.log("sessionResponse: ", zohoLoginResponse)
            req.session.userData = zohoLoginResponse;
            console.log("logsession :", req.session.userData)
            res.send(zohoLoginResponse)
        }
    }
    else {
        console.log("18-12-2023-cognitoLoginResponse :",cognitoLoginResponse)
        res.status(200).send(cognitoLoginResponse)
    }
}catch (error) {
    console.error('API Error:', error);
    res.status(400).send(error)
}
}
module.exports = { login }