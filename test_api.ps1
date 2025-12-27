# Test login and get token
$loginBody = @{
    email = "admin@healthlink.com"
    password = "admin123"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/v1/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
Write-Host "Login Response:"
$loginResponse | ConvertTo-Json -Depth 10

# Extract token and test doctors endpoint
if ($loginResponse.success -and $loginResponse.data.token) {
    $token = $loginResponse.data.token
    Write-Host "`nToken obtained: $token"
    
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }
    
    try {
        $doctorsResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/v1/admin/doctors" -Method GET -Headers $headers
        Write-Host "`nDoctors API Response:"
        $doctorsResponse | ConvertTo-Json -Depth 10
    } catch {
        Write-Host "`nDoctors API Error:"
        $_.Exception.Message
        $_.Exception.Response.StatusCode.value__
        $_.Exception.Response.StatusDescription
    }
} else {
    Write-Host "Login failed"
}
