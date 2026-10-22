
$ErrorActionPreference = "Stop"
$ServerIP = "145.79.28.71"
$User = "root"
$SiteName = "let.gowork.run"
$RepoUrl = "https://github.com/colinjen88/letGoWorkRun.git"
$RemotePath = "/var/www/html/let"
$NginxConfig = "nginx_let.conf"
$RemoteNginxPath = "/etc/nginx/sites-available/$SiteName"
$Email = "flashjen@gmail.com"

# Update function to handle remote execution properly
function Exec-Remote {
    param([string]$Cmd)
    Write-Host "Running: $Cmd"
    ssh -o StrictHostKeyChecking=no ${User}@${ServerIP} $Cmd
}

try {
    Write-Host "--- Start Deployment to $SiteName ($ServerIP) ---"

    # check if nginx is installed, if not install it
    Exec-Remote "dpkg -s nginx > /dev/null 2>&1 || (apt-get update && apt-get install -y nginx git certbot python3-certbot-nginx)"

    # Clone or Pull
    Exec-Remote "if [ -d $RemotePath ]; then cd $RemotePath && git pull; else git clone $RepoUrl $RemotePath; fi"

    # Copy Nginx Config
    Write-Host "Copying Nginx config..."
    scp -o StrictHostKeyChecking=no $NginxConfig "${User}@${ServerIP}:${RemoteNginxPath}"

    # Verify Config Exists and Enable
    Exec-Remote "ln -sf $RemoteNginxPath /etc/nginx/sites-enabled/ && rm -f /etc/nginx/sites-enabled/default && nginx -t && systemctl reload nginx"

    # Certbot (if not already present)
    Exec-Remote "test -d /etc/letsencrypt/live/$SiteName || certbot --nginx -d $SiteName --non-interactive --agree-tos -m $Email"

    Write-Host "--- Deployment Complete ---"
}
catch {
    Write-Error $_
    exit 1
}
