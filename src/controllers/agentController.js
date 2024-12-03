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

module.exports = { getAgents, getAgentStudentsList}