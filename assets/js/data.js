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
    // Row B (1-9)
    { id: 1, name: "WR LOL", x: 220, y: 200, desc: "Gian hàng trải nghiệm Tốc Chiến và Liên Minh Huyền Thoại.", link: "#" },
    { id: 2, name: "Naraka CODM", x: 220, y: 240, desc: "Gian hàng trải nghiệm Naraka: Bladepoint và Call of Duty Mobile.", link: "#" },
    { id: 3, name: "PUBGM", x: 220, y: 280, desc: "Gian hàng trải nghiệm PUBG Mobile.", link: "#" },
    { id: 4, name: "VNG Games Stage", x: 150, y: 400, desc: "Khu vực trải nghiệm các siêu phẩm di động từ nhà phát hành VNG Games.", link: "https://vng.com", hasMission: true, mission: "Trải nghiệm thử thách mini-game tại booth VNG và chụp ảnh check-in.", gift: "Keychain Limited Edition" },
    { id: 5, name: "CFL PTG", x: 200, y: 400, desc: "Gian hàng trải nghiệm Crossfire Legends và các tựa game bắn súng.", link: "#" },
    { id: 6, name: "Rob Lox", x: 250, y: 400, desc: "Gian hàng trải nghiệm Roblox cho cộng đồng sáng tạo.", link: "#" },
    { id: 7, name: "NTH", x: 250, y: 450, desc: "Gian hàng trải nghiệm công nghệ và game mới.", link: "#" },
    { id: 8, name: "GHOST", x: 250, y: 500, desc: "Gian hàng trải nghiệm game kinh dị và hành động.", link: "#" },
    { id: 9, name: "VLTK", x: 250, y: 550, desc: "Gian hàng trải nghiệm Võ Lâm Truyền Kỳ.", link: "#" },

    // Row C (10-28)
    { id: 10, name: "GOOGLE", x: 350, y: 200, desc: "Không gian công nghệ Google Play và các giải pháp cho Game.", link: "#" },
    { id: 11, name: "Garena", x: 420, y: 250, desc: "Sân chơi sôi động của cộng đồng Liên Quân Mobile, Free Fire và AOV.", link: "https://garena.vn", hasMission: true, mission: "Hoàn thành 1 ván đấu tại khu vực demo.", gift: "Sticker Pack & Giftcode" },
    { id: 12, name: "Momo", x: 380, y: 350, desc: "Trải nghiệm thanh toán tiện lợi cùng Ví MoMo trong game.", link: "#" },
    { id: 13, name: "Vietlot", x: 430, y: 350, desc: "Gian hàng tương tác Vietlott.", link: "#" },
    { id: 14, name: "VNG", x: 380, y: 420, desc: "Khu vực trải nghiệm hệ sinh thái VNG.", link: "#" },
    { id: 15, name: "FShop", x: 430, y: 420, desc: "Gian hàng phụ kiện và thiết bị chơi game FPT Shop.", link: "#" },
    { id: 16, name: "VNG", x: 380, y: 480, desc: "Khu vực trải nghiệm Game VNG.", link: "#" },
    { id: 17, name: "VNG", x: 430, y: 480, desc: "Khu vực trải nghiệm Game VNG.", link: "#" },
    { id: 18, name: "Berocca", x: 480, y: 480, desc: "Trạm tiếp năng lượng Berocca Performance.", link: "#" },
    { id: 19, name: "GOSU", x: 550, y: 480, desc: "Vũ trụ game kiếm hiệp kỳ ảo từ nhà phát hành GOSU.", link: "https://gosu.vn", hasMission: true, mission: "Tham gia Mini Game 'Cửu Âm Chân Kinh' tại booth.", gift: "Badge Exclusive & Giftcode" },
    { id: 20, name: "Funtap", x: 550, y: 420, desc: "Khám phá thế giới MMORPG và nhập vai hấp dẫn từ Funtap.", link: "https://funtap.vn", hasMission: true, mission: "Chụp ảnh cùng nhân vật cosplay của Funtap.", gift: "Poster chữ ký & Sticker" },
    { id: 21, name: "Funtap", x: 550, y: 350, desc: "Khu vực trải nghiệm game chiến thuật Funtap.", link: "#" },
    { id: 22, name: "OEG", x: 480, y: 420, desc: "Hệ sinh thái Esports Ocean Entertainment Group.", link: "#" },
    { id: 23, name: "Romano", x: 480, y: 350, desc: "Khu vực chăm sóc phong cách phái mạnh Romano.", link: "#" },
    { id: 24, name: "Stove", x: 480, y: 280, desc: "Nền tảng game Stove từ Smilegate.", link: "#" },
    { id: 25, name: "VTC", x: 550, y: 280, desc: "Trải nghiệm dàn game mobile mới nhất từ VTC Mobile.", link: "https://vtcmobile.vn", hasMission: true, mission: "Tham gia thử thách Aim Test.", gift: "Giftcode VIP" },
    { id: 26, name: "VTC", x: 620, y: 280, desc: "Khu vực thi đấu eSports VTC.", link: "#" },
    { id: 27, name: "Travellet", x: 500, y: 180, desc: "Ứng dụng tiện ích cho game thủ Travellet.", link: "#" },
    { id: 28, name: "VTC", x: 580, y: 180, desc: "Khu vực trải nghiệm game VTC.", link: "#" },

    // Row D (29-41)
    { id: 29, name: "Soha", x: 700, y: 180, desc: "Gian hàng trải nghiệm game từ SohaGame.", link: "#" },
    { id: 30, name: "1Game", x: 700, y: 250, desc: "Gian hàng cộng đồng 1Game.", link: "#" },
    { id: 31, name: "Gamota", x: 700, y: 350, desc: "Khu vực trải nghiệm game Gamota.", link: "#" },
    { id: 32, name: "VTV live + Mỳ", x: 700, y: 420, desc: "Gian hàng kết hợp VTV live và Acecook.", link: "#" },
    { id: 33, name: "Monster", x: 700, y: 500, desc: "Trạm năng lượng Monster Energy.", link: "#" },
    { id: 34, name: "Phương Nam", x: 780, y: 180, desc: "Nhà sách Phương Nam - Khu vực quà tặng anime/manga.", link: "#" },
    { id: 35, name: "Thanh", x: 780, y: 250, desc: "Gian hàng đối tác Thế Anh 28.", link: "#" },
    { id: 36, name: "FTel", x: 780, y: 350, desc: "Trải nghiệm Internet tốc độ cao FPT Telecom.", link: "#" },
    { id: 37, name: "iKame", x: 780, y: 420, desc: "Studio phát triển game iKame.", link: "#" },
    { id: 38, name: "VLG Dorco", x: 780, y: 500, desc: "Gian hàng phong cách sống VLG & Dorco.", link: "#" },
    { id: 39, name: "Hobby", x: 850, y: 180, desc: "Khu vực đồ chơi mô hình Hobby.", link: "#" },
    { id: 40, name: "Ozone CDIT", x: 850, y: 420, desc: "Thiết bị chơi game Ozone Gaming.", link: "#" },
    { id: 41, name: "KCC", x: 850, y: 500, desc: "KCC Shop - Máy tính và linh kiện PC Gaming.", link: "#" },

    // Row A (42-43)
    { id: 42, name: "Wonderland", x: 650, y: 100, desc: "Khu vực check-in Wonderland.", link: "#" },
    { id: 43, name: "Byte", x: 700, y: 100, desc: "Gian hàng trải nghiệm công nghệ Byte.", link: "#" },
    { id: 44, name: "SEAAF", x: 400, y: 140, desc: "Khu vực thi đấu eSports SEAAF.", link: "#" },
    { id: 45, name: "VKING", x: 380, y: 170, desc: "Gian hàng trải nghiệm VKING.", link: "#" },
    { id: 46, name: "STING", x: 430, y: 170, desc: "Trạm tiếp năng lượng Sting.", link: "#" }
];

// ── C. FAN MEETING DATA ──────────────────────────────────────
// ── C. FAN MEETING DATA ──────────────────────────────────────
const FANMEETING_DATA = {
    title: "Fan Meeting: Esports All-Star",
    subtitle: "Giao lưu cùng thế hệ vàng Esports Việt",
    description: "Cơ hội có 1-0-2 để tương tác trực tiếp, nhận chữ ký và thi đấu showmatch cùng các Pro Player và Gaming Creator hàng đầu.",
    cta: { text: "MUA VÉ FAN MEETING", link: "https://esportsfan.net/order/checkout?lang=vi" },
    roster: {
        1: [
            { name: "LEVI", role: "JUNGLE", team: "GAM ESPORTS", tag: "MVP", img: "assets/images/fanmeeting_1.jpg", active: true },
            { name: "DEP", role: "DỰ BỊ", team: "SAIGON PHANTOM AOV", tag: "STAR", img: "assets/images/fanmeeting_2.jpg", active: true },
            { name: "JIRO", role: "DỰ BỊ", team: "SAIGON PHANTOM AOV", tag: "LEGEND", img: "assets/images/fanmeeting_1.jpg", active: true },
            { name: "HIDE", role: "MID", team: "SAIGON PHANTOM MLBB", tag: "STAR", img: "assets/images/fanmeeting_2.jpg", active: true },
            { name: "RAI", role: "ADC", team: "SAIGON PHANTOM MLBB", tag: "MVP", img: "assets/images/fanmeeting_1.jpg", active: true }
        ],
        2: [
            { name: "ĐỖ THÀNH LUÂN", role: "PLAYER", team: "SAIGON PHANTOM FC MOBILE", tag: "LEGEND", img: "assets/images/fanmeeting_2.jpg", active: true },
            { name: "ĐỖ MINH LÂM", role: "PLAYER", team: "SAIGON PHANTOM FC MOBILE", tag: "MVP", img: "assets/images/fanmeeting_1.jpg", active: true },
            { name: "TRIẾT", role: "ADL", team: "SUPERNOVA", tag: "STAR", img: "assets/images/fanmeeting_2.jpg", active: true },
            { name: "PHOENIX", role: "JUNG", team: "SUPERNOVA", tag: "LEGEND", img: "assets/images/fanmeeting_1.jpg", active: true },
            { name: "VERITAS", role: "SUBS", team: "SUPERNOVA", tag: "STAR", img: "assets/images/fanmeeting_2.jpg", active: true }
        ]
    }
};

// ── TOURNAMENT DATA ──────────────────────────────────────────
const TOURNAMENT_DATA = [
    { id: 'vmc', name: 'VMC Spring 2026 Grand Finals', category: 'LEAGUE OF LEGENDS', date: '08/05/2026', prize: '500,000,000 VNĐ', image: 'assets/images/background giai dau game arena/1.png' },
    { id: 'sea_tf', name: 'SEA Esports Nation Cup - Total Football', category: 'TOTAL FOOTBALL', date: '09/05/2026', prize: '560,000,000 VNĐ', image: 'assets/images/background giai dau game arena/2.png' },
    { id: 'sea_cf', name: 'SEA Esports Nation Cup - Crossfire Legend', category: 'CROSSFIRE LEGEND', date: '08/05/2026', prize: '525,000,000 VNĐ', image: 'assets/images/background giai dau game arena/3.png' },
    { id: 'sea_pubg', name: 'SEA Esports Nation Cup - PUBG Mobile', category: 'PUBG MOBILE', date: '09/05/2026', prize: '560,000,000 VNĐ', image: 'assets/images/background giai dau game arena/4.png' },
    { id: 'fc', name: 'FC Mobile Invitation Cup 2026', category: 'FC MOBILE', date: '09/05/2026', prize: '380,000,000 VNĐ', image: 'assets/images/background giai dau game arena/5.png' },
    { id: 'git', name: 'GIT - SILKROAD ORIGIN MOBILE 2026', category: 'SILKROAD ORIGIN', date: '09/05/2026', prize: '305,000,000 VNĐ', image: 'assets/images/background giai dau game arena/6.jpg' }
];

const TOURNAMENT_DETAILS = {
    vmc: {
        title: 'VMC Spring 2026 Grand Finals',
        image: 'assets/images/background giai dau game arena/1.png',
        intro: 'VMC Spring 2026 là giải đấu chuyên nghiệp cấp quốc gia do Hội Thể thao điện tử giải trí Việt Nam (VIRESA) tổ chức, phối hợp cùng Công ty cổ phần phát triển công nghệ số Hồng Hà và Công ty Cổ phần dịch vụ trực tuyến FPT (FPT Online) tổ chức. Giải đấu đóng vai trò phát hiện, đào tạo và phát triển các vận động viên năng khiếu, góp phần bổ sung nguồn nhân lực cho đội tuyển quốc gia bộ môn Mobile Legends: Bang Bang, phù hợp với chiến lược phát triển thể thao điện tử tại Việt Nam, nâng cao thể thao thành tích cao tại các Đại hội Thể thao như Đại hội thể thao Đông Nam Á ( SEA Games), Đại hội Thể thao châu Á ( Asian Games), Đại hội thể thao trẻ châu Á ( Asian Youth Games), Thế vận hội thể thao điện tử Olympic ( Olympic Esports Games). Hệ thống Giải đấu được tổ chức thường xuyên theo định kỳ, đảm bảo tính chuyên nghiệp, minh bạch và phù hợp với các quy định của pháp luật Việt Nam.',
        date: '14h00 - 19h00, 08/05',
        prize: '500,000,000 VNĐ',
        format: '5 vs 5',
        location: 'Sân khấu Game, Vietnam GameVerse 2026 - Trung Tâm Hội Chợ và Triển Lãm Sài Gòn (SECC)'
    },
    sea_tf: {
        title: 'SEA Esports Nation Cup - Total Football',
        image: 'assets/images/background giai dau game arena/2.png',
        intro: 'Trong khuôn khổ hệ thống giải đấu SNC, bộ môn Total Football được xác định là nội dung thi đấu trọng điểm nhằm tìm kiếm những vận động viên có tư duy chiến thuật và kỹ năng điều khiển bóng ưu việt. Giải đấu được tổ chức với tổng giá trị giải thưởng là 22.000 USD, vận hành theo các tiêu chuẩn kỹ thuật chuyên nghiệp. Cấu trúc thi đấu của bộ môn bao gồm hai hạng mục chính: Nội dung Cá nhân (1vs1): Đánh giá kỹ năng kiểm soát trận đấu, tư duy chiến thuật đơn lẻ và khả năng ứng biến trực tiếp của vận động viên. Nội dung Đồng đội (2vs2): Tập trung vào sự phối hợp giữa hai vận động viên, khả năng bọc lót và triển khai chiến thuật nhóm trong không gian hẹp. Kết quả chung cuộc sẽ được căn cứ trên bảng xếp hạng sau vòng chung kết. Ban tổ chức sẽ tiến hành trao tặng Huy chương Vàng, Huy chương Bạc và Huy chương Đồng cho các cá nhân và đội tuyển đạt thứ hạng Nhất, Nhì và Ba tại mỗi nội dung thi đấu, nhằm xác lập thành tích chính thức trong hệ thống chuyên nghiệp.',
        date: '09/05/2026',
        prize: '560,000,000 VNĐ',
        format: '1 vs 1 / 2 vs 2',
        location: 'Sân khấu Game, Vietnam GameVerse 2026 - Trung Tâm Hội Chợ và Triển Lãm Sài Gòn (SECC)'
    },
    sea_cf: {
        title: 'SEA Esports Nation Cup - Crossfire Legend',
        image: 'assets/images/background giai dau game arena/3.png',
        intro: 'Giải đấu CrossFire: Legends là nội dung thi đấu chính thức thuộc hệ thống SNC, được tổ chức nhằm đánh giá năng lực chuyên môn và phân hạng các vận động viên thể thao điện tử. Giải đấu có tổng giá trị giải thưởng là 20.000 USD, áp dụng quy trình vận hành và kiểm soát chuyên nghiệp đối với hai hạng mục: Nội dung Cá nhân (Solo): Kiểm tra kỹ năng tác chiến độc lập, phản xạ và tư duy xử lý tình huống đơn lẻ. Nội dung Đồng đội (5vs5): Đánh giá năng lực phối hợp chiến thuật, quản lý nguồn lực và khả năng hiệp đồng giữa các vị trí trong đội hình. Cơ cấu danh hiệu của giải đấu được xác lập dựa trên kết quả chung cuộc của từng nội dung. Theo đó, ban tổ chức sẽ tiến hành trao tặng Huy chương Vàng, Huy chương Bạc và Huy chương Đồng tương ứng cho các vị trí Nhất, Nhì và Ba ở cả hai hạng mục Cá nhân và Đồng đội. Đây là những chứng nhận thành tích chính thức, ghi nhận vị thế của các vận động viên và tập thể trong hệ thống xếp hạng của SNC.',
        date: '08/05/2026',
        prize: '525,000,000 VNĐ',
        format: 'Solo / 5vs5',
        location: 'Sân khấu Game, Vietnam GameVerse 2026 - Trung Tâm Hội Chợ và Triển Lãm Sài Gòn (SECC)'
    },
    sea_pubg: {
        title: 'SEA Esports Nation Cup - PUBG Mobile',
        image: 'assets/images/background giai dau game arena/4.png',
        intro: 'SEA Esports Nation Cup (SNC) - PUBG Mobile là giải vô địch thể thao điện tử cấp đội tuyển quốc gia đầu tiên tại khu vực Đông Nam Á do Liên đoàn Thể thao điện tử Đông Nam Á (SEAEF) sở hữu và được tổ chức offline tại Việt Nam trong khuôn khổ sự kiện Vietnam GameVerse 2026. Giải đấu này quy tụ các đội tuyển đại diện cho các quốc gia trong khu vực tranh tài ở bộ môn PUBG Mobile, nơi các vận động viên được thi đấu dưới tư cách tuyển thủ quốc gia chính thống và kết quả được công nhận ở cấp độ vinh dự cao nhất. Hệ thống thi đấu của SNC được thiết kế chặt chẽ nhằm tuyển chọn những hạt giống xuất sắc nhất đại diện cho Đông Nam Á tiến thẳng tới đấu trường quốc tế Esports Nations Cup (ENC) tại Riyadh, qua đó khẳng định vị thế và bản sắc của nền Esports khu vực trên bản đồ thế giới theo định hướng "Do Local, Go Global".',
        date: '09/05/2026',
        prize: '560,000,000 VNĐ',
        format: 'Đồng đội',
        location: 'Sân khấu Game, Vietnam GameVerse 2026 - Trung Tâm Hội Chợ và Triển Lãm Sài Gòn (SECC)'
    },
    fc: {
        title: 'FC Mobile Invitation Cup 2026',
        image: 'assets/images/background giai dau game arena/5.png',
        intro: 'FC Mobile Invitation Cup 2026 là giải đấu quốc tế quy mô lớn được tổ chức theo hình thức offline trong khuôn khổ sự kiện GameVerse 2026, diễn ra từ ngày 08/05 đến 09/05/2026. Giải đấu quy tụ 08 vận động viên chuyên nghiệp, bao gồm 04 đại diện xuất sắc nhất từ giải FC Mobile Super League Spring 2026 và 04 tuyển thủ quốc tế có thành tích tích cực tại các giải đấu khu vực. Các vận động viên sẽ thi đấu theo thể thức Nhánh thắng nhánh thua (Double Elimination) trên thiết bị và tài khoản do Ban tổ chức cung cấp. Các vòng đấu ngoài áp dụng chế độ Best of 2 (Bo2), riêng trận Chung kết tổng thi đấu theo chế độ Best of 3 (Bo3). Tổng giá trị giải thưởng của giải đấu là 15.000 USD. Toàn bộ diễn biến giải đấu được phát sóng trực tiếp với thời lượng 6 tiếng trên các kênh truyền thông chính thức của FC Mobile Việt Nam (Facebook, YouTube, TikTok). Bên cạnh các nội dung thi đấu chính thức, sự kiện còn bao gồm các trận showmatch của khách mời mời chuyên môn và hoạt động trải nghiệm trực tiếp tại khu vực booth game cho khách tham dự.',
        date: '08 - 09/05/2026',
        prize: '380,000,000 VNĐ',
        format: '1vs1, nhánh thắng nhánh thua',
        location: 'Sân khấu Game, Vietnam GameVerse 2026 - Trung Tâm Hội Chợ và Triển Lãm Sài Gòn (SECC)'
    },
    git: {
        title: 'GIT - SILKROAD ORIGIN MOBILE 2026',
        image: 'assets/images/background giai dau game arena/6.jpg',
        intro: 'Nằm trong khuôn khổ sự kiện Vietnam GameVerse 2026, giải đấu quốc tế GOSUVERSE INTERNATIONAL TOURNAMENT bộ môn Silkroad Origin Mobile là sân chơi chuyên nghiệp do GOSU phối hợp cùng BTC Vietnam Gameverse 2026 tổ chức. Giải đấu quy tụ các đội tuyển quốc tế tham gia tranh tài với tổng giá trị giải thưởng là 305.000.000 VNĐ. Cấu trúc và quy tắc thi đấu của giải đấu được quy định cụ thể như sau: Nội dung thi đấu: Thi đấu đội 3vs3 loại trực tiếp (Single Elimination) để xác định đội vô địch. Quy chuẩn trận đấu: Toàn bộ các vòng đấu được vận hành theo thể thức Bo1. Riêng trận Chung kết thi đấu theo thể thức Bo3. Giải đấu tập trong vào việc tìm kiếm nhà vô địch quốc tế thông qua hệ thống giải thưởng tiền mặt và không nằm trong hạng mục tranh huy chương. Đây là sự kiện trọng điểm nhằm thúc đẩy giao lưu quốc tế và khẳng định vị thế của dòng game Silkroad Origin Mobile trong cộng đồng Esports.',
        date: '09/05/2026',
        prize: '305,000,000 VNĐ',
        format: '3 vs 3',
        location: 'Sân khấu Game, Vietnam GameVerse 2026 - Trung Tâm Hội Chợ và Triển Lãm Sài Gòn (SECC)'
    }
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
