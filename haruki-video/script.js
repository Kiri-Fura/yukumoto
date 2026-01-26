"use strict";

// 1. Supabaseの設定（あなたのURLと鍵）
const SUPABASE_URL = 'https://uhnkthmhgiszbalrzlsn.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobmt0aG1oZ2lzemJhbHJ6bHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNzc4NDcsImV4cCI6MjA4NDc1Mzg0N30.uyzrvVaWsEx52VcHbTSV5bzfQrq3jIBUAhkqDjcEVcQ';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const subCountElement = document.getElementById('sub-count');
const subscribeBtn = document.getElementById('subscribe-btn');

// ブラウザのメモ帳を確認（登録済みかどうかの記録）
let userHasSubscribed = localStorage.getItem('isSubscribed') === 'true';

// --- 数字を読み込んで表示を整える関数 ---
async function fetchCount() {
    const { data, error } = await supabaseClient
        .from('channel_status_nullp')
        .select('sub_count')
        .eq('id', 1)
        .single();

    if (data) {
        subCountElement.innerText = data.sub_count.toLocaleString();
    }

    // 既に登録済みなら見た目を変える
    if (userHasSubscribed) {
        setSubscribedStyle();
    }
}

// --- ボタンを押した時の処理 ---
subscribeBtn.addEventListener('click', async () => {
    const current = parseInt(subCountElement.innerText.replace(/,/g, ''));
    let next;

    if (!userHasSubscribed) {
        next = current + 1; // 登録（＋1）
    } else {
        next = current - 1; // 解除（ー1）
    }

    const { error } = await supabaseClient
        .from('channel_status_nullp')
        .update({ sub_count: next })
        .eq('id', 1);

    if (!error) {
        subCountElement.innerText = next.toLocaleString();
        
        // 状態を反転させて保存
        userHasSubscribed = !userHasSubscribed;
        localStorage.setItem('isSubscribed', userHasSubscribed);

        // 見た目を更新
        if (userHasSubscribed) {
            setSubscribedStyle();
        } else {
            setUnsubscribedStyle();
        }
    }
});

// 見た目の切り替え
function setSubscribedStyle() {
    subscribeBtn.innerText = "登録済み (解除)";
    subscribeBtn.style.backgroundColor = "#ccc";
}

function setUnsubscribedStyle() {
    subscribeBtn.innerText = "チャンネル登録";
    subscribeBtn.style.backgroundColor = "#ff0000";
}

// 最初に実行！
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
