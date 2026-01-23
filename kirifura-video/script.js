// 1. 動画のデータ（デバッグ用）
const videos = [
  {
    title: "test",
    // さきほど作成した直リンクをここに貼ります
    thumbnail: "https://lh3.googleusercontent.com/u/0/d/1MGd7qc3cvCn1q20VJz5VpZU0xxRTaeIa", 
    url: "" // 実際の動画URLがあれば
  }
];

// 2. 画面に表示する関数
function renderVideos() {
  const videoGrid = document.getElementById('video-grid');
  if (!videoGrid) return;

  videoGrid.innerHTML = videos.map(v => `
    <div class="video-item">
      <a href="${v.url}" target="_blank">
        <img src="${v.thumbnail |https://lh3.googleusercontent.com/u/0/d/1MGd7qc3cvCn1q20VJz5VpZU0xxRTaeIa| ''}" alt="${v.title}">
      </a>
      <div class="video-info">
        <h3>${v.title}</h3>
      </div>
    </div>
  `).join('');
}

// 実行
renderVideos();
