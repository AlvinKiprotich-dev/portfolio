const https = require('https');

async function testEndpoint(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null;
    
    const options = {
      hostname: 'monkfish-app-lfjqu.ondigitalocean.app',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(postData && { 'Content-Length': Buffer.byteLength(postData) })
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function diagnoseAuth() {
  console.log('🔍 Diagnosing authentication endpoints...\n');

  // Test 1: Check if auth endpoint exists
  try {
    console.log('1. Testing auth endpoint accessibility...');
    const authTest = await testEndpoint('/auth');
    console.log(`   Status: ${authTest.status}`);
    console.log(`   Response:`, authTest.data);
  } catch (e) {
    console.log(`   Error: ${e.message}`);
  }

  // Test 2: Try a simple signup with minimal data
  try {
    console.log('\n2. Testing signup with minimal data...');
    const minimalUser = {
      email: 'test@example.com',
      password: 'password123'
    };
    const signupTest = await testEndpoint('/auth/signup', 'POST', minimalUser);
    console.log(`   Status: ${signupTest.status}`);
    console.log(`   Response:`, signupTest.data);
  } catch (e) {
    console.log(`   Error: ${e.message}`);
  }

  // Test 3: Try with our admin user data
  try {
    console.log('\n3. Testing signup with admin user data...');
    const adminUser = {
      name: 'Admin User',
      email: 'admin@riderescueautolink.com',
      password: 'Admin123456!'
    };
    const adminTest = await testEndpoint('/auth/signup', 'POST', adminUser);
    console.log(`   Status: ${adminTest.status}`);
    console.log(`   Response:`, adminTest.data);
    
    if (adminTest.data.success) {
      console.log('\n✅ SUCCESS! User created successfully!');
      console.log('\n🔧 Next step: Update user role to admin in MongoDB');
      console.log('Database steps:');
      console.log('1. Open MongoDB Atlas');
      console.log('2. Browse Collections → users');
      console.log('3. Find user: admin@riderescueautolink.com');
      console.log('4. Edit roles: ["user"] → ["admin"]');
      console.log('5. Save changes');
      console.log('\nLogin credentials:');
      console.log('Email: admin@riderescueautolink.com');
      console.log('Password: Admin123456!');
    }
  } catch (e) {
    console.log(`   Error: ${e.message}`);
  }

  console.log('\n📊 Diagnosis complete!');
}

diagnoseAuth();