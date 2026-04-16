/* ============================================================
   Vietnam GameVerse 2026 — Data Storage
   Store static data configuration to separate logic from content
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
