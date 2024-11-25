const { getToken } = require('../services/authService');
const axios = require('axios')
const { cognitoSignup } = require('../services/cognitoService');
const { createContact, createAgent, createCounsellors } = require('../services/zohoService');

const signup = async (req, res) => {
    const datainfo=req.body
    const cognitoSignupResponse = await cognitoSignup(req, res);
    // if(cognitoSignupResponse.errorCode){
    //     return res.send(cognitoSignupResponse)
    // }
    if(cognitoSignupResponse.status != 200){
        return res.send("Error in making signup req")
    }
    else if (datainfo.profile=='student'){
        console.log("student here 1")
        const createContactResponse = await createContact(req, res,datainfo);
        console.log("createContactResponse :",createContactResponse)
        if(createContactResponse.errorCode){
            console.log("student here 2")
            console.log("ErrorcreateContactResponse",createContactResponse)
            return res.status(200).send(createContactResponse)
        }
        if (createContactResponse.data[0].code==='SUCCESS'){
            console.log("student here 3")
            return res.send(createContactResponse);
        } else{
            console.log("student here 4")
            return res.status(500).send("contact API Failed");
        }
    }
    else if(datainfo.profile=='agent'){
        try{
        const createAgentResponse = await createAgent(req, res,datainfo)
        console.log("createAgentResponse :",createAgentResponse)
        return res.send(createAgentResponse.data);
        }
        catch(error){
        // Handle any errors here
        console.error('Request failed:', error);
        return res.status(error.response ? error.response.status : 500).send(error.message);
        };
    }
    else if (datainfo.profile=='counsellor'){
        const createCounsellorResponse = await createCounsellors(req, res,datainfo).then((response) => {
            res.send(response.data);
          }).catch((error) => {
            // Handle any errors here
            console.error('Request failed:', error);
            res.status(error.response ? error.response.status : 500).send(error.message);
          });
    }
};

// exports.signup = async (req, res) => {
//     const token = await getToken();
//     try {
//       const header = {
//         "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//         Authorization: `Zoho-oauthtoken ${token}`,
//         'Content-Type': 'application/json; charset=UTF-8'
//       };
//       const data = {
//         client_id: process.env.client_id,
//         pool_id: process.env.pool_id,
//         fullName: req.body.fullName,
//         password: req.body.password,
//         username: req.body.username,
//         group_name: "edbucket",
//         family_name: "edbucket",
//         profile: req.body.profile,
//         phone_number: `${req.body.countryCode}${req.body.phone}`, //need number with country code,
//         domainName: "",
//         branding: "false",
//       };
    
//     //   console.log("data" + data);
//       console.log(req.body)
//       console.log("Signup Request Data:", data);

//       const signUpStudent = await axios({
//         method: "POST",
//         url: "https://gkm943rqh7.execute-api.us-west-2.amazonaws.com/poc/auth/signup",
//         headers: header,
//         data: data,
//         timeout: 10000, // Set timeout to 10 seconds
//       });
  
//       console.log("Student signup response:", signUpStudent.data);
  
//       if (signUpStudent.data.errorCode) {
//         return res.status(400).json({
//           message: "Error during signup: " + signUpStudent.data.message,
//           errorCode: signUpStudent.data.errorCode,
//         });
//       }
  
    
//       // If no error, proceed with student creation in CRM
  
//     //   req.body.data[0].Email = req.body.data[0].email; // Add CRM-compliant key
//     //   delete req.body.data[0].email; // Remove original key
//       const request_Body = {
//         "data": [
//             {
//                 "Vendor_Name":req.body.fullName,
//                 "First_Name": req.body.fullName.split(" ").length < 2 ? req.body.fullName : req.body.fullName.substring(0,req.body.fullName.lastIndexOf(" ")),
//                 "Last_Name": req.body.fullName.split(" ").length < 2 ? "" : req.body.fullName.split(" ").pop(),
//                 "Email": req.body.username,
//                 "Phone": req.body.phone,
//                 "ISD_Code":req.body.ISD_Code
//             }
//         ]
//     };
//       const response = await axios({
//         method: "POST",
//         url: "https://api.sandbox.edbucket.com/crm/api/v1/Vendors",
//         headers: header,
//         data: request_Body
//       });
  
//       console.log("Agent Created:", response.data);
//       return res.status(response.status).json(response.data);
//     } catch (error) {
//       // Error handling for failed requests
//       console.error(error);
//       return res.status(500).json({
//         message: "Error in making Signup and Creating User request",
//         error: error.message,
//       });
//     }
//   };
  
module.exports = { signup }