const axios = require('axios');
const { base_url } = require('../utils/config');
const { getToken } = require('./authService');
const { fetchDNSDataResult} = require('../utils/config');

// const getToken=async()=>{
//     const apiUrl ="http://localhost:5000/api/token/get"
//     try {
//         const response = await axios.post(apiUrl)
//         return response.data
//         // return response.data.data[0].code === "SUCCESS";
//     } catch (err) {
//         return err
//     }

// }

async function createContact(req, res,datainfo) {
    console.log("reavh here createContact ")
    console.log("Contact datainfo :",datainfo)
    const token = await getToken();
    const apiUrl = 'https://api.sandbox.edbucket.com/crm/api/v1/Contacts';
    const _headers = {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
    };
    const request_Body = {
        "data": [
            {
                "First_Name": datainfo.fullName.split(" ").length < 2 ? datainfo.fullName : datainfo.fullName.substring(0, datainfo.fullName.lastIndexOf(" ")),
                "Last_Name": datainfo.fullName.split(" ").length < 2 ? "" : datainfo.fullName.split(" ").pop(),
                "Email": datainfo.email,
                "Phone": datainfo.phone,
                "ISD_Code":datainfo.ISD_Code
            }
        ]
    };
    console.log("request_Body",request_Body)
    try {
        const response = await axios.post(apiUrl, request_Body, { headers: _headers })
        console.log("contactResponse :",response.data)
        return response.data;
    } 
    catch (error) {
        console.log("Error :",error)
        console.log("errorContactCreate :",error.response.data.code)
        if(error.response.data.code=='DOMAIN_TOKEN_MISMATCH'){
            return res.send({ errorCode: 'NotAuthorized',msg: " :Contact to the admin" })
        }
        else if(error.response.data.data[0].code=="DUPLICATE_DATA"){
            console.log(true)
            return res.send({ errorCode: 'NotAuthorized',msg: " :Email Id is already exist" })
        }
        else{
            console.log(false)
            return res.status(error.response ? error.response.status : 500).send(error.message);
        }
    }

}

// async function createAgent(req, res,datainfo) {
//     const token = await getToken();
//     const access_token = token.access_token;
//     console.log("token" + token.access_token);
//     const request_Body = {
//         "data": [
//             {
//                 "Vendor_Name":datainfo.fullName,
//                 "First_Name": datainfo.fullName.split(" ").length < 2 ? datainfo.fullName : datainfo.fullName.substring(0,datainfo.fullName.lastIndexOf(" ")),
//                 "Last_Name": datainfo.fullName.split(" ").length < 2 ? "" : datainfo.fullName.split(" ").pop(),
//                 "Email": datainfo.username,
//                 "Phone": datainfo.phone,
//                 "ISD_Code":datainfo.countryCode
//             }
//         ]
//     };
//     // let config = {
//     //     method: 'POST',
//     //     url: 'https://api.sandbox.edbucket.com/crm/api/v1/Vendors',
//     //     headers: { 
//     //         'Authorization': `Zoho-oauthtoken ${token}`,
//     //         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 
//     //         'Content-Type': 'application/json'
//     //     },
//     //    data: request_Body
//     //     };
 
//     const apiUrl = 'https://api.sandbox.edbucket.com/crm/api/v1/Vendors';
//     const _headers = {
//         'Authorization': `Zoho-oauthtoken ${token.access_token}`,
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//         'Content-Type': 'application/json'
//     };
   
//     try {
//         const response = await axios.post(apiUrl, request_Body, { headers: _headers })
//         // const response = await axios.request(config)
//         // const response = await axios({
//         //     method: "POST",
//         //     url: "https://api.sandbox.edbucket.com/crm/api/v1/Vendors",
//         //     headers: _headers,
//         //     data: request_Body
//         //   });
//         return response.data;
//     } catch (error) {
//         console.log("Error :",error)
//         console.log("errorContactCreate :",error.response.data.code)
//         if(error.response.data.code=='DOMAIN_TOKEN_MISMATCH'){
//             return res.send({ errorCode: 'NotAuthorized',msg: " :Contact to the admin" })
//         }
//         else if(error.response.data.data[0].code=="DUPLICATE_DATA"){
//             console.log(true)
//             return res.send({ errorCode: 'NotAuthorized',msg: " :Email Id is already exist" })
//         }
//         else{
//             console.log(false)
//             return res.status(error.response ? error.response.status : 500).send(error.message);
//         }
//     }
// }

async function createAgent(req, res, datainfo) {
    const token = await getToken();
    const access_token = token.access_token;
    console.log("token" + token.access_token);

    const request_Body = {
        "data": [
            {
                "Vendor_Name": datainfo.fullName,
                "First_Name": datainfo.fullName.split(" ").length < 2 ? datainfo.fullName : datainfo.fullName.substring(0, datainfo.fullName.lastIndexOf(" ")),
                "Last_Name": datainfo.fullName.split(" ").length < 2 ? "" : datainfo.fullName.split(" ").pop(),
                "Email": datainfo.username,
                "Phone": datainfo.phone,
                "ISD_Code": datainfo.countryCode
            }
        ]
    };

    const apiUrl = 'https://api.sandbox.edbucket.com/crm/api/v1/Vendors';
    const _headers = {
        'Authorization': `Zoho-oauthtoken ${token.access_token}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post(apiUrl, request_Body, { headers: _headers });
        return response.data; // This return is only for further handling in the caller, not for the response itself.
    } catch (error) {
        console.log("Error:", error);
        console.log("errorContactCreate:", error.response ? error.response.data.code : 'Unknown');

        if (error.response) {
            if (error.response.data.code === 'DOMAIN_TOKEN_MISMATCH') {
                if (!res.headersSent) {
                    return res.send({ errorCode: 'NotAuthorized', msg: " :Contact to the admin" });
                }
            } else if (error.response.data.data[0].code === "DUPLICATE_DATA") {
                if (!res.headersSent) {
                    console.log(true);
                    return res.send({ errorCode: 'NotAuthorized', msg: " :Email Id is already exist" });
                }
            } else {
                if (!res.headersSent) {
                    console.log(false);
                    return res.status(error.response.status).send(error.message);
                }
            }
        } else {
            // Handle errors without a response object (e.g., network errors)
            if (!res.headersSent) {
                console.log("Unhandled error:", error.message);
                return res.status(500).send(error.message);
            }
        }
    }
}


// create Counsellors
async function createCounsellors(req, res,datainfo) {

    const token = await getToken();
 
    const apiUrl = `${(res.fetchDNSDataResult).baseUrl}/crm/api/v1/Counsellors`;
    const _headers = {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'User-Agent': 'Mozilla/5.0 Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
    };
    const request_Body = {
        "data": [
            {
                "Name":datainfo.fullName,
                "First_Name": datainfo.fullName.split(" ").length < 2 ? datainfo.fullName : datainfo.fullName.substring(0, datainfo.fullName.lastIndexOf(" ")),
                "Last_Name": datainfo.fullName.split(" ").length < 2 ? "" : datainfo.fullName.split(" ").pop(),
                "Email": datainfo.email,
                "Phone": datainfo.phone
            }
        ]
    };
    try {
        const response = await axios.post(apiUrl, request_Body, { headers: _headers })
        return response.data;
    } catch (error) {
        return res.status(error.response ? error.response.status : 500).send(error.message);
    }
}

async function zohoLogin(req, res,cognitoLoginResponse) {
    const token = await getToken();
    console.log("cognitoLoginResponse",cognitoLoginResponse)
    if(cognitoLoginResponse==undefined){
        return { error: "You Have Login Yet" }
    }
    else if(cognitoLoginResponse.profile=="student"){
    const apiUrl = `${(res.fetchDNSDataResult).baseUrl}/crm/api/v1/Contacts/search`;
    const headers = {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'User-Agent': 'Mozilla/5.0 Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
    };
    const params = {
        fields: 'Full_Name,Email,Phone,Owner',
        criteria: `((Email:equals:${cognitoLoginResponse.email}))`
    };
    try {
        const response = await axios.get(apiUrl, { params, headers: headers })
        if(response.data)
        {
        console.log("zohologinData :",response.data.data[0])
        response.data.data[0].accesstoken=cognitoLoginResponse.AuthenticationResult.AccessToken
        response.data.data[0].profile=cognitoLoginResponse.profile
        response.data.data[0].userInfo=cognitoLoginResponse.userInfo
        return response.data
        }
        else
        {
            return {
                error:"No data present here,please contact to the admin"
            }
        }
    } catch (error) {
        return { error: error.message };
    };
}else if(cognitoLoginResponse.profile=="agent"){
    const apiUrl = `${(res.fetchDNSDataResult).baseUrl}/crm/api/v1/Vendors/search`;
    const headers = {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'User-Agent': 'Mozilla/5.0 Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
    };
    const params = {
        fields: 'Vendor_Name,Email,Phone,Owner',
        criteria: `((Email:equals:${cognitoLoginResponse.email}))`
    };
    try {
        const response = await axios.get(apiUrl, { params, headers: headers })
        console.log("zohologin :",response)
        console.log("zohologinData :",response.data.data[0])
        response.data.data[0].accesstoken=cognitoLoginResponse.AuthenticationResult.AccessToken
        response.data.data[0].profile=cognitoLoginResponse.profile
        response.data.data[0].userInfo=cognitoLoginResponse.userInfo
        return response.data
    } catch (error) {
        return { error: error.message };
    };
}
else{
    const apiUrl = `${(res.fetchDNSDataResult).baseUrl}/crm/api/v1/Counsellors/search`;
    const headers = {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'User-Agent': 'Mozilla/5.0 Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
    };
    const params = {
        fields: 'Name,Email,Phone,Owner',
        criteria: `((Email:equals:${cognitoLoginResponse.email}))`
    };
    try {
        const response = await axios.get(apiUrl, { params, headers: headers })
        console.log("zohologin :",response)
        console.log("zohologinData :",response.data.data[0])
        response.data.data[0].accesstoken=cognitoLoginResponse.AuthenticationResult.AccessToken
        response.data.data[0].profile=cognitoLoginResponse.profile
        response.data.data[0].userInfo=cognitoLoginResponse.userInfo
        return response.data
    } catch (error) {
        return { error: error.message };
    };
}
}

module.exports = { createContact, zohoLogin ,createAgent ,createCounsellors };
