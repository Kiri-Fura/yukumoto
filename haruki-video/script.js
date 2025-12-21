"use strict";

// 型指定（: Video[]）を削除して、純粋な配列にします
const myVideos = [
  {
    title: "フォトナ版ブレインロットPart.1",
    thumbnail: "https://lh3.googleusercontent.com/d/1MGd7qc3cvCn1q20VJz5VpZU0xxRTaeIa", // 実際には有効な画像URLが必要です
    url: "https://kiri-fura.github.io/yukumoto/haruki-1/index.html"
  }
];

function renderVideos() {
  const grid = document.getElementById('video-grid');
  if (!grid) {
    console.error("video-gridが見つかりません");
    return;
  }
  
  grid.innerHTML = myVideos.map(video => `
    <div class="video-card" onclick="location.href='${video.url}'" style="cursor: pointer;">
      <img src="${video.thumbnail}" class="video-thumbnail" alt="thumbnail">
      <div class="video-info">
        <h3>${video.title}</h3>
      </div>
    </div>
  `).join('');
}

// ページが読み込まれたら実行
window.addEventListener('load', renderVideos);
