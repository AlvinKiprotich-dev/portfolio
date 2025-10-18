const https = require('https');

console.log('Checking backend health...');

const options = {
  hostname: 'monkfish-app-lfjqu.ondigitalocean.app',
  port: 443,
  path: '/',
  method: 'GET',
  timeout: 5000
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Response:', data);
    
    if (res.statusCode === 200) {
      console.log('\n✅ Backend is responding');
      console.log('The 500 error during user creation suggests:');
      console.log('1. Database connection issues');
      console.log('2. Missing environment variables');
      console.log('3. MongoDB authentication problems');
    } else {
      console.log('\n❌ Backend health check failed');
    }
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.on('timeout', () => {
  console.log('Request timed out');
  req.destroy();
});

req.end();