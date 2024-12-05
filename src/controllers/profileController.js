const { default: axios } = require('axios');
const { getToken } = require('../services/authService');
const { loginRequired } = require('../utils/config');
const { fetchDNSDataResult} = require('../utils/config');

const getDetails = async (req, res) => {
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

const updateDetails=async (req, res) => {
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

    const request_Body = {
        "data": [
            {
                Email: req.session.userData.data[0].Email,
                Phone: req.session.userData.data[0].Phone,
                Date_of_Birth:req.body.Date_of_Birth,
                Nationality:req.body.Nationality,
                ISD_Code:req.body.countryCode,
                Street_Address:req.body.Street_Address,
                Street_Address_Line_2:req.body.Street_Address_Line_2,
                Mailing_City:req.body.Mailing_City,
                Mailing_State:req.body.Mailing_State,
                Mailing_Zip:req.body.Mailing_Zip,
                Mailing_Country:req.body.Mailing_Country,
                Please_upload_photo_identification_of_yourself:req.body.Please_upload_photo_identification_of_yourself
            }
        ]
    };

    if (req.session.userData.data[0].Vendor_Name) {
        let Full_Name = req.session.userData.data[0].Vendor_Name;
        const First_Name=Full_Name.split(" ").length < 2 ? Full_Name : Full_Name.substring(0, Full_Name.lastIndexOf(" "))
        const Last_Name =Full_Name.split(" ").length < 2 ? "" : Full_Name.split(" ").pop()
        request_Body.data[0].Vendor_Name=`${First_Name} ${Last_Name}`
        request_Body.data[0].First_Name=First_Name
        request_Body.data[0].Last_Name=Last_Name
    } else if (req.session.userData.data[0].Name) {
        let Full_Name = req.session.userData.data[0].Name;
        const First_Name=Full_Name.split(" ").length < 2 ? Full_Name : Full_Name.substring(0, Full_Name.lastIndexOf(" "))
        const Last_Name =Full_Name.split(" ").length < 2 ? "" : Full_Name.split(" ").pop()
        request_Body.data[0].Name=`${First_Name} ${Last_Name}`
        request_Body.data[0].First_Name=First_Name
        request_Body.data[0].Last_Name=Last_Name
    } else {
        // let Full_Name = req.session.userData.data[0].Full_Name;
        // const First_Name=Full_Name.split(" ").length < 2 ? Full_Name : Full_Name.substring(0, Full_Name.lastIndexOf(" "))
        const First_Name=req.session.userData.data[0].First_Name
        // const Last_Name =Full_Name.split(" ").length < 2 ? "" : Full_Name.split(" ").pop()
        const Last_Name =req.session.userData.data[0].First_Name
        // request_Body.data[0].Full_Name=`${First_Name} ${Last_Name}`
        request_Body.data[0].First_Name=First_Name
        request_Body.data[0].Last_Name=Last_Name
    }

    console.log("request_BodyUpdate :",request_Body)

    try {
        const response = await axios.put(apiUrl,request_Body, {headers })
        console.log("profileUpdateResponse :-",response)
        return res.send(response.data);
    } catch (error) {
        console.log("error :",error.response.data)
        return res.status(error.response ? error.response.status : 500).send(error.message);
    }; 
};

module.exports = {getDetails, updateDetails}