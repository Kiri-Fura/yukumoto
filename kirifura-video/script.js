"use strict";

// 1. Supabaseの設定
const SUPABASE_URL = 'https://uhnkthmhgiszbalrzlsn.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobmt0aG1oZ2lzemJhbHJ6bHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNzc4NDcsImV4cCI6MjA4NDc1Mzg0N30.uyzrvVaWsEx52VcHbTSV5bzfQrq3jIBUAhkqDjcEVcQ';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const subCountElement = document.getElementById('sub-count');
const subscribeBtn = document.getElementById('subscribe-btn');

let userHasSubscribed = localStorage.getItem('isSubscribed') === 'true';
// ★連打ガード用の変数
let isProcessing = false;

async function fetchCount() {
    const { data, error } = await supabaseClient
        .from('channel_status_nullp')
        .select('sub_count')
        .eq('id', 1)
        .single();

    if (data) {
        subCountElement.innerText = data.sub_count.toLocaleString();
    }

    if (userHasSubscribed) {
        setSubscribedStyle();
        // ※ここにあったalertは削除しました（ページを開くたびに出るのを防ぐため）
    }
}

// --- ボタンを押した時の処理（ここを差し替え） ---
subscribeBtn.addEventListener('click', async () => {
    // 1. 処理中なら何もしない
    if (isProcessing) return;
    isProcessing = true;

    const current = parseInt(subCountElement.innerText.replace(/,/g, ''));
    let next = !userHasSubscribed ? current + 1 : current - 1;

    const { error } = await supabaseClient
        .from('channel_status_nullp')
        .update({ sub_count: next })
        .eq('id', 1);

    if (!error) {
        subCountElement.innerText = next.toLocaleString();
        userHasSubscribed = !userHasSubscribed;
        localStorage.setItem('isSubscribed', userHasSubscribed);

        if (userHasSubscribed) {
            setSubscribedStyle();
            // 2. 登録した時だけアラートを出す（これが連打ストッパーになります）
            alert("チャンネル登録しました！");
        } else {
            setUnsubscribedStyle();
        }
    }

    // 3. ガードを解除
    isProcessing = false;
});

function setSubscribedStyle() {
    subscribeBtn.innerText = "登録済み (解除)";
    subscribeBtn.style.backgroundColor = "#ccc";
}

function setUnsubscribedStyle() {
    subscribeBtn.innerText = "チャンネル登録";
    subscribeBtn.style.backgroundColor = "#ff0000";
}

fetchCount();

// --- 以下、renderVideosなどは変更なし ---
const videos = [];
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
window.onload = () => { renderVideos(); };
