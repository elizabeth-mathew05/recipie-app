Param()

$root = Join-Path $PSScriptRoot '..' | Resolve-Path -Relative
Set-Location $root

$confirm = Read-Host "This will permanently delete 'server\src' and 'client\src'. Type YES to confirm"
if ($confirm -eq 'YES') {
  Remove-Item -Recurse -Force -ErrorAction SilentlyContinue server\src, client\src
  Write-Host "Deleted server\src and client\src"
} else {
  Write-Host "Aborted. No files were removed."
}
