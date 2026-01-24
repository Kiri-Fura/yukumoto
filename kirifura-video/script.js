"use strict";

const SUPABASE_URL = 'https://uhnkthmhgiszbalrzlsn.supabase.co'; 
const SUPABASE_ANON_KEY = 'あなたの鍵';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const subCountElement = document.getElementById('sub-count');
const subscribeBtn = document.getElementById('subscribe-btn');

// --- 1. 状態を管理する変数 ---
// ブラウザのメモ帳に 'isSubscribed' という名前でデータがあるか確認する
let userHasSubscribed = localStorage.getItem('isSubscribed') === 'true';

// --- 2. 初期表示の切り替え ---
async function init() {
    // DBから最新の数字を持ってくる
    const { data } = await supabaseClient
        .from('channel_status_nullp')
        .select('sub_count')
        .eq('id', 1)
        .single();

    if (data) {
        subCountElement.innerText = data.sub_count.toLocaleString();
    }

    // もし過去に登録していたら、ボタンを「解除」の状態にしておく
    if (userHasSubscribed) {
        setSubscribedStyle();
    }
}

// --- 3. ボタンを押した時の処理 ---
subscribeBtn.addEventListener('click', async () => {
    const current = parseInt(subCountElement.innerText.replace(/,/g, ''));
    let next;

    if (!userHasSubscribed) {
        // 【登録】 +1 する
        next = current + 1;
    } else {
        // 【解除】 -1 する
        next = current - 1;
    }

    const { error } = await supabaseClient
        .from('channel_status_nullp')
        .update({ sub_count: next })
        .eq('id', 1);

    if (!error) {
        subCountElement.innerText = next.toLocaleString();
        
        // 状態を反転させる
        userHasSubscribed = !userHasSubscribed;
        
        // ブラウザのメモ帳（LocalStorage）に保存する
        localStorage.setItem('isSubscribed', userHasSubscribed);

        // 見た目を更新
        if (userHasSubscribed) {
            setSubscribedStyle();
        } else {
            setUnsubscribedStyle();
        }
    }
});

// 見た目の設定関数
function setSubscribedStyle() {
    subscribeBtn.innerText = "登録済み (解除)";
    subscribeBtn.style.backgroundColor = "#ccc";
    subscribeBtn.style.color = "#333";
}

function setUnsubscribedStyle() {
    subscribeBtn.innerText = "チャンネル登録";
    subscribeBtn.style.backgroundColor = "#ff0000";
    subscribeBtn.style.color = "#fff";
}

init();
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
