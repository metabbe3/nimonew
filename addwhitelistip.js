const axios = require('axios');
const crypto = require('crypto');

const license = 'P859F3CD3B274B197';
const secret = '36F2O14GVsQ0h8uIg7XR9s';
const ts = Math.floor(+new Date() / 1000);

const queries = {
    license: license,
    time:    ts,
    ip : '36.83.197.219'
    // cnt: 1, // Get number of proxies (optional)
};

const md5Sum = crypto.createHash('md5');
md5Sum.update(license + ts + secret);

queries.sign = md5Sum.digest('hex').toLowerCase();

// Step 1 : Obtain proxy IP    
// Important: the ip addresses in the obtained ip:port list belong to TTProxy central server, NOT the proxy node ip which finally communicate with the target server.   

axios.get('https://api.ttproxy.com/v1/whitelist/add', {
    params: queries,
}).then((response) => {
    console.log('Response HTTP Status Code: ', response.status);
    console.log('Response HTTP Response Body: ', response.data);

}).catch((e) => {
    console.error('Error:', e);
});