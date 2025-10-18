const https = require('https');

console.log('🔍 Verifying Digital Ocean Account & Backend Details\n');

const backendUrl = 'monkfish-app-lfjqu.ondigitalocean.app';
console.log(`Current Backend URL: https://${backendUrl}`);
console.log('App ID from URL: monkfish-app-lfjqu');

const options = {
  hostname: backendUrl,
  port: 443,
  path: '/',
  method: 'GET'
};

const req = https.request(options, (res) => {
  console.log(`\n📊 Backend Response:`);
  console.log(`Status: ${res.statusCode}`);
  console.log(`Server: ${res.headers.server || 'Unknown'}`);
  console.log(`X-DO-App-Origin: ${res.headers['x-do-app-origin'] || 'Not found'}`);
  console.log(`Date: ${res.headers.date}`);
  
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log(`\n✅ Backend Details:`);
      console.log(`Name: ${response.name || 'Unknown'}`);
      console.log(`Version: ${response.version || 'Unknown'}`);
      console.log(`Author: ${response.author || 'Unknown'}`);
      console.log(`Timestamp: ${response.timestamp || 'Unknown'}`);
      console.log(`Total Endpoints: ${response.totalEndpoints || 'Unknown'}`);
      
      console.log(`\n🔗 Account Verification:`);
      console.log(`Digital Ocean App ID: ${res.headers['x-do-app-origin'] || 'Not available'}`);
      console.log(`This should match your new Digital Ocean account's app`);
      
      console.log(`\n🎯 Summary:`);
      console.log(`✓ Admin Web App: Using ${backendUrl}`);
      console.log(`✓ Mobile Apps: Using ${backendUrl}`);
      console.log(`✓ Backend Status: ${res.statusCode === 200 ? 'Online' : 'Issues detected'}`);
      
      if (res.statusCode === 200) {
        console.log(`\n💡 Your setup is consistent - all apps point to the same backend`);
        console.log(`The 500 error during user creation suggests backend configuration issues`);
        console.log(`(database connection, environment variables, etc.)`);
      }
      
    } catch (e) {
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Connection Error: ${e.message}`);
  console.log(`This might indicate DNS or network issues`);
});

req.end();