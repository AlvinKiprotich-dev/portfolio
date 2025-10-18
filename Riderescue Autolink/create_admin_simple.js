const fetch = require('https').request;

async function createAdminUser() {
  const adminData = {
    name: 'Admin User',
    email: 'admin@riderescueautolink.com',
    password: 'Admin123456!'
  };

  console.log('Creating admin user...');
  console.log('Email:', adminData.email);
  console.log('Password:', adminData.password);

  const postData = JSON.stringify(adminData);
  
  const options = {
    hostname: 'monkfish-app-lfjqu.ondigitalocean.app',
    port: 443,
    path: '/auth/signup',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    },
    timeout: 10000 // 10 second timeout
  };

  return new Promise((resolve, reject) => {
    const req = fetch(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(postData);
    req.end();
  });
}

createAdminUser()
  .then(result => {
    console.log(`Status: ${result.status}`);
    console.log('Response:', result.data);
    
    if (result.data.success) {
      console.log('\n✅ User created successfully!');
      console.log('\n🔧 IMPORTANT: You need to make this user an admin');
      console.log('Steps to complete admin setup:');
      console.log('1. Go to your MongoDB Atlas dashboard');
      console.log('2. Connect to your cluster');
      console.log('3. Browse collections and find the "users" collection');
      console.log('4. Find the user with email: admin@riderescueautolink.com');
      console.log('5. Edit the document and change:');
      console.log('   roles: ["user"] → roles: ["admin"]');
      console.log('6. Save the changes');
      console.log('\nThen you can login to the admin dashboard!');
    } else {
      console.log('\n❌ Failed to create user');
      console.log('Error:', result.data.message || 'Unknown error');
    }
  })
  .catch(err => {
    console.error('Error:', err.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Check if your Digital Ocean backend is running');
    console.log('2. Verify the backend URL is correct');
    console.log('3. Check your internet connection');
  });