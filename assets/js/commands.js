/* ============================================================
   Vietnam GameVerse 2026 — Commands.js
   Manages: Agenda (Google Sheet), Game Arena, FAQ, Venue Map, Fan Meeting
   ============================================================ */

// ── A. GOOGLE SHEET CONFIG ───────────────────────────────────
const SHEET_ID = '1KhI90OdjWs-OPidb01aFFkFzESE2AXPgWV49xxW_1Ao';
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

// ── FALLBACK DATA (khi Sheet không fetch được) ───────────────
const AGENDA_FALLBACK = {
    1: [
        { time: "09:00",          game: "Mở cửa Check-in",               wonderland: "",                        b2b: "",                     all: true },
        { time: "09:00 - 19:00",  game: "Hoạt động tại khu triển lãm Game", wonderland: "Khu Wonderland & ẩm thực mở cửa", b2b: "Không gian kết nối doanh nghiệp", all: false },
        { time: "09:00 - 10:00",  game: "Diễn đàn Game Việt Nam 2026",    wonderland: "Lễ ra mắt Game",                b2b: "",                     all: false },
        { time: "10:00 - 12:00",  game: "",                               wonderland: "Giao lưu khách mời cosplay quốc tế", b2b: "Hội thảo chuyên đề",  all: false },
        { time: "13:30 - 16:00",  game: "VMC Spring 2026 Grand Finals",   wonderland: "SEA Esports Nation Cup",         b2b: "",                     all: false },
        { time: "16:00 - 18:30",  game: "",                               wonderland: "Community Meeting",              b2b: "",                     all: false },
        { time: "19:30 - 21:00",  game: "Lễ vinh danh Giải thưởng Game Việt Nam 2025", wonderland: "", b2b: "",                     all: false },
    ],
    2: [
        { time: "09:00",          game: "Mở cửa Check-in",               wonderland: "",                        b2b: "",                     all: true },
        { time: "09:00 - 19:00",  game: "Hoạt động tại khu triển lãm Game", wonderland: "Khu Wonderland & ẩm thực mở cửa", b2b: "Không gian kết nối doanh nghiệp", all: false },
        { time: "09:00 - 11:00",  game: "SEA Esports Nation Cup",         wonderland: "Game Arena (To Be Announced)",   b2b: "Chung kết GameHub",    all: false },
        { time: "11:00 - 13:00",  game: "",                               wonderland: "Community Meeting",              b2b: "",                     all: false },
        { time: "13:30 - 16:00",  game: "Chung kết Cosplay Contest / Parade", wonderland: "SEA Esports Nation Cup",   b2b: "Tọa đàm kết nối B2B Esports", all: false },
        { time: "16:30 - 19:00",  game: "FC Mobile Invitation Cup 2026",  wonderland: "Community Meeting",              b2b: "",                     all: false },
    ]
};

// ── B. VENUE / BOOTH DATA ────────────────────────────────────
const VENUE_ZONES = [
    {
        id: 1, name: "VNG Games", x: 180, y: 550,
        desc: "Khu vực trải nghiệm các siêu phẩm di động từ nhà phát hành VNG Games: Liên Quân Mobile, Tốc Chiến và nhiều tựa game đặc sắc khác.",
        link: "https://vng.com",
        hasMission: true,
        mission: "Trải nghiệm thử thách mini-game tại booth VNG và chụp ảnh check-in với khung sự kiện đặc biệt.",
        gift: "Keychain Limited Edition GameVerse 2026"
    },
    {
        id: 2, name: "Garena", x: 380, y: 400,
        desc: "Sân chơi sôi động của cộng đồng Liên Quân Mobile, Free Fire và AOV. Tham gia các màn trình diễn kỹ năng cùng Pro Player.",
        link: "https://garena.vn",
        hasMission: true,
        mission: "Hoàn thành 1 ván đấu tại khu vực demo và đạt điểm số tối thiểu quy định.",
        gift: "Sticker Pack & Giftcode Liên Quân Mobile"
    },
    {
        id: 3, name: "VTC Mobile", x: 620, y: 350,
        desc: "Trải nghiệm dàn game mobile mới nhất từ VTC Mobile — nhà phát hành game lâu năm tại Việt Nam.",
        link: "https://vtcmobile.vn",
        hasMission: true,
        mission: "Tham gia thử thách Aim Test tại khu vực Shooter và hoàn thành trong thời gian quy định.",
        gift: "Giftcode VIP & phần quà độc quyền"
    },
    {
        id: 4, name: "Funtap", x: 750, y: 500,
        desc: "Khám phá thế giới MMORPG và nhập vai hấp dẫn từ Funtap — đơn vị tiên phong game chiến thuật tại Việt Nam.",
        link: "https://funtap.vn",
        hasMission: true,
        mission: "Chụp ảnh cùng nhân vật cosplay của Funtap và chia sẻ lên mạng xã hội.",
        gift: "Poster chữ ký & GameVerse Exclusive Sticker"
    },
    {
        id: 5, name: "GOSU", x: 250, y: 250,
        desc: "Vũ trụ game kiếm hiệp kỳ ảo — nơi GOSU mang đến những tựa game đậm chất Á Đông với cộng đồng game thủ sôi nổi.",
        link: "https://gosu.vn",
        hasMission: true,
        mission: "Tham gia Mini Game 'Cửu Âm Chân Kinh' tại booth và vượt qua thử thách trên màn hình.",
        gift: "Badge Exclusive & Giftcode VIP in-game"
    }
];

// ── C. FAN MEETING DATA ──────────────────────────────────────
const FANMEETING_DATA = {
    title: "MEET THE LEGENDS",
    subtitle: "Giao lưu cùng thế hệ vàng Esports Việt",
    description: "Cơ hội có 1-0-2 để tương tác trực tiếp, nhận chữ ký và thi đấu showmatch cùng các Pro Player và Gaming Creator hàng đầu.",
    cta: { text: "MUA VÉ FAN MEETING", link: "https://esportsfan.net/order/checkout?lang=vi" },
    roster: {
        1: [
            { name: "LEVI", role: "JUNGLE", team: "GAM ESPORTS", tag: "MVP", img: "assets/images/fanmeeting_1.jpg", active: true },
            { name: "KIEU ANH HERAA", role: "CREATOR", team: "VGV", tag: "STAR", img: "assets/images/fanmeeting_2.jpg", active: true },
            { name: "SOFM", role: "HEAD COACH", team: "VIKINGS ESPORTS", tag: "LEGEND", img: "assets/images/fanmeeting_1.jpg", active: true },
            { name: "???", role: "CLASSIFIED", team: "TBA", tag: "LOCKED", img: "", active: false }
        ],
        2: [
            { name: "OPTIMUS", role: "MID", team: "TEAM FLASH", tag: "LEGEND", img: "assets/images/fanmeeting_2.jpg", active: true },
            { name: "LAI BẦNG", role: "JUNGLE", team: "SGP", tag: "MVP", img: "assets/images/fanmeeting_1.jpg", active: true },
            { name: "MÈO SAO HOẢ", role: "CREATOR", team: "VGV", tag: "STAR", img: "assets/images/fanmeeting_2.jpg", active: true },
            { name: "???", role: "CLASSIFIED", team: "TBA", tag: "LOCKED", img: "", active: false }
        ]
    }
};

// ── TOURNAMENT DATA ──────────────────────────────────────────
const TOURNAMENT_DATA = [
    { id: 'vmc', name: 'VMC Spring 2026 Grand Finals', category: 'LEAGUE OF LEGENDS', date: '08/05/2026', prize: '500,000,000 đ', image: 'assets/images/tournament_1.jpg' },
    { id: 'sea', name: 'SEA Esports Nation Cup: PUBG Mobile, Teamfight Tactics, Audition, Total Football, Crossfire Legend', category: 'MULTI-GAME', date: '08 - 09/05/2026', prize: '~2,500,000,000 đ', image: 'assets/images/tournament_2.jpg' },
    { id: 'fc',  name: 'FC Mobile Invitation Cup 2026', category: 'FC MOBILE', date: '09/05/2026', prize: '380,000,000 đ', image: 'assets/images/tournament_3.jpg' },
    { id: 'wr',  name: 'Wild Rift Champions SEA 2026', category: 'WILD RIFT', date: '08 - 09/05/2026', prize: '450,000,000 đ', image: 'assets/images/tournament_1.jpg' },
    { id: 'ff',  name: 'Free Fire World Series VN Qualifiers', category: 'FREE FIRE', date: '08/05/2026', prize: '600,000,000 đ', image: 'assets/images/tournament_2.jpg' },
    { id: 'aov', name: 'Arena of Valor International Exhibition', category: 'AOV', date: '09/05/2026', prize: '700,000,000 đ', image: 'assets/images/tournament_3.jpg' }
];

const TOURNAMENT_DETAILS = {
    vmc: { title: "VMC Spring 2026 Grand Finals", game: "League of Legends", prize: "500,000,000 đ", intro: "Giải đấu CLB lớn nhất Việt Nam, quy tụ những tuyển thủ trẻ xuất sắc từ khắp cả nước tranh tài ngôi vô địch quốc gia.", schedule: "13:30 – Khai mạc\n14:00 – Chung kết Bo5\n18:30 – Lễ trao giải", prizes: "🥇 Quán quân: 250,000,000đ\n🥈 Á quân: 100,000,000đ\n🥉 Hạng 3: 50,000,000đ\n⭐ MVP: 50,000,000đ" },
    sea:  { title: "SEA Esports Nation Cup", game: "Đa bộ môn (PUBG, TFT, Audition, FC, Crossfire)", prize: "~2,500,000,000 đ", intro: "Đại hội Esports các quốc gia Đông Nam Á với 10 đội tuyển quốc gia. Đây là sân chơi tầm quốc tế đầu tiên tổ chức tại Việt Nam năm 2026.", schedule: "08/05: Vòng bảng PUBG Mobile & Audition\n09/05: Chung kết tất cả bộ môn\n19:00: Lễ bế mạc & trao giải", prizes: "Phân bổ theo từng bộ môn\n💰 Tổng giải thưởng: ~100,000 USD\nThưởng thêm từ nhà tài trợ mỗi bộ môn" },
    fc:   { title: "FC Mobile Invitation Cup 2026", game: "FC Mobile", prize: "380,000,000 đ", intro: "Giải đấu giao hữu quốc tế với sự tham gia của Pro Player hàng đầu khu vực và các đại sứ thương hiệu EA Sports tại Đông Nam Á.", schedule: "09:00 – Vòng loại trực tiếp\n14:00 – Bán kết\n16:30 – Chung kết\n18:30 – Trao giải", prizes: "🥇 Quán quân: 150,000,000đ\n🥈 Á quân: 80,000,000đ\n🥉 Top 4: 40,000,000đ/đội" }
};

const FAQ_DATA = [
    { q: "VÉ VIETNAM GAMEVERSE 2026 ĐƯỢC BÁN Ở ĐÂU?", a: "Vé Vietnam GameVerse 2026 được bán thông qua trang bán vé chính thức <a href='https://esportsfan.net' target='_blank' style='color:var(--neon-cyan)'>Esportsfan.net</a>." },
    { q: "VÉ ĐƯỢC SỬ DỤNG NHƯ THẾ NÀO KHI CHECK-IN?", a: "Vé được phát hành dưới dạng vé điện tử (QR code). Người tham dự xuất trình mã QR để check-in và nhận vòng tay sự kiện theo ngày tương ứng." },
    { q: "SAU KHI CHECK-IN CÓ THỂ RA VÀO NHIỀU LẦN KHÔNG?", a: "Sau khi check-in, bạn có thể tự do ra vào trong khuôn khổ thời gian diễn ra sự kiện, không bị giới hạn số lượt." },
    { q: "VIETNAM GAMEVERSE 2026 CÓ GIỚI HẠN ĐỘ TUỔI KHÔNG?", a: "Không giới hạn độ tuổi. Tuy nhiên, trẻ em dưới 13 tuổi cần có người giám hộ đi kèm trong suốt thời gian tham gia." },
    { q: "VÉ ĐÃ MUA CÓ THỂ HOÀN TRẢ KHÔNG?", a: "Vé đã mua không được hoàn, hủy hoặc đổi trả. Nếu gặp sự cố thanh toán, liên hệ: Hotline <strong>1900 633 003</strong> (nhánh 3) | Email: <a href='mailto:esports.support@fpt.com' style='color:var(--neon-cyan)'>esports.support@fpt.com</a>" },
    { q: "LÀM THẾ NÀO ĐỂ CẬP NHẬT LỊCH TRÌNH?", a: "Lịch trình mới nhất luôn được cập nhật trên trang chính thức Esportsfan.net và các kênh truyền thông của sự kiện." },
    { q: "CÓ THỂ CHUYỂN VÉ CHO NGƯỜI KHÁC KHÔNG?", a: "Có thể chuyển vé nếu chưa check-in. Tuy nhiên BTC chỉ công nhận lượt quét QR đầu tiên là hợp lệ." },
    { q: "TRẺ EM CÓ ĐƯỢC MIỄN PHÍ VÉ KHÔNG?", a: "Trẻ em dưới 06 tuổi được miễn phí vé khi đi cùng người giám hộ có vé hợp lệ. Trẻ từ 06 tuổi trở lên áp dụng vé như người lớn." },
];

// ═══════════════════════════════════════════════════════════════
// A. AGENDA — Google Sheet Fetch + Render
// ═══════════════════════════════════════════════════════════════

// Simple CSV parser that handles quoted fields
function parseCSV(text) {
    const rows = [];
    const lines = text.split('\n');
    for (const line of lines) {
        if (!line.trim()) continue;
        const cells = [];
        let current = '', inQuote = false;
        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (ch === '"') {
                if (inQuote && line[i+1] === '"') { current += '"'; i++; }
                else inQuote = !inQuote;
            } else if (ch === ',' && !inQuote) {
                cells.push(current.trim()); current = '';
            } else {
                current += ch;
            }
        }
        cells.push(current.trim());
        rows.push(cells);
    }
    return rows;
}

// Extract schedule from parsed CSV rows
function extractScheduleFromCSV(rows) {
    const schedule = { 1: [], 2: [] };
    let currentDay = 0;
    let inSchedule = false;

    for (const row of rows) {
        const col1 = (row[1] || '').replace(/\r/g, '').trim();
        const col2 = (row[2] || '').replace(/\r/g, '').trim();
        const colGame = (row[3] || '').replace(/\r/g, '').trim();
        const colWonderland = (row[6] || '').replace(/\r/g, '').trim();
        const colB2B = (row[8] || '').replace(/\r/g, '').trim();

        // Detect start of schedule section
        if (col1.includes('Lộ trình') || col1.includes('Lịch trình')) { inSchedule = true; continue; }
        // Stop at Game Arena section
        if (col1.includes('Game Arena') || col1.includes('Fan Meeting')) { inSchedule = false; }
        if (!inSchedule) continue;

        // Detect day headers
        if (col1.includes('Ngày 1') || col1.includes('8/5')) { currentDay = 1; }
        else if (col1.includes('Ngày 2') || col1.includes('9/5')) { currentDay = 2; }

        // Time-slot rows: col2 looks like a time (contains ':' or 'h')
        if (currentDay > 0 && col2 && (col2.includes(':') || col2.toLowerCase().includes('h')) && (colGame || colWonderland || colB2B)) {
            schedule[currentDay].push({ time: col2, game: colGame, wonderland: colWonderland, b2b: colB2B, all: !colGame && !colWonderland && !colB2B });
        }

        // All-zone row (check-in etc.)
        if (currentDay > 0 && col2 && (col2.includes(':') || col2.toLowerCase().includes('h')) && colGame && !colWonderland && !colB2B) {
            // Single zone = game-only, already handled above
        }
    }

    // If no data extracted, return null to use fallback
    return (schedule[1].length > 0 || schedule[2].length > 0) ? schedule : null;
}

// Global agenda state
let AGENDA_LIVE = null;
let currentAgendaDay = 1;

async function fetchAgendaFromSheet() {
    const tbody = document.getElementById('agenda-tbody');
    if (!tbody) return;

    // Show loading state
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:30px; color:var(--text-dim);">
        <span style="display:inline-block; animation: spin 1s linear infinite; font-size:20px;">⟳</span>
        &nbsp; Đang tải lịch trình...
    </td></tr>`;

    try {
        const res = await fetch(SHEET_CSV_URL);
        if (!res.ok) throw new Error('Network error');
        const text = await res.text();
        const rows = parseCSV(text);
        const extracted = extractScheduleFromCSV(rows);

        if (extracted) {
            AGENDA_LIVE = extracted;
            console.log('[GV2026] Agenda loaded from Google Sheet ✓');
        } else {
            throw new Error('Could not parse schedule from sheet');
        }
    } catch (err) {
        console.warn('[GV2026] Sheet fetch failed, using fallback data:', err.message);
        AGENDA_LIVE = AGENDA_FALLBACK;
    }

    renderAgenda(currentAgendaDay);
}

function renderAgenda(day) {
    currentAgendaDay = day;
    const tbody = document.getElementById('agenda-tbody');
    if (!tbody) return;

    const data = AGENDA_LIVE || AGENDA_FALLBACK;
    const rows = data[day] || [];

    if (!rows.length) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-dim); padding:20px;">Đang cập nhật lịch trình...</td></tr>`;
        return;
    }

    tbody.innerHTML = rows.map(item => {
        if (item.all || (!item.game && !item.wonderland && !item.b2b)) {
            // Full-width row
            return `<tr class="agenda-row-all">
                <td><span class="agenda-time">${item.time}</span></td>
                <td colspan="3"><span class="agenda-badge badge-all">Tất cả khu vực</span> ${item.game || item.wonderland || item.b2b || 'Toàn bộ khu vực mở cửa'}</td>
            </tr>`;
        }
        return `<tr>
            <td><span class="agenda-time">${item.time}</span></td>
            <td>${item.game ? `<span class="agenda-badge badge-game">Game</span> ${item.game}` : '<span class="agenda-empty">—</span>'}</td>
            <td>${item.wonderland ? `<span class="agenda-badge badge-wonder">Wonderland</span> ${item.wonderland}` : '<span class="agenda-empty">—</span>'}</td>
            <td>${item.b2b ? `<span class="agenda-badge badge-b2b">B2B</span> ${item.b2b}` : '<span class="agenda-empty">—</span>'}</td>
        </tr>`;
    }).join('');
}

// ═══════════════════════════════════════════════════════════════
// B. VENUE MAP — Interactive Booth + Cross-link Wonderland
// ═══════════════════════════════════════════════════════════════

let currentScale = 1;
let isDraggingMap = false;
let startX, startY;
let currentPosX = 0;
let currentPosY = 0;

function zoomMap(delta) {
    const oldScale = currentScale;
    currentScale = Math.min(Math.max(currentScale + delta, 1), 4);
    
    if (currentScale === 1) { 
        currentPosX = 0; 
        currentPosY = 0; 
    } else if (oldScale !== currentScale) {
        // Zoom towards center logic could go here, but simple scale for now
    }
    updateMapTransform();
}

function resetMap() {
    currentScale = 1;
    currentPosX = 0;
    currentPosY = 0;
    updateMapTransform();
    closeBoothPopup();
}

function updateMapTransform() {
    const wrapper = document.getElementById('map-wrapper');
    if (wrapper) {
        wrapper.style.transform = `translate(${currentPosX}px, ${currentPosY}px) scale(${currentScale})`;
    }
}

// Drag/Pan logic
function initMapInteraction() {
    const container = document.querySelector('.venue-map-container');
    if (!container) return;

    const onStart = (e) => {
        if (currentScale <= 1) return;
        isDraggingMap = true;
        container.style.cursor = 'grabbing';
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        startX = clientX - currentPosX;
        startY = clientY - currentPosY;
    };

    const onMove = (e) => {
        if (!isDraggingMap) return;
        e.preventDefault();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        currentPosX = clientX - startX;
        currentPosY = clientY - startY;
        
        // Simple boundary check (optional/adjustable)
        const limit = 500 * currentScale;
        currentPosX = Math.max(Math.min(currentPosX, limit), -limit);
        currentPosY = Math.max(Math.min(currentPosY, limit), -limit);

        updateMapTransform();
    };

    const onEnd = () => {
        isDraggingMap = false;
        container.style.cursor = 'grab';
    };

    container.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    // Mobile touch support
    container.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
}

function showBoothInfo(id) {
    const booth = VENUE_ZONES.find(b => b.id === id);
    const popup = document.getElementById('booth-popup');
    if (!booth || !popup) return;

    // Highlight active marker
    document.querySelectorAll('.booth-marker').forEach(m => m.classList.remove('active'));
    const activeMarker = document.querySelector(`.booth-marker[data-id="${id}"]`);
    if (activeMarker) activeMarker.classList.add('active');

    const missionHTML = booth.hasMission ? `
        <div class="booth-mission-block">
            <div class="mission-title">🌟 NHIỆM VỤ WONDERLAND</div>
            <p class="mission-desc">${booth.mission}</p>
            <div class="mission-gift">🎁 Phần quà: <strong style="color:var(--neon-yellow)">${booth.gift}</strong></div>
            <button class="booth-link-btn" onclick="scrollToWonderland(${id})">
                XEM NHIỆM VỤ CHI TIẾT
            </button>
        </div>` : '';

    popup.innerHTML = `
        <button class="popup-close" onclick="closeBoothPopup()">✕</button>
        <div class="popup-number">${id < 10 ? '0'+id : id}</div>
        <h4 class="popup-name">${booth.name}</h4>
        <p class="popup-desc">${booth.desc}</p>
        ${missionHTML}
        <a href="${booth.link}" target="_blank" class="popup-website">TRANG CHỦ ĐƠN VỊ →</a>
    `;
    popup.classList.add('visible');
}

function closeBoothPopup() {
    const popup = document.getElementById('booth-popup');
    if (popup) popup.classList.remove('visible');
    document.querySelectorAll('.booth-marker').forEach(m => m.classList.remove('active'));
}

// Cross-link: Map → Wonderland section
function scrollToWonderland(boothId) {
    closeBoothPopup();
    const target = document.getElementById('section-wonderland');
    if (target) {
        const headerH = document.getElementById('wrap-main-nav')?.offsetHeight || 80;
        window.scrollTo({ top: target.offsetTop - headerH, behavior: 'smooth' });
        // Highlight the booth card in Wonderland section
        setTimeout(() => highlightWonderlandBooth(boothId), 700);
    }
}

// Cross-link: Wonderland → Map section (highlight marker)
function scrollToMapAndHighlight(boothId) {
    const target = document.getElementById('section-venue-map');
    if (target) {
        const headerH = document.getElementById('wrap-main-nav')?.offsetHeight || 80;
        window.scrollTo({ top: target.offsetTop - headerH, behavior: 'smooth' });
        setTimeout(() => showBoothInfo(boothId), 700);
    }
}

function highlightWonderlandBooth(boothId) {
    const card = document.querySelector(`.wonderland-booth-card[data-id="${boothId}"]`);
    if (card) {
        card.classList.add('highlight-pulse');
        setTimeout(() => card.classList.remove('highlight-pulse'), 2000);
    }
}

// ═══════════════════════════════════════════════════════════════
// C. FAN MEETING — Banner Render
// ═══════════════════════════════════════════════════════════════

function renderFanMeeting() {
    const container = document.getElementById('fanmeeting-container');
    if (!container) return;

    container.innerHTML = `
        <div class="fm-tactical-wrapper">
            <div class="fm-header-panel">
                <div class="fm-title-block">
                    <div class="scan-line"></div>
                    <span class="cyber-tag">SYSTEM ACTIVATED</span>
                    <h2 class="cyber-glitch-title" data-text="${FANMEETING_DATA.title}">${FANMEETING_DATA.title}</h2>
                    <p class="cyber-subtitle">${FANMEETING_DATA.subtitle}</p>
                    <p class="cyber-desc">${FANMEETING_DATA.description}</p>
                    <a href="${FANMEETING_DATA.cta.link}" target="_blank" class="cyber-btn cyber-btn-yellow mt-3">${FANMEETING_DATA.cta.text}</a>
                </div>
                
                <div class="fm-selector">
                    <button class="selector-btn active" data-day="1" onclick="switchRoster(1)">
                        <span class="btn-dec">[01]</span> NGÀY 08.05
                    </button>
                    <button class="selector-btn" data-day="2" onclick="switchRoster(2)">
                        <span class="btn-dec">[02]</span> NGÀY 09.05
                    </button>
                </div>
            </div>

            <div class="fm-roster-grid" id="fm-roster-area">
                <!-- Interpolated via JS -->
            </div>
        </div>
    `;

    switchRoster(1);
}

function switchRoster(day) {
    document.querySelectorAll('.selector-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.selector-btn[data-day="${day}"]`)?.classList.add('active');

    const area = document.getElementById('fm-roster-area');
    if (!area) return;
    
    const roster = FANMEETING_DATA.roster[day] || [];
    
    area.style.opacity = 0;
    
    setTimeout(() => {
        area.innerHTML = roster.map(p => `
            <div class="athlete-card ${!p.active ? 'locked' : ''}">
                <div class="athlete-bg" ${p.active ? `style="background-image: url('${p.img}')"` : ''}></div>
                <div class="athlete-hud">
                    <div class="athlete-tag ${p.tag.toLowerCase()}">${p.tag}</div>
                    <div class="athlete-info">
                        <div class="athlete-role">${p.role} // ${p.team}</div>
                        <div class="athlete-name">${p.name}</div>
                    </div>
                </div>
                ${!p.active ? '<div class="lock-icon"><svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>' : ''}
            </div>
        `).join('');
        area.style.opacity = 1;
    }, 200);
}

// ═══════════════════════════════════════════════════════════════
// GAME ARENA — Swiper + Render
// ═══════════════════════════════════════════════════════════════

let tournamentSwiper;
function initTournamentSwiper() {
    if (typeof Swiper === 'undefined') {
        console.warn('[GV2026] Swiper not loaded yet.');
        return;
    }
    if (tournamentSwiper) tournamentSwiper.destroy();
    const container = document.querySelector('.game-arena-slider');
    if (!container) return;

    tournamentSwiper = new Swiper('.game-arena-slider', {
        slidesPerView: 4, spaceBetween: 30,
        observer: true, observeParents: true,
        watchSlidesProgress: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: { 
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 }, 
            1024: { slidesPerView: 4, spaceBetween: 30 } 
        }
    });
}

function renderTournaments(tournaments) {
    const container = document.getElementById('tournament-display');
    if (!container) return;
    container.innerHTML = tournaments.map(tour => `
        <div class="swiper-slide">
            <div class="tournament-card cyber-card">
                <div class="card-image">
                    <img src="${tour.image}" alt="${tour.name}">
                </div>
                <p class="card-category">${tour.category}</p>
                <h3 class="card-name">${tour.name}</h3>
                <div class="card-footer">
                    <div>
                        <p class="card-label">Ngày thi đấu</p>
                        <p class="card-value">${tour.date}</p>
                    </div>
                    <div style="text-align:right;">
                        <p class="card-label">Prize Pool</p>
                        <p class="card-value" style="color:var(--neon-yellow);">${tour.prize}</p>
                    </div>
                </div>
                <button onclick="openTournamentDetail('${tour.id}')" class="cyber-btn-sm" style="width:100%; padding:8px; margin-top:12px;">Chi tiết</button>
            </div>
        </div>
    `).join('');
    setTimeout(initTournamentSwiper, 100);
}

// ═══════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════

function renderFAQ() {
    const container = document.getElementById('faq-display');
    if (!container) return;
    container.innerHTML = FAQ_DATA.map((item, i) => `
        <div class="faq-item">
            <div class="faq-question" onclick="toggleFAQ(this)">
                <span>${item.q}</span>
                <span class="icon-toggle">+</span>
            </div>
            <div class="faq-answer"><p>${item.a}</p></div>
        </div>
    `).join('');
}

function toggleFAQ(el) {
    const item = el.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.icon-toggle').forEach(s => s.textContent = '+');
    if (!isActive) { item.classList.add('active'); item.querySelector('.icon-toggle').textContent = '-'; }
}

// ═══════════════════════════════════════════════════════════════
// TOURNAMENT MODAL
// ═══════════════════════════════════════════════════════════════

function openTournamentDetail(id) {
    const data = TOURNAMENT_DETAILS[id] || { title: "Đang cập nhật", intro: "—", schedule: "—", prizes: "—", game: "—", prize: "—" };
    const modal = document.getElementById('tournament-modal');
    if (!modal) return;
    
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-game').innerText = data.game;
    document.getElementById('modal-prize').innerText = data.prize;
    
    // Using innerText for these because of white-space: pre-line in CSS
    document.getElementById('modal-intro').innerText = data.intro;
    document.getElementById('modal-schedule').innerText = data.schedule;
    document.getElementById('modal-prizestructure').innerText = data.prizes;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeTournamentModal() {
    const modal = document.getElementById('tournament-modal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = 'auto'; }
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('[GV2026] Initializing scripts...');
        
        // A: Agenda từ Google Sheet
        if (typeof fetchAgendaFromSheet === 'function') fetchAgendaFromSheet();

        // B: Render
        if (typeof renderFAQ === 'function') renderFAQ();
        if (typeof renderTournaments === 'function') renderTournaments(TOURNAMENT_DATA);
        if (typeof renderFanMeeting === 'function') renderFanMeeting();
        
        // C: Map interaction
        if (typeof initMapInteraction === 'function') initMapInteraction();

        // Agenda tab switching
        const tabs = document.querySelectorAll('.cyber-btn[data-day]');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                if (typeof renderAgenda === 'function') renderAgenda(parseInt(tab.dataset.day));
            });
        });

        console.log('[GV2026] Scripts initialized successfully.');
    } catch (err) {
        console.error('[GV2026] Critical Initialization Error:', err);
    }
});
