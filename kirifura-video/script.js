"use strict";
"use strict";

// URLと鍵（すでにコピーしてくれたもの）
const SUPABASE_URL = 'https://uhnkthmhgiszbalrzlsn.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...（長い鍵）';

// 変数名がぶつからないように設定
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --------------------------------------------------
// 以下、データを読み込む部分も「supabaseClient」に書き換えます
// --------------------------------------------------

async function fetchSubCount() {
  const { data, error } = await supabaseClient  // ここを修正
    .from('channel_status_nullp')
    .select('sub_count')
    .eq('id', 1)
    .single();

  if (data) {
    document.getElementById('sub-count').innerText = data.sub_count.toLocaleString();
  }
}

// ページを開いた時に実行
fetchSubCount();

// 1. 動画のデータ（デバッグ用）
const videos = [
];

// 2. 画面に表示する関数
function renderVideos() {
  const videoGrid = document.getElementById('video-grid');
  if (!videoGrid) return;

  videoGrid.innerHTML = videos.map(v => `
    <div class="video-item">
      <a href="${v.url}" target="_blank">
        <img src="${v.thumbnail || 'https://via.placeholder.com/250x140'}" alt="${v.title}">
      </a>
      <div class="video-info">
        <h3>${v.title}</h3>
      </div>
    </div>
  `).join('');
}

// 実行（HTMLが読み込まれてから動くようにonloadに入れます）
window.onload = () => {
  renderVideos();
};
