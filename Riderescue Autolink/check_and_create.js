const https = require('https');

// First, let's check what endpoints are actually available
console.log('🔍 Checking available endpoints from API root...\n');

const options = {
  hostname: 'monkfish-app-lfjqu.ondigitalocean.app',
  port: 443,
  path: '/',
  method: 'GET'
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('Available endpoints:', response.endpoints);
      
      // Now try to create user with the correct endpoint
      if (response.endpoints && response.endpoints.includes('/auth')) {
        console.log('\n✅ /auth endpoint is available');
        console.log('Trying user creation again...\n');
        createUser();
      } else {
        console.log('\n❌ /auth endpoint not found in available endpoints');
        console.log('Available endpoints:', response.endpoints);
      }
    } catch (e) {
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.end();

function createUser() {
  const adminData = {
    name: 'Admin User',
    email: 'admin@riderescueautolink.com',
    password: 'Admin123456!'
  };

  const postData = JSON.stringify(adminData);
  
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

  const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log('Signup Response:', JSON.stringify(response, null, 2));
        
        if (response.success) {
          console.log('\n✅ User created successfully!');
          console.log('\n🔧 CRITICAL: Make this user an admin in MongoDB:');
          console.log('1. Go to MongoDB Atlas dashboard');
          console.log('2. Connect to your cluster');
          console.log('3. Browse collections → users');
          console.log('4. Find: admin@riderescueautolink.com');
          console.log('5. Change roles: ["user"] → ["admin"]');
          console.log('6. Save');
          console.log('\nThen login with:');
          console.log(`Email: ${adminData.email}`);
          console.log(`Password: ${adminData.password}`);
        } else {
          console.log('\n❌ User creation failed');
          console.log('Error:', response.message);
          
          // Check if user already exists
          if (response.message && response.message.toLowerCase().includes('exists')) {
            console.log('\n💡 User might already exist. Try logging in with:');
            console.log(`Email: ${adminData.email}`);
            console.log(`Password: ${adminData.password}`);
            console.log('\nIf that doesn\'t work, the user might need admin role in database.');
          }
        }
      } catch (e) {
        console.log('Raw response:', data);
        console.log('Parse error:', e.message);
      }
    });
  });

  req.on('error', (e) => {
    console.error('Request error:', e.message);
  });

  req.write(postData);
  req.end();
}