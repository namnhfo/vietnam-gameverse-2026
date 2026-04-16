#!/usr/bin/env python3
"""
BẢN TIN CÔNG NGHỆ - SẢN PHẨM HÀNG NGÀY
Dành cho: Product Designer @ VnExpress
"""
import os, json, requests, feedparser
from datetime import datetime, timedelta
from pathlib import Path

CONFIG_FILE = Path("/sessions/sleepy-confident-hypatia/mnt/outputs/Claude/Scheduled/news_config.json")

def load_config():
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID")
    if not (token and chat_id) and CONFIG_FILE.exists():
        with open(CONFIG_FILE) as f:
            cfg = json.load(f)
            token = token or cfg.get("TELEGRAM_BOT_TOKEN", "")
            chat_id = chat_id or cfg.get("TELEGRAM_CHAT_ID", "")
    if not token or not chat_id or "ĐIỀN" in str(token):
        raise ValueError("Chưa có Telegram credentials. Vui lòng điền vào: " + str(CONFIG_FILE))
    return token, chat_id

RSS_SOURCES = {
    "🤖 AI & Tech News": [
        ("TechCrunch AI",        "https://techcrunch.com/category/artificial-intelligence/feed/"),
        ("The Verge – AI",       "https://www.theverge.com/rss/ai/index.xml"),
        ("Wired – AI",           "https://www.wired.com/feed/category/ai/latest/rss"),
        ("Synced Review",        "https://www.syncedreview.com/feed/"),
        ("Towards Data Science", "https://towardsdatascience.com/feed"),
    ],
    "📰 Media & Journalism Tech": [
        ("Nieman Lab",             "https://www.niemanlab.org/feed/"),
        ("Journalism.co.uk",       "https://www.journalism.co.uk/news-feed.xml"),
        ("What's New in Publishing","https://www.whatsnewinpublishing.com/feed/"),
        ("Reuters Institute",      "https://www.reutersinstitute.politics.ox.ac.uk/latest-research/rss.xml"),
    ],
    "🎨 UX/UI & Product Design": [
        ("Nielsen Norman Group", "https://www.nngroup.com/feed/"),
        ("Smashing Magazine",    "https://www.smashingmagazine.com/feed/"),
        ("UX Collective",        "https://uxdesign.cc/feed"),
        ("A List Apart",         "https://alistapart.com/main/feed/"),
    ],
    "🔭 Competitor Watch — Báo lớn làm gì với Tech?": [
        ("New York Times – Tech", "https://www.nytimes.com/svc/collections/v1/publish/www.nytimes.com/section/technology/rss.xml"),
        ("The Guardian – Tech",   "https://www.theguardian.com/technology/rss"),
        ("BBC – Tech",            "https://feeds.bbci.co.uk/news/technology/rss.xml"),
    ],
}

def fetch_rss(url, limit=1):
    try:
        feed = feedparser.parse(url)
        items = []
        for entry in feed.entries[:limit]:
            title = entry.get("title","").strip()
            link = entry.get("link","").strip()
            if title and link:
                items.append({"title": title[:100], "link": link})
        return items
    except:
        return []

def fetch_hacker_news(limit=4):
    try:
        resp = requests.get("https://hacker-news.firebaseio.com/v0/topstories.json", timeout=10)
        ids = resp.json()[:20]
        stories = []
        for sid in ids:
            if len(stories) >= limit: break
            s = requests.get(f"https://hacker-news.firebaseio.com/v0/item/{sid}.json", timeout=5).json()
            if s.get("url") and s.get("score",0) > 50:
                stories.append({"title": s.get("title","")[:100], "link": s.get("url",""), "score": s.get("score",0)})
        return sorted(stories, key=lambda x: x["score"], reverse=True)[:limit]
    except:
        return []

def fetch_github_trending(limit=4):
    try:
        since = (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d")
        queries = ["topic:llm+topic:ai-agent", "topic:product-design+topic:ux", "topic:news+topic:journalism+topic:ai"]
        repos, seen = [], set()
        for q in queries:
            url = f"https://api.github.com/search/repositories?q={q}+created:>{since}&sort=stars&order=desc&per_page=3"
            resp = requests.get(url, headers={"Accept": "application/vnd.github.v3+json"}, timeout=10)
            if resp.status_code == 200:
                for item in resp.json().get("items",[])[:3]:
                    name = item.get("full_name","")
                    if name not in seen:
                        seen.add(name)
                        repos.append({"name": name, "description": (item.get("description") or "")[:80],
                                      "url": item.get("html_url",""), "language": item.get("language") or ""})
            if len(repos) >= limit: break
        return repos[:limit]
    except:
        return []

def build_message():
    now = datetime.now()
    hour = now.hour
    greeting = "Chào buổi sáng ☀️" if 5<=hour<12 else ("Chào buổi chiều 🌤" if hour<18 else "Chào buổi tối 🌙")
    date_vn = now.strftime("%A, %d/%m/%Y").replace("Monday","Thứ Hai").replace("Tuesday","Thứ Ba").replace(
        "Wednesday","Thứ Tư").replace("Thursday","Thứ Năm").replace("Friday","Thứ Sáu").replace(
        "Saturday","Thứ Bảy").replace("Sunday","Chủ Nhật")
    lines = [
        "━━━━━━━━━━━━━━━━━━━━━━━━",
        "🗞 *BẢN TIN CÔNG NGHỆ - SẢN PHẨM*",
        f"{greeting}!",
        f"📅 {date_vn}",
        "━━━━━━━━━━━━━━━━━━━━━━━━", "",
    ]
    for section_name, sources in RSS_SOURCES.items():
        section_items = []
        for src_name, url in sources:
            for item in fetch_rss(url, limit=1):
                section_items.append((src_name, item["title"], item["link"]))
        if section_items:
            lines.append(f"*{section_name}*")
            for _, title, link in section_items[:5]:
                lines.append(f"• [{title}]({link})")
            lines.append("")
    hn = fetch_hacker_news(limit=4)
    if hn:
        lines.append("*🔥 Hacker News — Hot Today*")
        for s in hn:
            lines.append(f"• [{s['title']}]({s['link']}) ⭐ {s['score']}")
        lines.append("")
    gh = fetch_github_trending(limit=4)
    if gh:
        lines.append("*📦 GitHub — Repo Đang Trending*")
        for r in gh:
            lang = f" `{r['language']}`" if r["language"] else ""
            desc = f" — {r['description']}" if r["description"] else ""
            lines.append(f"• [{r['name']}]({r['url']}){lang}{desc}")
        lines.append("")
    lines += [
        "━━━━━━━━━━━━━━━━━━━━━━━━",
        f"🤖 _Tự động tổng hợp lúc {now.strftime('%H:%M')} · Product Designer @ VnExpress_",
        "_Nguồn: TechCrunch · Verge · Wired · Nieman Lab · NNGroup · NYT · BBC_",
    ]
    return "\n".join(lines)

def send_telegram(token, chat_id, message):
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    max_len = 4000
    chunks = []
    if len(message) > max_len:
        parts = message.split("\n\n")
        chunk = ""
        for part in parts:
            if len(chunk)+len(part)+2 < max_len: chunk += part+"\n\n"
            else:
                if chunk: chunks.append(chunk.strip())
                chunk = part+"\n\n"
        if chunk: chunks.append(chunk.strip())
    else:
        chunks = [message]
    for chunk in chunks:
        resp = requests.post(url, json={"chat_id": chat_id, "text": chunk, "parse_mode": "Markdown", "disable_web_page_preview": True}, timeout=15)
        if not resp.json().get("ok"):
            print("Telegram error:", resp.json().get("description"))
            return False
    return True

def main():
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M')}] Bắt đầu lấy bản tin hàng ngày...")
    token, chat_id = load_config()
    print("Đang lấy tin tức từ các nguồn...")
    message = build_message()
    print(f"Đã tổng hợp {len(message)} ký tự")
    ok = send_telegram(token, chat_id, message)
    print("✅ Gửi thành công!" if ok else "❌ Gửi thất bại.")

if __name__ == "__main__":
    main()