const axios = require("axios");
const { fetchDNSDataResult } = require("../utils/config");
const { config } = require("dotenv");
require("dotenv").config();
const {logger} = require("../../app"); 
var email;
// console.log("fetchDNSDataResult :",fetchDNSDataResult)
// async function cognitoSignup(req, res) {
//     console.log("reach here cognitoSignup");

// //   let config = {
// //     method: "post",
// //     url: "https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signup",
// //     headers: {
// //       "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
// //       "Content-Type": "application/json",
// //     },
// //     data: data,
// //   };
//   const apiUrl = 'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signup';
//   const _headers = {
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//       'Content-Type': 'application/json'
//   };
// //   const header = {
// //     "User-Agent":
// //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
// //     "Content-Type": "application/json",
// //   };
// //   console.log("config :", config);
// //   email = data["email"];
//   try {
//     // const response = await axios.request(config);
//     const response = await axios.post(apiUrl, data, { headers: _headers })
//     // const signUpStudent = await axios({
//     //   method: "POST",
//     //   url: "https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signup",
//     //   headers: header,
//     //   data: data,
//     // });
//     console.log("Signup Successful!");
//     return response.data;
//     // return signUpStudent.data;
//   } catch (error) {
//     console.log(error, "signupAPIError");
//     return false;
//   }
// }
// logger.info("This is an info log");
// logger.error("This is an error log");
async function cognitoSignup(req,res) {
  console.log("reach here cognitoSignup")
//   let data = {
//   "client_id": process.env.client_id,
//   "pool_id":process.env.pool_id,
//   "fullName":req.body.fullName,
//   "password": req.body.password,
//   "username": req.body.username,
//   "group_name": "edbucket",
//   "family_name": "edbucket",
//   "profile": req.body.profile,
//   "phone_number": `${req.body.countryCode}${req.body.phone}`,//need number with country code,
//   "domainName":"",
//   "branding":false
//   };

  let data = {
    "client_id": process.env.client_id,
    "pool_id":process.env.pool_id,
    // "fullName":req.body.attributes.fullName,
    "password": req.body.password,
    "username": req.body.username,
    // "group_name": "edbucket",
    // "family_name": "edbucket",
    "profile": req.body.attributes.profile,
    // "phone_number": `${req.body.countryCode}${req.body.phone}`,//need number with country code,
    "phone_number": req.body.attributes.phone_number,//need number with country code,
    // "domainName":"",
    // "branding":false
    };
   

  // const data = {
  //   // client_id: req.body.client_id,
  //   // pool_id: req.body.pool_id,
  //   // fullName: req.body.fullName,
  //   // password: req.body.password,
  //   // email: req.body.username,
  //   client_id: "5inqugvufsfgj5akuc6qo44n8r",
  //   pool_id: "us-west-2_jRSM5xLAH",
  //   username: "aprajita.12@yopmail.com",
  //   emailOTP:"349296"
  //   // group_name: "edbucket",
  //   // family_name: "edbucket",
  //   // profile: req.body.profile,
  //   // phone_number: `${req.body.countryCode}${req.body.phone}`, // Need number with country code
  //   // domainName: "",
  //   // branding: false,
  // };

  // const data = {
  //   "file_key": req.body.file_key,
  //   "prompt": req.body.prompt,
  //   "attributes": req.body.attributes
  // }


  // console.log("data :",data)
   // Convert the object to JSON format
  //  const jsonData = JSON.stringify(data);
  //  console.log("jsonData:",  jsonData)

  // let config = {
  // method: 'post',
  // url: 'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signup',
  // headers: { 
  //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 
  //     'Content-Type': 'application/json'
  // },
  // data : JSON.stringify(data)
  // };
  // console.log("config :",config)
  // email=data['email']

//   const apiUrl = 'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signup';
//   const headers = {
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//       'Content-Type': 'application/json'
//   };
//   console.log("Request Headers:", headers);
console.log("Request Data:", data);
  try{
    logger.info({
        message: "Calling Cognito Signup API",
        endpoint: "https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signup",
        requestData: data,
      });
    console.log("Inside try block")
      // const response=await axios.request(config)
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
      // const response = await axios.post(
      //   'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/api/auth/confirm_signup',
      //   // JSON.parse(JSON.stringify(data)),
      //   data,
      //   {
      //     headers: {
      //       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      //       'Content-Type': 'application/json'
      //     }
      //   }
      // );
      console.log("After call the cognito api")
      // const response = await axios.post(apiUrl, data, { headers: _headers });
      // const response = await axios.post(apiUrl, data, { headers });
      // const response = await axios.post(apiUrl, JSON.stringify(data), { headers });
      // const signUpStudent = await axios({
      //   method: "POST",
      //   url: "https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signup",
      //   headers: header,
      //   data: data,
      // });
      logger.info({
        message: "Cognito Signup API Success",
        responseData: response.data,
      });
      console.log("response" + response)
      console.log("response" + response.data)
      console.log("Signup Successful!");
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
  

// async function cognitoSignup(req, res) {
//   console.log("reach here cognitoSignup");

//   let data = {
//     "client_id": "5inqugvufsfgj5akuc6qo44n8r",
//     "pool_id":"us-west-2_jRSM5xLAH",
//     "email": "aprajita.12@yopmail.com",
//     "group_name": "edbucket",
//     "family_name": "edbucket",
//     "emailOTP": 349296
//     };

//   try {
//     console.log("Inside try block");

//     const response = await axios.get(
//       'http://18.246.85.73:5001/unsubscribe?email=anusuya23789045%40gmail.com',
//       // data,
//       // {
//       //   headers: {
//       //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//       //     'Content-Type': 'application/json'
//       //   }
//       // }
//     );

//     console.log("Response:", response); // Inspect the full response object
//     console.log("Response Data:", response.data); // Inspect the response data

//     if (response && response.data) {
//       console.log("Signup Successful!");
//       return response.data;
//     } else {
//       console.error("Empty response received from the API.");
//       return false;
//     }
//   } catch (error) {
//     if (error.response) {
//       console.error("Error Response Data:", error.response.data);
//       console.error("Error Status:", error.response.status);
//       console.error("Error Headers:", error.response.headers);
//     } else if (error.request) {
//       console.error("Error Request:", error.request);
//     } else {
//       console.error("Error Message:", error.message);
//     }
//     return false;
//   }
// }



// async function cognitoSignup(req, res) {
//   console.log("reach here cognitoSignup");
  
//   let data = {
//     "client_id": process.env.client_id,
//     "pool_id": process.env.pool_id,
//     "fullName": req.body.fullName,
//     "email": req.body.username,
//     "password": req.body.password,
//     "group_name": "edbucket",
//     "family_name": "edbucket",
//     "profile": req.body.profile,
//    " phone_number": `${req.body.countryCode}${req.body.phone}`,
//     "domainName": "",
//     "branding": false,
//   };

//   console.log("Data being sent:", data);

//   const apiUrl = 'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signup';
//   const _headers = {
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//     'Content-Type': 'application/json'
//   };

//   try {
//     // const response = await axios.post(apiUrl, data, { headers });
//     const response = await axios({
//       method: "POST",
//       url: "https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signup",
//       headers: _headers,
//       data: data,
//     });
//     console.log("Signup Successful!", response.data);
//     res.status(200).json(response.data); // Send success response
//   } catch (error) {
//     console.error("Signup API Error:", error.response?.data || error.message);
//     return false
//     res.status(500).json({ error: error.response?.data || "Internal Server Error" });
//   }
// }

var loginEmail;
async function cognitoLogin(req, res) {
    var userInfo;
    let data = {
    "pool_id":process.env.pool_id,
    "email": req.body.email,
    "password": req.body.password,
    "group_name": "edbucket",
    "profile": req.body.profile
    };
    console.log("data :",data)

    let config = {
    method: 'post',
    url: `${(res.fetchDNSDataResult).baseUrl}/auth/api/v1/adm_get_user`,
    headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 
        'Content-Type': 'application/json'
    },
    data : data
    };
    try{
        const response=await axios.request(config)
        userInfo=response.data
        const actualRole = response.data.UserAttributes.find(attr => attr.Name === "custom:profile").Value;
        if (response.data.UserAttributes.find(attr => attr.Name === "custom:profile").Value == data["profile"]) {
            const apiUrl = `${(res.fetchDNSDataResult).baseUrl}/auth/api/v1/signin`;
            const requestBody = {
                "client_id": process.env.client_id,
                "pool_id":process.env.pool_id,
                "email":req.body.email,
                "password":req.body.password,
                "group_name":"edbucket",
                "profile":req.body.profile 
            }
            const headers = {
                'User-Agent': 'Mozilla/5.0 Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion', 
                'Content-Type': 'application/json'
            };
            try {
                const response = await axios.post(apiUrl, requestBody,{headers:headers})
                response.data.email = requestBody["email"]
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
        if(error.response.data.error=="USER_NOT_FOUND"){
            return { errorCode: 'NotAuthorized',msg: " :Please Provide vaild Credentials"}
        }
        console.log(error);
        return ("false")
    }
}

module.exports = { cognitoSignup, cognitoLogin };
