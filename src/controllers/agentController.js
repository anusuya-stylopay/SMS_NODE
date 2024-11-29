const { default: axios } = require('axios');
const { getToken } = require('../services/authService');
// const { loginRequired } = require('../utils/config');
// const { fetchDNSDataResult} = require('../utils/config');

// setTimeout(async()=>{console.log("fetchDNSDataResult2",await fetchDNSDataResult)})

const getAgents = async (req, res) => {
    // if (loginRequired(req, res)) {
    //     return;
    // }

    const token = await getToken();
    const apiUrl = 'https://api.sandbox.edbucket.com/crm/api/v1/Vendors';
    const headers = {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    const params = {
        fields: 'Vendor_Name,Email,Phone,Owner,Converted__s,Converted_Date_Time,Mailing_Country',
    };

    try {
        const response = await axios.get(apiUrl, { params: params, headers: headers })
        res.send(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
}

module.exports = { getAgents }