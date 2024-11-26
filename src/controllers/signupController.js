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
    return cognitoSignupResponse;
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
  
module.exports = { signup }