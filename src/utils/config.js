const axios = require('axios')
const env = "sandbox";
const loginReq = true;
let token = null;
let result = ""

const updateToken = (newToken) => {
    token = newToken
}

module.exports = {
    updateToken,
}
