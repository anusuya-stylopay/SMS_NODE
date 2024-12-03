const { default: axios } = require('axios');
const { getToken } = require('../services/authService');
const { loginRequired } = require('../utils/config');
const { fetchDNSDataResult} = require('../utils/config');

const getDetails = async (req, res) => {
    // if (loginRequired(req, res)) {
    //     return;
    // }
    if (!req.session.userData) {
        return res.status(401).send({ "error": "Login Required" })
    }
    let path;
    console.log("sessionDtaa",req.session.userData.data[0].profile)
    req.session.userData.data[0].profile === "student" ? path = 'Contacts' : (req.session.userData.data[0].profile === "agent" ? path = 'Vendors' : path = 'Counsellors')
    const token = await getToken();
    
    const apiUrl = `https://api.sandbox.edbucket.com/crm/api/v1/${path}/${req.session.userData.data[0].id}`;
    const headers = {
        'Authorization': `Zoho-oauthtoken ${token.access_token}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    const params = {
        fields: 'First_Name,Last_Name,Date_of_Birth,Nationality,Email,Phone,Street_Address,Street_Address_Line_2,Mailing_City,Mailing_State,Mailing_Zip,Please_upload_photo_identification_of_yourself,Mailing_Country',
    };

    try {
        const response = await axios.get(apiUrl, { params: params, headers })
        return res.send(response.data);
    } catch (error) {
        return res.status(error.response ? error.response.status : 500).send(error.message);
    };
};

module.exports = {getDetails}