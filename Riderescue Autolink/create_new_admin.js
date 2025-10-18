const https = require('https');

// Admin user data
const adminData = {
  name: 'Admin User',
  email: 'admin@riderescueautolink.com',
  password: 'Admin123456!'
};

console.log('Creating admin user...');
console.log('Email:', adminData.email);
console.log('Password:', adminData.password);
console.log('Backend URL: https://monkfish-app-lfjqu.ondigitalocean.app');

// Convert data to JSON
const postData = JSON.stringify(adminData);

// Set up the request options
const options = {
  hostname: 'monkfish-app-lfjqu.ondigitalocean.app',
  port: 443,
  path: '/auth/signup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

// Make the request
const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('Response:', JSON.stringify(response, null, 2));
      
      if (response.success) {
        console.log('\n✅ User created successfully!');
        console.log('Next steps:');
        console.log('1. You need to update this user to admin role in your MongoDB database');
        console.log('2. Connect to your MongoDB Atlas cluster');
        console.log('3. Find the user in the "users" collection');
        console.log('4. Update the roles field from ["user"] to ["admin"]');
        console.log('\nThen you can login with:');
        console.log('Email:', adminData.email);
        console.log('Password:', adminData.password);
      } else {
        console.log('\n❌ Failed to create user');
        console.log('Error:', response.message || 'Unknown error');
        
        if (response.message && response.message.includes('already exists')) {
          console.log('\n💡 User already exists! You can try logging in with:');
          console.log('Email:', adminData.email);
          console.log('Password:', adminData.password);
          console.log('\nIf you forgot the password, you may need to reset it or create a user with a different email.');
        }
      }
    } catch (e) {
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
  console.log('\n❌ Network error occurred. Please check:');
  console.log('1. Your internet connection');
  console.log('2. That your backend is running on Digital Ocean');
  console.log('3. The backend URL is correct');
});

// Write data to request body
req.write(postData);
req.end();