const { default: axios } = require('axios');
const { getToken } = require('../services/authService');
const { base_url } = require('../utils/config');
// const { fetchDNSDataResult} = require('../utils/config');
// setTimeout(async()=>{console.log("fetchDNSDataResult3",await fetchDNSDataResult)})

const getUniversities = async (req, res) => {
    const token = await getToken();
    // const access_token = token.access_token;
    // console.log("token" + token.access_token);
    console.log("token :",token)
    const apiUrl = 'https://api.sandbox.edbucket.com/crm/api/v1/University';
    console.log("universityAPI_URL :",apiUrl)
    const headers = {
        'Authorization': `Zoho-oauthtoken ${token.access_token}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    const params = {
        fields: 'Name,Owner,creatorID,Country,Modified_Time,Requirement,University_Description,Website_Link,Assigned_Counsellor,Course_List'
    };
    try {
        const response = await axios.get(apiUrl, { params: params, headers: headers })
        res.send(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
}

const getFilteredUniversities = async (req, res) => {
    const token = await getToken();
    console.log("token :",token)
    const apiUrl = 'https://api.sandbox.edbucket.com/crm/api/v1/University/search';
    console.log("universityAPI_URL :",apiUrl)
    const headers = {
        'Authorization': `Zoho-oauthtoken ${token.access_token}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    const { criteria, page } = req.query;
    const params = {
        fields: 'Name,Owner,creatorID,Country,Modified_Time,Requirement,University_Description,Website_Link,Assigned_Counsellor,Course_List',
        criteria,
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
module.exports = { getUniversities, getFilteredUniversities }
