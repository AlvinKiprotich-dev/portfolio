# PowerShell script to update Digital Ocean URLs in RideRescue mobile apps
# Usage: .\update_urls.ps1 -NewAppName "your-new-app-name"

param(
    [Parameter(Mandatory=$true)]
    [string]$NewAppName
)

Write-Host "🔄 Updating RideRescue Mobile App URLs" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

$NewUrl = "https://$NewAppName.ondigitalocean.app"
$PlaceholderUrl = "https://YOUR_NEW_APP_NAME.ondigitalocean.app"

Write-Host "New URL: $NewUrl" -ForegroundColor Green

# Define files to update
$FilesToUpdate = @(
    "riderescue_services\lib\plugins\constants\network_constant.dart",
    "riderescue_driver\lib\constants\url.dart",
    "riderescue_mechanic\lib\constants\url.dart",
    "riderescue_garage\lib\constants\url.dart"
)

# Update each file
foreach ($File in $FilesToUpdate) {
    $FullPath = Join-Path $PSScriptRoot $File
    
    if (Test-Path $FullPath) {
        Write-Host "📝 Updating: $File" -ForegroundColor Yellow
        
        # Read file content
        $Content = Get-Content $FullPath -Raw
        
        # Replace placeholder URL with new URL
        $UpdatedContent = $Content -replace [regex]::Escape($PlaceholderUrl), $NewUrl
        
        # Write updated content back to file
        Set-Content $FullPath $UpdatedContent -NoNewline
        
        Write-Host "   ✅ Updated successfully" -ForegroundColor Green
    } else {
        Write-Host "   ❌ File not found: $FullPath" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 URL Update Complete!" -ForegroundColor Green
Write-Host "All mobile apps now point to: $NewUrl" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Test the API endpoints" -ForegroundColor White
Write-Host "2. Build and test mobile apps" -ForegroundColor White
Write-Host "3. Deploy to app stores if needed" -ForegroundColor White