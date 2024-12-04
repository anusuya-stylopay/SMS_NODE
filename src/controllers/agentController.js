const { default: axios } = require('axios');
const { getToken } = require('../services/authService');
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
    // if (loginRequired(req, res)) {
    //     return;
    // }
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

// const getAgentApplicationList=async (req, res) => {
//     // if (loginRequired(req, res)) {
//     //     return;
//     // }
//     if (!req.session.userData) {
//         return res.status(401).send({ "error": "Login Required" })
//     }
//     const token = await getToken();
//     const apiUrl = 'https://api.sandbox.edbucket.com/crm/api/v1/Contacts/search';
//     const headers = {
//         'Authorization': `Zoho-oauthtoken ${token.access_token}`,
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
//     };
//     const params = {
//         fields: 'Full_Name,Account_Name,Email,Phone,Mailing_Country',
//         criteria:`((Assigned_Agent.id:equals:${req.session.userData.data[0].id}))`
//     };
//     try {
//         let app_data = []
//         const response = await axios.get(apiUrl, { params: params, headers: headers })
//         console.log("responseagentapplication :",response.data)
//         if(!response.data){
//             return res.send({})
//         }
//         console.log("applicationResponse :",response.data.data)
//         const data=response.data.data
//         console.log("responseLength :",data.length)
//         for (let i = 0; i < data.length; i++) {
//             const apiUrl = `https://api.sandbox.edbucket.com/crm/api/v1/Contacts/${data[i].id}/Deals`;
//             const headers = {
//                 'Authorization': `Zoho-oauthtoken ${token}`,
//                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
//             };
//             const params = {
//                 fields: 'Full_Name,Account_Name,Email,Contact_Name,Stage,Course,Preferred_University_Universities,Closing_Date,Course_Opted,Level1,Duration1,University1,University,Select_Program,Preferred_intake,Last_Qualification,English_Language_Certificate_IF_ANY,IELTS_PTE_score,Disability_or_Impairment,If_Yes_please_provide_details,Where_did_you_hear_about_us,Were_you_introduced_by_an_agent,JOB_Experience,Acknowledgement,If_YES_Insert_the_AGENT_IDENTIFICATION,Offer_Letter_Counsellor,Offer_Letter_Student,Terms_and_conditions,Please_upload_photo_identification_of_yourself,Privacy_Policy,Academic_Transcript,Upload_English,Electronic_signature,Date,Course_Level,Course_Status,Course_Duration,Country'
//             };
//             try {
//                 const response = await axios.get(apiUrl, { params: params, headers: headers })
//                 console.log("agentcontrollerStudentSearchValue",response)
//                 console.log("agentcontrollerStudentSearchData",response.data)
//                 if(response?.data?.data){
//                 let totallength=response?.data?.data.length
//                 console.log("totallength",totallength)
//                 j=0
//                 while (totallength>0){
//                     app_data.push(response.data.data[j]);
//                     j++
//                     totallength--
//                 }
//             }
//             } catch (error) {
//                 console.log(error.response.data.message)
//                 res.status(error.response ? error.response.status : 500).send(error.message);
//                 return
//             }  
//         }
//        return res.send({data: app_data});
//     } catch (error) {
//         return res.status(error.response ? error.response.status : 500).send(error.message);
//     }
// }

module.exports = { getAgents, getAgentStudentsList, getAgentUniversityList, getAgentCourseList, getAgentApplicationList};