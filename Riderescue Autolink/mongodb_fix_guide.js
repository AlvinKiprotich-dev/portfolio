// MongoDB Connection Troubleshooting Guide
// Use this checklist to fix your Digital Ocean backend

console.log("🔧 MongoDB Connection Fix Checklist\n");

console.log("1. Digital Ocean Environment Variables:");
console.log("   Go to: Digital Ocean Dashboard → Your App → Settings → Environment Variables");
console.log("   Required variables:");
console.log("   ✓ MONGODB_URI (or DATABASE_URL)");
console.log("   ✓ NODE_ENV=production");
console.log("   ✓ JWT_SECRET");
console.log("   ✓ Any other env vars from your .env file\n");

console.log("2. MongoDB Atlas Settings:");
console.log("   ✓ Database cluster is running");
console.log("   ✓ Network access allows Digital Ocean IPs (0.0.0.0/0 for all)");
console.log("   ✓ Database user has read/write permissions");
console.log("   ✓ Connection string is correct\n");

console.log("3. Connection String Format:");
console.log("   mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority");
console.log("   Make sure:");
console.log("   ✓ Username and password are correct");
console.log("   ✓ Database name exists");
console.log("   ✓ No special characters need URL encoding\n");

console.log("4. After fixing environment variables:");
console.log("   ✓ Redeploy your app in Digital Ocean");
console.log("   ✓ Wait for deployment to complete");
console.log("   ✓ Test user creation again\n");

console.log("5. Test MongoDB connection:");
console.log("   Run the test script below to verify connection\n");

// Simple MongoDB connection test
const testConnection = `
const mongoose = require('mongoose');

// Replace with your actual MongoDB URI
const MONGODB_URI = 'your-mongodb-connection-string';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.log('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  });
`;

console.log("MongoDB Test Script:");
console.log(testConnection);