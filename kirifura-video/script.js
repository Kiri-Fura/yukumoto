"use strict";

// 1. あなたのURLと鍵をここにしっかり入れる
const SUPABASE_URL = 'https://uhnkthmhgiszbalrzlsn.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobmt0aG1oZ2lzemJhbHJ6bHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNzc4NDcsImV4cCI6MjA4NDc1Mzg0N30.uyzrvVaWsEx52VcHbTSV5bzfQrq3jIBUAhkqDjcEVcQ';

// 2. 接続（window.supabase を使うのが確実です）
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const subCountElement = document.getElementById('sub-count');
const subscribeBtn = document.getElementById('subscribe-btn');

// 3. 数字を読み込む
async function fetchCount() {
    const { data, error } = await supabaseClient
        .from('channel_status_nullp')
        .select('sub_count')
        .eq('id', 1)
        .single();

    if (data) {
        subCountElement.innerText = data.sub_count.toLocaleString();
    }
}

// 4. ボタンで増やす
subscribeBtn.addEventListener('click', async () => {
    const current = parseInt(subCountElement.innerText.replace(/,/g, ''));
    const next = current + 1;

    const { error } = await supabaseClient
        .from('channel_status_nullp')
        .update({ sub_count: next })
        .eq('id', 1);

    if (!error) {
        subCountElement.innerText = next.toLocaleString();
        subscribeBtn.innerText = "登録済み";
        subscribeBtn.disabled = true;
        alert("登録完了！Supabaseの数字も増えたはずです！");
    }
});

fetchCount();
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
