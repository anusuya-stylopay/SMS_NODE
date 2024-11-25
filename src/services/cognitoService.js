const axios = require("axios");
const { fetchDNSDataResult } = require("../utils/config");
const { config } = require("dotenv");
require("dotenv").config();
var email;
// console.log("fetchDNSDataResult :",fetchDNSDataResult)
async function cognitoSignup(req, res) {
    console.log("reach here cognitoSignup");

//   let config = {
//     method: "post",
//     url: "https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signup",
//     headers: {
//       "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
//       "Content-Type": "application/json",
//     },
//     data: data,
//   };
  const apiUrl = 'https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signup';
  const _headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Content-Type': 'application/json'
  };
//   const header = {
//     "User-Agent":
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
//     "Content-Type": "application/json",
//   };
//   console.log("config :", config);
//   email = data["email"];
  try {
    // const response = await axios.request(config);
    const response = await axios.post(apiUrl, data, { headers: _headers })
    // const signUpStudent = await axios({
    //   method: "POST",
    //   url: "https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signup",
    //   headers: header,
    //   data: data,
    // });
    console.log("Signup Successful!");
    return response.data;
    // return signUpStudent.data;
  } catch (error) {
    console.log(error, "signupAPIError");
    return false;
  }
}

module.exports = { cognitoSignup };
