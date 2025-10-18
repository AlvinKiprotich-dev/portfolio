const https = require('https');

// Admin user data
const adminData = {
  name: 'Admin User',
  email: 'admin@riderescue.com',
  password: 'admin123456'
};

// API endpoint
const apiUrl = 'https://monkfish-app-lfjqu.ondigitalocean.app/auth/signup';

// Convert data to JSON
const postData = JSON.stringify(adminData);

console.log('Creating admin user...');
console.log('Email:', adminData.email);
console.log('Password:', adminData.password);

// Parse the URL
const url = new URL(apiUrl);

// Set up the request options
const options = {
  hostname: url.hostname,
  port: url.port || 443,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

// Make the request
const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('Response:', JSON.stringify(response, null, 2));
      
      if (response.success) {
        console.log('\n✅ Admin user created successfully!');
        console.log('You can now login to the admin dashboard with:');
        console.log('Email: admin@riderescue.com');
        console.log('Password: admin123456');
      } else {
        console.log('\n❌ Failed to create admin user');
        console.log('Error:', response.message || 'Unknown error');
      }
    } catch (e) {
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

// Write data to request body
req.write(postData);
req.end();