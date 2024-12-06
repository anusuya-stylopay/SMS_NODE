const axios = require("axios");
const { fetchDNSDataResult } = require("../utils/config");
const { config } = require("dotenv");
require("dotenv").config();
const {logger} = require("../../app"); 

async function cognitoSignup(req,res) {
  console.log("reach here 2")
  let data = {
    "client_id": process.env.client_id,
    "pool_id":process.env.pool_id,
    "password": req.body.password,
    "username": req.body.username,
    "fullName":req.body.fullName,
    "attributes": {
      "profile": req.body.profile,
      "phone_number": `${req.body.countryCode}${req.body.phone}`,//need number with country code,
    },
    "group_name": "edbucket",
      "family_name": "edbucket",
      "domainName":"",
      "branding":false
    };

console.log("Request Data:", data);
  try{
    logger.info({
        message: "Calling Cognito Signup API",
        endpoint: "https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signup",
        requestData: data,
      });
    console.log("Inside try block")
      const response = await axios.post(
        'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signup',
        data,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Content-Type': 'application/json'
          }
        }
      );
     
      console.log("After call the cognito api")
   
      logger.info({
        message: "Cognito Signup API Success",
        responseData: response.data,
      });
      return response.data
      }
  catch(error){
    if (error.response) {
        logger.error({
          message: "Cognito Signup API Error (Response Error)",
          status: error.response.status,
          responseData: error.response.data,
          headers: error.response.headers,
        });
      } else if (error.request) {
        logger.error({
          message: "Cognito Signup API Error (No Response)",
          request: error.request,
        });
      } else {
        logger.error({
          message: "Cognito Signup API Error (Setup Issue)",
          error: error.message,
        });
      }
    // Ensure only one response is sent and prevent further code execution
  if (!res.headersSent) {
    res.status(500).json({ error: "Failed to call Cognito Signup API" });
  }

  // Return false to signal an error occurred
  return false;
    }
}

async function cognitoVerifyOTP(req, res) {
  let data = {
  "client_id": process.env.client_id,
  "pool_id":process.env.pool_id,
  "username": req.body.username,
  "group_name": "edbucket",
  "family_name": "edbucket",
  "emailOTP": req.body.emailOTP,
  };
  console.log("data :",data)
  // let config = {
  // method: 'post',
  // url: 'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/confirm_signup',
  // headers: { 
  //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 
  //     'Content-Type': 'application/json'
  // },
  // data : data
  // };
  // console.log("config :",config)
  try{
  // const response=await axios.request(config)
  const response = await axios.post(
    'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/confirm_signup',
    data,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Content-Type': 'application/json'
      }
    }
  );
  console.log("reach here then block")
  console.log(JSON.stringify(response.data));
  return response.data
  }
  catch(error){
  console.log("reach here error block")
  console.log(error);
  return error
  };
}

async function cognitoResendOTP(req, res) {
  let data ={
  "client_id": process.env.client_id,
  "pool_id":process.env.pool_id,
  "username": req.body.username,
  "group_name": "edbucket",
  "family_name": "edbucket",
  };

  // let config = {
  // method: 'post',
  // url: 'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/resend_confirmation_code',
  // headers: { 
  //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 
  //     'Content-Type': 'application/json'
  // },
  // data : data
  // };
  try{
  // const response =await axios.request(config)
  const response = await axios.post(
    'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/resend_confirmation_code',
    data,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Content-Type': 'application/json'
      }
    }
  );
  if(response.data.ResponseMetadata.HTTPStatusCode===200){
      return response.data
  }
  }
  catch(error){
  console.log(error);
  return { error: error.message }
  };
}

async function cognitoLogin(req, res) {
    var userInfo;
    let data = {
    "client_id": process.env.client_id,
    "pool_id":process.env.pool_id,
    "username": req.body.username,
    "password": req.body.password,
    "group_name": "edbucket",
    "profile": req.body.profile
    };
    console.log("data :",data)

    let config = {
    method: 'post',
    url: 'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/adm_get_user',
    headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 
        'Content-Type': 'application/json'
    },
    data : data
    };
    try{
        const response=await axios.request(config)
        console.log(response)
        userInfo=response.data
        console.log(JSON.stringify(response.data.UserAttributes))
        const actualRole = response.data.UserAttributes.find(attr => attr.Name === "profile").Value;
        if (response.data.UserAttributes.find(attr => attr.Name === "profile").Value == data["profile"]) {
            const apiUrl = 'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signin';
            const requestBody = {
                "client_id": process.env.client_id,
                "pool_id":process.env.pool_id,
                "username":req.body.username,
                "password":req.body.password,
                "group_name":"edbucket",
                "profile":req.body.profile 
            }
            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 
                'Content-Type': 'application/json'
            };
            try {
                const response = await axios.post(apiUrl, requestBody,{headers:headers})
                response.data.username = requestBody["username"]
                response.data.profile = requestBody["profile"]
                response.data.userInfo=userInfo
                return response.data
            } catch (error) {
                return false;
            }
        }
        else {
            console.log(`vaild :false,reason:your are ${actualRole} please don't try to login with ${req.body.profile}`)
            return { errorCode: 'NotAuthorizedException',msg: ':Please check your login email and password.'}
        }
    }catch(error){
      console.log(error)
        // if(error.response.error=="USER_NOT_FOUND"){
        //     return { errorCode: 'NotAuthorized',msg: " :Please Provide vaild Credentials"}
        // }
        // console.log(error);
        return false
    }
}

async function cognitoForgetPassword(req,res){
    let data = {
    "client_id": process.env.client_id,
    "pool_id":process.env.pool_id,
    "username": req.body.username,
    };
    
    let config = {
      method: 'post',
      url: 'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/forget_password',
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    try{
    const response=await axios.request(config)
    return response.data
    }
    catch(error){
      console.log(error);
      return { "error": error.message }
    };
}

async function cognitoConfirmForgetPassword(req,res){
    let data = {
    "client_id": process.env.client_id,
    "pool_id":process.env.pool_id,
    "username": req.body.username,
    "newPassword": req.body.newPassword,
    "code": req.body.code
    };

    let config = {
    method: 'post',
    url: 'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/confirm_forget_password',
    headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 
        'Content-Type': 'application/json'
    },
    data : data
    };

    try{
    const response = await axios.request(config)
    console.log(JSON.stringify(response.data));
    return response.data
    }catch(error){
    console.log(error);
    return error
    };
}

async function cognitoAdminCreateUser(req, res){
  let data = {
    "client_id": process.env.client_id,
    "pool_id":process.env.pool_id,
    "username": req.body.username,
    "attributes": {
      "profile": req.body.profile
  }
    };

    let config = {
      method: 'post',
      url: 'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/adm_create_user',
      headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 
          'Content-Type': 'application/json'
      },
      data : data
      };

      try{
        const response = await axios.request(config)
        console.log(JSON.stringify(response.data));
        return response.data
        }catch(error){
        console.log(error);
        return error
        };
}


async function cognitoResendPassword(req, res, datainfo) {
  let data = {
      "client_id": process.env.client_id,
      "pool_id": process.env.pool_id,
      "username": datainfo.username,
  };

  console.log("Request Data:", JSON.stringify(data)); // Debugging data

  let config = {
      method: 'post',
      url: 'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/resend_password_adm_create_user',
      headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Content-Type': 'application/json',
      },
      data: data,
  };

  try {
      const response = await axios.request(config);
      console.log("API Response:", response.data);
      return response.data;
  } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error.response?.data || error; // Propagate the error to handle it in `resendPassword`
  }
}




module.exports = { cognitoSignup, cognitoVerifyOTP, cognitoResendOTP, cognitoLogin, cognitoForgetPassword, cognitoConfirmForgetPassword, cognitoAdminCreateUser, cognitoResendPassword};
