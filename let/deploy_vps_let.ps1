
# Deployment script for let.gowork.run (Refined)
# Usage: .\deploy_vps_let.ps1

$ErrorActionPreference = "Stop"
$ServerIP = "72.62.66.151"
$User = "root"
$SiteName = "let.gowork.run"
$RepoUrl = "https://github.com/colinjen88/letGoWorkRun.git"
$RemotePath = "/var/www/html/worki"
$NginxConfigFile = "nginx_let.conf"
$RemoteNginxPath = "/etc/nginx/sites-available/$SiteName"
$Email = "flashjen@gmail.com"

# Nginx Configuration Content
# Note: Root points to the let subdirectory inside the repository
$NginxConfigContent = @"
server {
    listen 80;
    server_name $SiteName;

    # Important: Set root to the specific project directory inside the repo
    root $RemotePath/let;
    index index.html;

    location / {
        # Check files, directories, then fallback to 404
        try_files `$uri `$uri/ =404;
    }
}
"@

# Helper function to execute remote commands
function Invoke-RemoteCommand {
    param([string]$Command)
    Write-Host "Element: Executing on $ServerIP > $Command" -ForegroundColor Cyan
    ssh -o StrictHostKeyChecking=no ${User}@${ServerIP} $Command
    if ($LASTEXITCODE -ne 0) {
        throw "Remote command failed with exit code $LASTEXITCODE"
    }
}

try {
    Write-Host "Starting deployment for $SiteName..." -ForegroundColor Green

    # 1. Create Nginx config file locally
    Write-Host "Creating local Nginx config..."
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText((Join-Path $PWD $NginxConfigFile), $NginxConfigContent, $utf8NoBom)

    # 2. Check/Install Dependencies (Nginx, Git, Certbot)
    Write-Host "Checking server dependencies..."
    Invoke-RemoteCommand "apt-get update && apt-get install -y nginx git certbot python3-certbot-nginx"

    # 3. Clone or Pull Repository (Correct path structure)
    Write-Host "Updating repository..."
    # Always pull latest changes
    Invoke-RemoteCommand "git config --global --add safe.directory $RemotePath && if [ -d $RemotePath ]; then cd $RemotePath && git pull origin master; else git clone $RepoUrl $RemotePath; fi"

    # 4. Upload Nginx Config
    Write-Host "Uploading Nginx configuration..."
    scp -o StrictHostKeyChecking=no $NginxConfigFile "${User}@${ServerIP}:${RemoteNginxPath}"

    # 5. Permission Fixing (Crucial Step)
    Write-Host "Fixing permissions..."
    # Ensure Nginx can read files
    Invoke-RemoteCommand "chown -R www-data:www-data $RemotePath && chmod -R 755 $RemotePath"

    # 6. Enable Site & Restart Nginx
    Write-Host "Enabling site and restarting Nginx..."
    Invoke-RemoteCommand "ln -sf $RemoteNginxPath /etc/nginx/sites-enabled/ && rm -f /etc/nginx/sites-enabled/default && nginx -t && systemctl restart nginx"

    # 7. SSL Certificate (Certbot)
    Write-Host "Setting up SSL with Certbot..."
    # Check if certificate exists to prevent rate limiting
    Invoke-RemoteCommand "if [ ! -d /etc/letsencrypt/live/$SiteName ]; then certbot --nginx -d $SiteName --non-interactive --agree-tos -m $Email; else echo 'SSL Certificate already exists.'; fi"

    Write-Host "Deployment Successfully Completed!" -ForegroundColor Green
    Write-Host "Website is live at: https://$SiteName" -ForegroundColor Green
}
catch {
    Write-Error "Deployment Failed: $_"
    exit 1
}
