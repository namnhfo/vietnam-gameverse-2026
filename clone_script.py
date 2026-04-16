import os
import re
import urllib.request
import urllib.parse

# Setup output directories
base_dir = '/Users/namcuba/Desktop/1. VnExpress/2026/Vietnam GameVerse/Antigravity'
assets_dir = os.path.join(base_dir, 'assets')
css_dir = os.path.join(assets_dir, 'css')
js_dir = os.path.join(assets_dir, 'js')
img_dir = os.path.join(assets_dir, 'images')

for d in [css_dir, js_dir, img_dir]:
    os.makedirs(d, exist_ok=True)

# File names
html_path = os.path.join(base_dir, 'index.html')

def download_file(url, target_dir, ext):
    if not url.startswith('http'):
        if url.startswith('//'):
            url = 'https:' + url
        else:
            return url  # Already relative or unsupported format
            
    try:
        # Generate filename
        parsed_url = urllib.parse.urlparse(url)
        path = parsed_url.path
        filename = os.path.basename(path)
        
        # Ensure it has an extension, and deal with query parameters
        if "?" in filename:
            filename = filename.split("?")[0]
            
        if not filename:
            filename = f"downloaded_file.{ext}"
            
        # Append extension if not present maybe
        if ext not in filename:
            filename = f"{filename}.{ext}"
            
        # Fix invalid characters in file names
        filename = re.sub(r'[^a-zA-Z0-9_\-\.]', '_', filename)

        # Full local path
        local_path = os.path.join(target_dir, filename)
        
        # Avoid re-downloading
        if not os.path.exists(local_path):
            print(f"Downloading: {url} to {filename}")
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                content = response.read()
            with open(local_path, 'wb') as f:
                f.write(content)
                
        # Return new relative URL
        rel_dir = os.path.basename(target_dir)
        return f"assets/{rel_dir}/{filename}"
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return url

def process_html():
    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # 1. Process CSS <link href="...">
    def replace_css(match):
        full_tag = match.group(0)
        url = match.group(2)
        if url and ('stylesheet' in full_tag or 'woff2' in url or '.css' in url):
            new_url = download_file(url, css_dir, 'css')
            return full_tag.replace(f'"{url}"', f'"{new_url}"').replace(f"'{url}'", f"'{new_url}'")
        return full_tag
        
    html_content = re.sub(r'(<link[^>]*href=[\'"]([^\'"]+)[\'"][^>]*>)', replace_css, html_content)
    
    # 2. Process JS <script src="...">
    def replace_js(match):
        full_tag = match.group(0)
        url = match.group(2)
        if url:
            new_url = download_file(url, js_dir, 'js')
            return full_tag.replace(f'"{url}"', f'"{new_url}"').replace(f"'{url}'", f"'{new_url}'")
        return full_tag
        
    html_content = re.sub(r'(<script[^>]*src=[\'"]([^\'"]+)[\'"][^>]*>)', replace_js, html_content)
    
    # 3. Process Images <img src="...">
    def replace_img(match):
        full_tag = match.group(0)
        url = match.group(2)
        if url:
            new_url = download_file(url, img_dir, 'png')
            return full_tag.replace(f'"{url}"', f'"{new_url}"').replace(f"'{url}'", f"'{new_url}'")
        return full_tag
        
    html_content = re.sub(r'(<img[^>]*src=[\'"]([^\'"]+)[\'"][^>]*>)', replace_img, html_content)

    # Output to index-local.html
    out_path = os.path.join(base_dir, 'index-local.html')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"Processed HTML saved to {out_path}")

process_html()
