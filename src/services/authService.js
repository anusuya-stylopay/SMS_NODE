const { default: axios } = require("axios");
const { base_url, token, updateToken } = require("../utils/config");

async function getToken() {
    console.log("reach here ")
    let config = {
        method: 'get',
        url: 'https://api.sandbox.edbucket.com/crm/api/v1/oauth/get_token?provider=zoho&environment=sandbox',
        headers: { 
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 
            'Content-Type': 'application/json'
        }
        };
    // const apiUrl ="https://api.sandbox.edbucket.com/crm/api/v1/oauth/get_token?provider=zoho&environment=sandbox"

    try {
        // const response = await axios.get(apiUrl)
        const response=await axios.request(config)
        console.log("crmtoken",response.data)
        // updateToken(response.data["access_token"]);
        return response.data
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }

}

module.exports = { getToken }