/* ============================================================
   Vietnam GameVerse 2026 — Commands.js
   Manages: Agenda (Google Sheet), Game Arena, FAQ, Venue Map, Fan Meeting
   ============================================================ */

// ── DATA MOVED TO data.js ──────────────────
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
    const container = document.querySelector('.cyber-table-container');
    if (!tbody || !container) return;

    const data = AGENDA_LIVE || AGENDA_FALLBACK;
    const rows = data[day] || [];

    if (!rows.length) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-dim); padding:20px;">Đang cập nhật lịch trình...</td></tr>`;
        return;
    }

    // Always use table layout to match reference site
    tbody.innerHTML = rows.map(item => {
        if (item.all || (!item.game && !item.wonderland && !item.b2b)) {
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

function renderMapMarkers() {
    const overlay = document.querySelector('.map-overlay');
    const legend = document.querySelector('.map-legend');
    if (!overlay || !legend || typeof VENUE_ZONES === 'undefined') return;

    overlay.innerHTML = VENUE_ZONES.map(b => `
        <g class="booth-marker ${b.hasMission ? 'mission' : ''}" data-id="${b.id}" onclick="showBoothInfo(${b.id})" title="${b.name}">
            <circle class="pulse-ring" cx="${b.x}" cy="${b.y}" r="12" fill="none" stroke="var(--neon-cyan)" stroke-width="2" />
            <circle cx="${b.x}" cy="${b.y}" r="12" fill="var(--neon-cyan)"/>
            <text x="${b.x}" y="${b.y + 4}" text-anchor="middle" fill="#000" font-size="10" font-weight="bold">${b.id}</text>
        </g>
    `).join('');

    legend.innerHTML = VENUE_ZONES.map(b => `
        <div class="legend-item" data-id="${b.id}" style="cursor:pointer; padding: 5px; border-radius: 4px; transition: background 0.3s;" onclick="showBoothInfo(${b.id})" onmouseover="this.style.background='rgba(0,242,255,0.1)'" onmouseout="this.style.background='transparent'">
            <span style="color:var(--neon-yellow); font-weight:bold;">(${b.id})</span> ${b.name}
        </div>
    `).join('');
    
    legend.style.gridTemplateColumns = 'repeat(auto-fill, minmax(180px, 1fr))';
}

// Drag/Pan logic
function initMapInteraction() {
    renderMapMarkers();
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
    const sheet = document.getElementById('map-bottom-sheet');
    const sheetContent = document.getElementById('sheet-content');
    
    if (!booth) return;

    // Highlight active marker & legend item
    document.querySelectorAll('.booth-marker').forEach(m => m.classList.remove('active'));
    document.querySelectorAll('.legend-item').forEach(l => l.classList.remove('active'));
    
    const activeMarker = document.querySelector(`.booth-marker[data-id="${id}"]`);
    if (activeMarker) activeMarker.classList.add('active');

    const activeLegend = document.querySelector(`.legend-item[data-id="${id}"]`);
    if (activeLegend) activeLegend.classList.add('active');

    const missionHTML = booth.hasMission ? `
        <div class="booth-mission-block">
            <div class="mission-title">🌟 NHIỆM VỤ WONDERLAND</div>
            <p class="mission-desc">${booth.mission}</p>
            <div class="mission-gift">🎁 Phần quà: <strong style="color:var(--neon-yellow)">${booth.gift}</strong></div>
            <button class="booth-link-btn" onclick="scrollToWonderland(${id})">
                XEM NHIỆM VỤ CHI TIẾT
            </button>
        </div>` : '';

    const contentHTML = `
        <div class="popup-number">${id < 10 ? '0'+id : id}</div>
        <h4 class="popup-name">${booth.name}</h4>
        <p class="popup-desc">${booth.desc}</p>
        ${missionHTML}
        <a href="${booth.link}" target="_blank" class="popup-website">TRANG CHỦ ĐƠN VỊ →</a>
    `;

    if (window.innerWidth <= 768 && sheet && sheetContent) {
        // Mobile: Show Bottom Sheet
        sheetContent.innerHTML = contentHTML;
        sheet.classList.add('visible');
        if (popup) popup.classList.remove('visible');
    } else if (popup) {
        // Desktop: Show Popup
        popup.innerHTML = `
            <button class="popup-close" onclick="closeBoothPopup()">✕</button>
            ${contentHTML}
        `;
        popup.classList.add('visible');
        if (sheet) sheet.classList.remove('visible');
    }
}

function closeMapBottomSheet() {
    const sheet = document.getElementById('map-bottom-sheet');
    if (sheet) sheet.classList.remove('visible');
    document.querySelectorAll('.booth-marker').forEach(m => m.classList.remove('active'));
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

    // Combine roster from FANMEETING_DATA
    const roster = [
        ...FANMEETING_DATA.roster[1].filter(p => p.name !== "???"),
        ...FANMEETING_DATA.roster[2].filter(p => p.name !== "???"),
        { name: "???", role: "CLASSIFIED", team: "TBA", img: "", active: false }
    ];

    container.innerHTML = `
        <div class="fm-tactical-wrapper">
            <div class="fm-header-panel" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px;">
                <div class="fm-title-block">
                    <div class="scan-line"></div>
                    <h3 class="cyber-glitch-title" data-text="Fan Meeting: Esports All-Star">Fan Meeting: Esports All-Star</h3>
                    <p class="cyber-subtitle">${FANMEETING_DATA.subtitle}</p>
                    <p class="cyber-desc">${FANMEETING_DATA.description}</p>
                </div>
                
                <div class="fm-info-text" style="color: var(--neon-cyan); font-size: 15px; font-weight: bold; line-height: 1.8; text-align: right; background: rgba(0, 242, 255, 0.1); padding: 15px; border-radius: 8px; border: 1px solid rgba(0, 242, 255, 0.2);">
                    <div>Thời gian: 11h00 - 13h00, 09/05</div>
                    <div>Địa điểm: Sân khấu Wonderland</div>
                </div>
            </div>

            <div class="swiper fanmeeting-swiper" style="margin-top: 30px; overflow: hidden;">
                <div class="swiper-wrapper">
                    ${roster.map(p => `
                        <div class="swiper-slide">
                            <div class="athlete-card ${!p.active ? 'locked' : ''}">
                                <div class="athlete-bg" ${p.active ? `style="background-image: url('${p.img}')"` : ''}></div>
                                <div class="athlete-hud">
                                    <div class="athlete-info">
                                        <div class="athlete-role">${p.role} // ${p.team}</div>
                                        <div class="athlete-name">${p.name}</div>
                                    </div>
                                </div>
                                ${!p.active ? '<div class="lock-icon"><svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>' : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="swiper-pagination" style="position: relative; margin-top: 20px;"></div>
            </div>
        </div>
    `;

    // Initialize Swiper for Fan Meeting
    new Swiper('.fanmeeting-swiper', {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
            320: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 16 },
            1024: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 }
        }
    });
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
        slidesPerView: 4, 
        slidesPerGroup: 4,
        spaceBetween: 24,
        observer: true, observeParents: true,
        watchSlidesProgress: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: {
            320: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 16 },
            1024: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 24 }
        }
    });
}

function renderTournaments(tournaments) {
    const container = document.getElementById('tournament-display');
    if (!container) return;

    const cards = tournaments.map(tour => `
        <div class="swiper-slide">
            <div class="tournament-card">
                <div class="card-image">
                    <img src="${tour.image}" alt="${tour.name}" style="width:100%; height:180px; object-fit:cover; border-radius:8px; display:block;">
                </div>
                <p class="card-category" style="color:var(--neon-cyan); font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:1px; margin:14px 0 8px;">${tour.category}</p>
                <h3 class="card-name" style="color:#fff; font-size:15px; font-weight:700; line-height:1.4; margin:0 0 16px;">${tour.name}</h3>
                <div class="card-footer" style="margin-top:auto;">
                    <p style="color:rgba(255,255,255,0.6); font-size:13px; margin:0 0 4px;">${tour.date}</p>
                    <p style="color:rgba(255,255,255,0.7); font-size:12px; font-weight:500; margin:0 0 4px;">Prize Pool</p>
                    <p style="color:var(--neon-yellow); font-size:16px; font-weight:700; margin:0 0 14px;">${tour.prize}</p>
                    <button onclick="openTournamentDetail('${tour.id}')" class="tournament-detail-btn">Chi tiết</button>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = cards;
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
    const data = TOURNAMENT_DETAILS[id] || {
        title: 'Đang cập nhật', intro: '—', date: '—', prize: '—', format: '—', location: '—', image: ''
    };
    const modal = document.getElementById('tournament-modal');
    if (!modal) return;

    const img = document.getElementById('tm-img');
    if (img) { img.src = data.image || ''; img.alt = data.title || ''; }

    const el = (id) => document.getElementById(id);
    if (el('tm-intro'))    el('tm-intro').innerText    = data.intro    || '—';
    if (el('tm-date'))     el('tm-date').innerText     = data.date     || '—';
    if (el('tm-prize'))    el('tm-prize').innerText    = data.prize    || '—';
    if (el('tm-format'))   el('tm-format').innerText   = data.format   || '—';
    if (el('tm-location')) el('tm-location').innerText = data.location || '—';

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeTournamentModal() {
    const modal = document.getElementById('tournament-modal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
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

        // Initialize Magnific Popup for Cosplay
        if (typeof $.fn.magnificPopup !== 'undefined') {
            $('.cosplay-zoom-link').magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                mainClass: 'mfp-fade mfp-img-mobile',
                image: {
                    verticalFit: true,
                    markup: '<div class="mfp-figure">'+
                              '<div class="mfp-close"></div>'+
                              '<div class="mfp-img"></div>'+
                              '<div class="mfp-bottom-bar">'+
                                '<div class="mfp-title"></div>'+
                                '<div class="mfp-counter"></div>'+
                              '</div>'+
                            '</div>'
                },
                gallery: {
                    enabled: true
                },
                zoom: {
                    enabled: true,
                    duration: 300,
                    opener: function(element) {
                        return element.find('img');
                    }
                },
                callbacks: {
                    resize: function() {
                        var img = this.content.find('.mfp-img');
                        if (img.length) {
                            img.css('max-height', '80vh');
                        }
                    },
                    imageLoadComplete: function() {
                        var self = this;
                        setTimeout(function() {
                            self.wrap.addClass('mfp-ready');
                        }, 16);
                    }
                }
            });
        }

        console.log('[GV2026] Scripts initialized successfully.');

        // Re-render agenda on resize to switch between mobile/desktop layouts
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (typeof renderAgenda === 'function') renderAgenda(currentAgendaDay);
            }, 250);
        });
    } catch (err) {
        console.error('[GV2026] Critical Initialization Error:', err);
    }
});

// ═══════════════════════════════════════════════════════════════
// MOBILE UX ENHANCEMENTS (Bottom Nav & FAB)
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    const bottomNavItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');
    const sections = ['supper_masthead', 'section-agenda', 'section-venue-map', 'section-tournament'];

    // Handle Scroll Spy for Bottom Nav
    window.addEventListener('scroll', () => {
        let currentSection = sections[0];
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 150) {
                    currentSection = sectionId;
                }
            }
        });

        bottomNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === currentSection) {
                item.classList.add('active');
            }
        });
    });

    // Handle Smooth Scroll for all [data-target]
    document.querySelectorAll('[data-target]').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const headerOffset = 80;
                const elementPosition = targetEl.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
