"use strict";

// 1. 動画のデータを定義（= を忘れないように注意！）
const myVideos = [
];

// 2. 動画を画面に表示する関数
function renderVideos() {
  const grid = document.getElementById('video-grid');
  
  // gridが見つからない場合はエラーを出して止める
  if (!grid) {
    console.error("エラー: HTMLの中に 'video-grid' というIDが見つかりません。");
    return;
  }

  // HTMLの中身を書き換える
  grid.innerHTML = myVideos.map(video => `
    <div class="video-card" onclick="location.href='${video.url}'" style="cursor: pointer;">
      <img src="${video.thumbnail}" class="video-thumbnail" alt="thumbnail">
      <div class="video-info">
        <h3>${video.title}</h3>
      </div>
    </div>
  `).join('');
}

// 3. ページが全部読み込まれたら実行する
window.addEventListener('load', renderVideos);
