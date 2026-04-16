import re

html_path = '/Users/namcuba/Desktop/1. VnExpress/2026/Vietnam GameVerse/Antigravity/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Remove Google Tag Manager
html = re.sub(r'<!-- Google Tag Manager -->.*?<!-- End Google Tag Manager -->', '', html, flags=re.DOTALL)
html = re.sub(r'<!-- Google Tag Manager \(noscript\) -->.*?<!-- End Google Tag Manager \(noscript\) -->', '', html, flags=re.DOTALL)

# Remove dfp ads and securepubads
html = re.sub(r'<script async=\'async\' type=\'text/javascript\' src=\'assets/js/gpt.js\'></script>', '', html)
html = re.sub(r'<script async=\'async\' type=\'text/javascript\' src=\'assets/js/dfpbrand.js\'></script>', '', html)
html = re.sub(r'<script async=\'async\' type=\'text/javascript\' src=\'assets/js/prebid.js\'></script>', '', html)
html = re.sub(r'<script async=\'async\' type=\'text/javascript\' src=\'assets/js/do_pc[^\']*\'></script>', '', html)
html = re.sub(r'<script async src="assets/js/eclick.js"></script>', '', html)

# Remove ad blocks
html = re.sub(r'<div id="sis_breakpage1">.*?</div>', '', html, flags=re.DOTALL)
html = re.sub(r'<div id="sis_breakpage2">.*?</div>', '', html, flags=re.DOTALL)
html = re.sub(r'<div id="sis_bgu">.*?</div>', '', html, flags=re.DOTALL)
html = re.sub(r'<div id=\'sis_bottombanner\'.*?</div>', '', html, flags=re.DOTALL)

# Remove login block
html = re.sub(r'<!-- Myvne PC -->.*?<!-- Myvne PC -->', '<!-- Login Button Removed for Clone -->', html, flags=re.DOTALL)
html = re.sub(r'<div class="myvne_taskbar_pc btn-login"></div>', '', html, flags=re.DOTALL)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Cleaned!")
