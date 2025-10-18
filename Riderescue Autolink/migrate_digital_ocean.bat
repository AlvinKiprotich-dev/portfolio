@echo off
REM RideRescue Digital Ocean Migration Script for Windows
REM This script helps migrate to a new Digital Ocean account

echo 🌊 RideRescue Digital Ocean Migration Helper
echo =============================================

REM Step 1: Instructions for Digital Ocean App Platform
echo.
echo 📋 STEP 1: Create New Digital Ocean App
echo 1. Login to your NEW Digital Ocean account
echo 2. Go to: https://cloud.digitalocean.com/apps
echo 3. Click 'Create App'
echo 4. Connect your GitHub repository: riderescue_api
echo 5. Choose branch: main
echo 6. Configure build settings:
echo    - Build Command: npm run build
echo    - Run Command: npm start
echo    - Port: 5000
echo.

REM Step 2: Environment Variables
echo 🔧 STEP 2: Set Environment Variables in Digital Ocean
echo Add these environment variables in your Digital Ocean app settings:
echo.
echo Required Environment Variables:
echo - MONGODB_URI=your_mongodb_connection_string
echo - JWT_SECRET=your_jwt_secret_key
echo - PORT=5000
echo - NODE_ENV=production
echo - ONESIGNAL_APP_ID=your_onesignal_app_id
echo - ONESIGNAL_REST_API_KEY=your_onesignal_rest_api_key
echo - CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
echo - CLOUDINARY_API_KEY=your_cloudinary_api_key
echo - CLOUDINARY_API_SECRET=your_cloudinary_api_secret
echo.

REM Step 3: Get new URL
echo 🌐 STEP 3: Get Your New App URL
echo After deployment, your new URL will be:
echo https://YOUR_APP_NAME-XXXXX.ondigitalocean.app
echo.
echo Replace 'YOUR_NEW_APP_NAME' in the mobile app files with your actual app name.
echo.

REM Step 4: Update mobile apps
echo 📱 STEP 4: Update Mobile App URLs
echo The following files have been updated with placeholder URLs:
echo ✅ riderescue_services/lib/plugins/constants/network_constant.dart
echo ✅ riderescue_driver/lib/constants/url.dart
echo ✅ riderescue_mechanic/lib/constants/url.dart
echo ✅ riderescue_garage/lib/constants/url.dart
echo.
echo 🔄 Replace 'YOUR_NEW_APP_NAME' with your actual Digital Ocean app name
echo.

REM Step 5: Testing
echo 🧪 STEP 5: Testing
echo 1. Test your API endpoints using tools like Postman
echo 2. Update mobile apps with the correct URL
echo 3. Test mobile app connectivity
echo 4. Build and deploy mobile apps
echo.

REM Step 6: DNS (Optional)
echo 🌍 STEP 6: Custom Domain (Optional)
echo If you want a custom domain:
echo 1. In Digital Ocean App Platform, go to Settings ^> Domains
echo 2. Add your custom domain
echo 3. Update DNS records as instructed
echo 4. Update mobile app URLs to use custom domain
echo.

echo ✨ Migration Complete!
echo Remember to:
echo - Test all API endpoints
echo - Update mobile app store listings if needed
echo - Monitor logs for any issues
echo - Update any documentation with new URLs

pause