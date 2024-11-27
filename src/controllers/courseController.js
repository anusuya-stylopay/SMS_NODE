const { default: axios } = require('axios');
const { getToken } = require('../services/authService');
const { fetchDNSDataResult} = require('../utils/config');

const getCourse = async (req, res) => {
    const token = await getToken();
    const apiUrl = 'https://api.sandbox.edbucket.com/crm/api/v1/Course';
    const headers = {
        'Authorization': `Zoho-oauthtoken ${token.access_token}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    const params = {
        fields: 'Name,Course_URL,University,Duration,Department,Educational_Qualification,Creator_ID,Course_Fee,Course_Level,Country,Course_Description,Requirement,Course_Type,English_Requirement,Assigned_Counsellor,University_Name,Intake,Eligibility',
    };

    try {
        const response = await axios.get(apiUrl, { params: params, headers: headers })
        res.send(response.data);
    } catch (error){
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
}

const filterCourse = async (req, res) => {
    const token = await getToken();
    const url = 'https://api.sandbox.edbucket.com/crm/api/v1/Course/search';
    const _headers = {
        'Authorization': `Zoho-oauthtoken ${token.access_token}`,
        'User-Agent': 'Mozilla/5.0 Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
    };
    const { criteria, page } = req.query;

    const _params = {
        fields: 'Name,Course_URL,University,Duration,Department,Educational_Qualification,Creator_ID,Country,Subject,Assigned_Counsellor',
        per_page: 15,
        page: page,
        criteria: criteria
    };

    try {
        const response = await axios.get(url, { params: _params, headers: _headers })
        res.send(response.data);
        // const data = response.data.id
        // const apiUrl = `${(res.fetchDNSDataResult).baseUrl}/crm/api/v1/Course`;
        // const headers = {
        //     'Authorization': `Zoho-oauthtoken ${token}`,
        //     'User-Agent': 'Mozilla/5.0 Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
        // };
        // const params = {
        //     fields: 'Name,Course_URL,University,Duration,Department,Educational_Qualification,Creator_ID,Course_Fee,Course_Level,Country,Course_Description,Course_level,Requirement',
        //     criteria: `(University.id:equals:${data})`
        // };
        // try {
        //     const response = await axios.get(apiUrl, { params: params, headers: headers })
        //     res.send(response.data);
        // }

        // catch (error) {
        //     res.status(error.response ? error.response.status : 500).send(error.message);
        // }
    }
    catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }

}

module.exports = { getCourse, filterCourse }
