# Ejecuta Lighthouse (móvil y escritorio) contra un servidor local ya arrancado.
# Uso:  npm run build; npx astro preview --port 4330   (en otra terminal)
#       ./scripts/lighthouse.ps1 -Base http://localhost:4330
param([string]$Base = 'http://localhost:4330', [string]$Out = "$env:TEMP\lighthouse-portfolio")

$browsers = @(
  'C:\Program Files\Google\Chrome\Application\chrome.exe',
  'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
  'C:\Program Files\Microsoft\Edge\Application\msedge.exe'
)
$env:CHROME_PATH = $browsers | Where-Object { Test-Path $_ } | Select-Object -First 1
New-Item -ItemType Directory -Force $Out | Out-Null

$results = foreach ($path in '/', '/en/') {
  foreach ($form in 'mobile', 'desktop') {
    $name = ($path.Trim('/') -replace '/', '-'); if (-not $name) { $name = 'es' }
    $file = Join-Path $Out "$name-$form.json"
    $preset = if ($form -eq 'desktop') { '--preset=desktop' } else { '--form-factor=mobile' }
    npx -y lighthouse@12 "$Base$path" $preset --quiet --output=json "--output-path=$file" `
      --only-categories=performance,accessibility,best-practices,seo `
      '--chrome-flags=--headless=new --no-first-run' | Out-Null
    $j = Get-Content $file -Raw | ConvertFrom-Json
    [pscustomobject]@{
      Pagina = $path; Dispositivo = $form
      Performance = [int]($j.categories.performance.score * 100)
      Accesibilidad = [int]($j.categories.accessibility.score * 100)
      BuenasPracticas = [int]($j.categories.'best-practices'.score * 100)
      SEO = [int]($j.categories.seo.score * 100)
      LCP = $j.audits.'largest-contentful-paint'.displayValue
      CLS = $j.audits.'cumulative-layout-shift'.displayValue
      TBT = $j.audits.'total-blocking-time'.displayValue
    }
  }
}
$results | Format-Table -AutoSize
Write-Output "Informes JSON en $Out"
