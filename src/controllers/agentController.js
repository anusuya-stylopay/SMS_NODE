const { default: axios } = require('axios');
const { getToken } = require('../services/authService');
const { cognitoAdminCreateUser, cognitoResendPassword } = require('../services/cognitoService');
const { createContact, createCounsellors, } = require('../services/zohoService');
// const { loginRequired } = require('../utils/config');
// const { fetchDNSDataResult} = require('../utils/config');

// setTimeout(async()=>{console.log("fetchDNSDataResult2",await fetchDNSDataResult)})

const getAgents = async (req, res) => {
    // if (loginRequired(req, res)) {
    //     return;
    // }
    if (!req.session.userData) {
        return res.status(401).send({ "error": "Login Required" })
    }

    const token = await getToken();
    const apiUrl = 'https://api.sandbox.edbucket.com/crm/api/v1/Vendors';
    const headers = {
        'Authorization': `Zoho-oauthtoken ${token.access_token}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    const {page} = req.query;
    const params = {
        fields: 'Vendor_Name,Email,Phone,Owner,Converted__s,Converted_Date_Time,Mailing_Country',
        per_page: 15,
        page
    };

    try {
        const response = await axios.get(apiUrl, { params: params, headers: headers })
        res.send(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
}

const getAgentStudentsList = async (req, res) => {
    // if (loginRequired(req, res)) {
    //     return;
    // }
    if (!req.session.userData) {
        return res.status(401).send({ "error": "Login Required" })
    }
    console.log("agentuserdata :",req.session.userData.data[0].Email)
    const token = await getToken();
    const apiUrl = 'https://api.sandbox.edbucket.com/crm/api/v1/Contacts/search';
    const headers = {
        'Authorization': `Zoho-oauthtoken ${token.access_token}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    const params = {
        fields: 'Full_Name,Account_Name,Email,Phone,Mailing_Country',
        criteria:`((Assigned_Agent.id:equals:${req.session.userData.data[0].id}))`
    };

    try {
        const response = await axios.get(apiUrl, { params: params, headers: headers })
        console.log(response)
        res.send(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
}

const getAgentUniversityList = async (req, res) => {
    // if (loginRequired(req, res)) {
    //     return;
    // }
    if (!req.session.userData) {
        return res.status(401).send({ "error": "Login Required" })
    }
    console.log("agentuserdata :",req.session.userData.data[0].Email)
    const token = await getToken();
    const apiUrl = 'https://api.sandbox.edbucket.com/crm/api/v1/University/search';
    const headers = {
        'Authorization': `Zoho-oauthtoken ${token.access_token}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    const params = {
        fields: 'Website_Link,Name,Course_List,University_Description,Requirement,Country,Owner',
        criteria:`((Assigned_Agent.id:equals:${req.session.userData.data[0].id}))`
    };

    try {
        const response = await axios.get(apiUrl, { params: params, headers: headers })
        console.log(response)
        res.send(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
}

const getAgentCourseList = async (req, res) => {
    // if (loginRequired(req, res)) {
    //     return;
    // }
    if (!req.session.userData) {
        return res.status(401).send({ "error": "Login Required" })
    }
    console.log("agentuserdata :",req.session.userData.data[0].Email)
    const token = await getToken();
    const apiUrl = 'https://api.sandbox.edbucket.com/crm/api/v1/Course/search';
    const headers = {
        'Authorization': `Zoho-oauthtoken ${token.access_token}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    const params = {
        fields: 'Name,Course_URL,University,Duration,Department,Educational_Qualification,Creator_ID,Country,Subject',
        criteria:`((Assigned_Agent.id:equals:${req.session.userData.data[0].id}))`
    };

    try {
        const response = await axios.get(apiUrl, { params: params, headers: headers })
        console.log(response)
        res.send(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
}

const getAgentApplicationList = async (req, res) => {
    if (!req.session.userData) {
        return res.status(401).send({ "error": "Login Required" })
    }
    console.log("agentuserdata :",req.session.userData.data[0].Email)
    const token = await getToken();
    const apiUrl = 'https://api.sandbox.edbucket.com/crm/api/v1/Potentials/search';
    const headers = {
        'Authorization': `Zoho-oauthtoken ${token.access_token}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    const params = {
        fields: 'Select_Program,Country,University,Student_Email,Course_Department,Course_Duration,Course_Level,Preferred_intake,Last_Qualification,English_Language_Certificate_IF_ANY,IELTS_PTE_score,Disability_or_Impairment,If_Yes_please_provide_details,How_did_you_hear_about_us,editable,Were_you_introduced_by_an_agent,Academic_Transcript,Upload_English,Electronic_signature,Date,If_YES_Insert_the_AGENT_IDENTIFICATION,Pipeline,Contact_Name,Stage,Offer_Letter_Student,Offer_Letter_Counsellor,Please_upload_photo_identification_of_yourself,Acknowledgement,Privacy_Policy,Terms_and_conditions,Email,Deal_Name,Offer_Letter_Release_Date,Student_ID,Tuition_Fees,If_Tuition_Paid',
        criteria:`((Agent_Email:equals:${req.session.userData.data[0].Email}))`
    };

    try {
        const response = await axios.get(apiUrl, { params: params, headers: headers })
        console.log(response)
        res.send(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
}

const getAgentAllCounsellorList = async (req, res) => {
    console.log("reach here")
    if (!req.session.userData) {
        return res.status(401).send({ "error": "Login Required" })
    }
    const token = await getToken();
    const apiUrl = 'https://api.sandbox.edbucket.com/crm/api/v1/Counsellors/search';
    const headers = {
        'Authorization': `Zoho-oauthtoken ${token.access_token}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    const params = {
        fields: 'First_Name,Last_Name,Date_of_Birth,Gender,ISD_Code,Phone,Nationality,Vendor_Name,Email,Assigned_Counsellor,Street_Address,Street_Address_Line_2,Mailing_Zip,Mailing_State,Mailing_Country,Mailing_City',
        criteria: `((Assigned_Agent.id:equals:${req.session.userData.data[0].id}))`
    };
    
    try {
        console.log("reach here 2")
        const response = await axios.get(apiUrl, { params: params, headers: headers })
        console.log("response" + response)
        res.send(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
}

const createUserByAgent = async (req, res) => {
    console.log("reach here 1")
    if (!req.session.userData) {
        return res.status(401).send({ "error": "Login Required" })
    }
    const datainfo=req.body
    const cognitoCreateUserResponse = await cognitoAdminCreateUser(req, res);
    if(cognitoCreateUserResponse.errorCode){
        return res.send(cognitoCreateUserResponse)
    }
    // return cognitoSignupResponse;
    // if(cognitoSignupResponse.status != 200){
    //     return res.send("Error in making signup req")
    // }
    if (datainfo.profile=='student'){
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
    else if (datainfo.profile=='counsellor'){
        try{
            const createCounsellorResponse = await createCounsellors(req, res,datainfo)
            console.log("createCounsellorResponse :",createCounsellorResponse)
            return res.status(200).send(createCounsellorResponse.data);
            }
            catch(error){
            // Handle any errors here
            console.error('Request failed:', error);
            return res.status(error.response ? error.response.status : 500).send(error.message);
            };
    }
};

const resendPassword = async (req, res) => {
    console.log("Reached resendPassword endpoint");

    if (!req.session.userData) {
        return res.status(401).send({ error: "Login Required" });
    }

    const datainfo = req.body;

    try {
        const resendPasswordResponse = await cognitoResendPassword(req, res, datainfo);
        console.log("Success Response:", resendPasswordResponse);
        return res.status(200).send(resendPasswordResponse);
    } catch (error) {
        console.error("Error Response:", error);
        return res.status(error.statusCode || 500).send(error);
    }
};


module.exports = { getAgents, getAgentStudentsList, getAgentUniversityList, getAgentCourseList, getAgentApplicationList, getAgentAllCounsellorList, createUserByAgent, resendPassword};