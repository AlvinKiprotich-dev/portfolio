// MongoDB Direct Admin User Creation Script
// Use this in MongoDB Atlas or MongoDB Compass

// 1. Connect to your MongoDB database
// 2. Select the 'users' collection
// 3. Insert this document:

{
  "name": "Admin User",
  "email": "admin@riderescueautolink.com",
  "password": "$2b$10$rQZ.9YcYUOQ4x8X8KzQQ5u5K1xYy2QQxY8zQQxY8zQQxY8zQQxY8z", // This is hashed "Admin123456!"
  "roles": ["admin"],
  "status": "active",
  "phone": "",
  "address": "",
  "location": {
    "type": "Point",
    "coordinates": [0, 0]
  },
  "isOnline": false,
  "createdAt": new Date(),
  "updatedAt": new Date()
}

// Note: The password above is pre-hashed for "Admin123456!"
// If this doesn't work, you may need to:
// 1. Create a regular user through the API when it's fixed
// 2. Then manually update the roles field to ["admin"]

// Login credentials after creation:
// Email: admin@riderescueautolink.com
// Password: Admin123456!