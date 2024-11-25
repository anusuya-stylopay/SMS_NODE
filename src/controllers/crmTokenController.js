const { default: axios } = require("axios");
const { updateToken } = require("../utils/config");
var token;
console.log("token :",token)
console.log("tokenType :",typeof token)
async function getToken(tokenAPIUrl) {
    // const api_Url = "https://sandboxapi.edbucket.com/oauth/get_token?provider=zoho&environment=sandbox";
    // const api_Url = "https://yjs461pgig.execute-api.us-west-2.amazonaws.com/sandbox/oauth/get_token?provider=zoho&environment=production"
    console.log("tokenAPIUrl",tokenAPIUrl)
    const api_Url = tokenAPIUrl
    const headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
    try {
        const response = await axios.get(api_Url,{headers});
        console.log(response.data);
        token=response.data["access_token"];
        updateToken(response.data["access_token"]);
        return response.data["access_token"];
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
}

const verifyToken=async(req,res)=>{
    console.log("reach here")
    // console.log("value :",token,"===","undefined")
    // console.log("value :",typeof token === undefined)
    if(!token){
        console.log(1)
        const tokenAPIUrl=(res.fetchDNSDataResult).TokenBaseUrl
        const token=await getToken(tokenAPIUrl)
        console.log("crmtoken :",token)
        return res.status(200).send(token)
    }
    else{
        console.log(2)
        console.log(`${2} : tokenAPIUrl : ${token}`)
        const apiUrl = `${(res.fetchDNSDataResult).baseUrl}/University`;
        console.log("apiUrl :-",apiUrl)
        const headers = {
            'Authorization': `Zoho-oauthtoken ${token}`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        };
        console.log({Authorization:headers.Authorization})
        const params = {
            fields: 'Name,Owner,creatorID,Country,Modified_Time,Requirement,University_Description,Website_Link,Assigned_Counsellor,Course_List'
        };
        try {
            console.log(3)
            const response = await axios.get(apiUrl, { params: params, headers: headers })
            console.log("universityResponse :-",response.data)
            console.log("true Cognito API")
            console.log(response.data)
            return res.send(token);
        } catch (error) {
            console.log(4)
            if(error.response.status===403){
                console.log(5)
                const tokenAPIUrl=(res.fetchDNSDataResult).TokenBaseUrl
                const token= await getToken(tokenAPIUrl)
                return res.status(200).send(token)
            }
            console.log("False Cognito API")
            return res.status(error.response ? error.response.status : 500).send(error.message);
        }
    }
}

module.exports = { verifyToken }