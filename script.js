// マップの初期化（中心を日本に設定）
// ダークモード風の地図タイルを使用 (CartoDB Dark Matter)
const map = L.map('map', {
    center: [38.0, 137.0],
    zoom: 5,
    zoomControl: false,
    attributionControl: false
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// ズームコントロールを右下に配置
L.control.zoom({ position: 'bottomright' }).addTo(map);

// --- 龍体データ (ユーザー提供データに基づく) ---
// 座標は概算位置です
const dragonData = [
    // 北海道エリア (頭部)
    { name: "龍の角", jp: "サハリン", world: "グリーンランド", lat: 48.0, lng: 142.5 },
    { name: "龍のひげ", jp: "国後島", world: "キューバ", lat: 44.0, lng: 146.0 },
    { name: "龍の鼻先", jp: "知床", world: "フロリダ", lat: 44.0, lng: 145.1 },
    { name: "龍のくちびる", jp: "根室半島", world: "ユカタン半島", lat: 43.3, lng: 145.7 },
    { name: "籠の目", jp: "摩周湖", world: "五大湖", lat: 43.57, lng: 144.53 },
    { name: "龍の頭", jp: "北海道", world: "北米大陸", lat: 43.0, lng: 142.0 },
    { name: "龍のあご", jp: "襟裳岬", world: "カリフォルニア半島", lat: 41.9, lng: 143.2 },
    
    // 東北エリア (首・胸)
    { name: "龍の心臓", jp: "十和田湖", world: "バイカル湖", lat: 40.4, lng: 140.9 },
    { name: "龍の肺", jp: "岩手", world: "シベリア", lat: 39.7, lng: 141.1 },
    { name: "龍の肩甲骨", jp: "牡鹿半島", world: "朝鮮半島", lat: 38.3, lng: 141.5 },
    { name: "龍の横隔膜", jp: "仙台港", world: "黄河", lat: 38.2, lng: 141.0 },

    // 中部・関東エリア
    { name: "龍の右手", jp: "房総半島", world: "マレー半島", lat: 35.1, lng: 140.0 },
    { name: "龍の左手・玉", jp: "能登半島・珠洲", world: "スカンジナビア", lat: 37.4, lng: 137.2 },
    { name: "龍の左乳", jp: "富士山", world: "ヒマラヤ", lat: 35.36, lng: 138.72 },
    { name: "龍の右乳", jp: "伊豆半島", world: "インド半島", lat: 34.9, lng: 138.9 },
    { name: "龍のへそ", jp: "伊勢湾", world: "ペルシャ湾", lat: 34.7, lng: 136.7 },

    // 近畿エリア
    { name: "龍の子宮", jp: "琵琶湖", world: "カスピ海", lat: 35.3, lng: 136.1 },
    { name: "龍の腰", jp: "紀伊半島", world: "アラビア半島", lat: 34.0, lng: 135.8 },
    { name: "淡路島", jp: "淡路島", world: "ニュージーランド", lat: 34.3, lng: 134.8 },

    // 中国・四国エリア
    { name: "龍の尻", jp: "中国地方", world: "ヨーロッパ", lat: 35.0, lng: 133.5 },
    { name: "龍の右足", jp: "四国", world: "オーストラリア", lat: 33.7, lng: 133.5 },
    { name: "龍の腸", jp: "瀬戸内海", world: "地中海", lat: 34.2, lng: 133.2 },

    // 九州・沖縄エリア
    { name: "龍の左足", jp: "九州", world: "アフリカ", lat: 32.5, lng: 131.0 }, // ※元データに世界対応がなかったのでアフリカ(通説)を仮定
    { name: "龍の尾のつけ根", jp: "種子島", world: "マダガスカル", lat: 30.5, lng: 130.9 },
    { name: "龍の尾", jp: "沖縄", world: "南米大陸", lat: 26.2, lng: 127.7 }
];

// カスタムアイコンの定義
const dragonIcon = L.divIcon({
    className: 'custom-icon',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
});

// マーカーを地図に配置
dragonData.forEach(data => {
    const marker = L.marker([data.lat, data.lng], { icon: dragonIcon }).addTo(map);
    
    // クリック時のイベント
    marker.on('click', () => {
        showDetails(data);
        
        // カメラを少し移動
        map.flyTo([data.lat, data.lng], 8, {
            animate: true,
            duration: 1.5
        });
    });
});

// 詳細パネルを表示する関数
function showDetails(data) {
    document.getElementById('part-name').innerText = data.name;
    document.getElementById('jp-loc').innerText = data.jp;
    document.getElementById('world-loc').innerText = data.world;
    
    const panel = document.getElementById('info-panel');
    panel.classList.remove('hidden');
}

// パネルを閉じる関数
function closePanel() {
    document.getElementById('info-panel').classList.add('hidden');
    map.flyTo([38.0, 137.0], 5, { duration: 1.5 }); // 全体図に戻る
}

// マウス座標を表示する演出
map.on('mousemove', (e) => {
    document.getElementById('cursor-coords').innerText = 
        `LAT: ${e.latlng.lat.toFixed(4)} LON: ${e.latlng.lng.toFixed(4)}`;
});
