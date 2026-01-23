"use strict";

// 1. Supabaseの設定（URLと今見つけた鍵）
const SUPABASE_URL = 'https://uhnkthmhgiszbalrzlsn.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobmt0aG1oZ2lzemJhbHJ6bHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNzc4NDcsImV4cCI6MjA4NDc1Mzg0N30.uyzrvVaWsEx52VcHbTSV5bzfQrq3jIBUAhkqDjcEVcQ';

// 接続（ライブラリのバージョンによって書き方が違うので、安全な方で書きます）
const supabase = window.supabase.createClient(https://uhnkthmhgiszbalrzlsn.supabase.co, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobmt0aG1oZ2lzemJhbHJ6bHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNzc4NDcsImV4cCI6MjA4NDc1Mzg0N30.uyzrvVaWsEx52VcHbTSV5bzfQrq3jIBUAhkqDjcEVcQ);

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
