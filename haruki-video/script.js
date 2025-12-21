"use strict";
const myVideos: Video[] =[
  {
    title: "フォトナ版ブレインロットPart.1",//動画タイトル
    thumbnail: "https://lh3.googleusercontent.com/d/1MGd7qc3cvCn1q20VJz5VpZU0xxRTaeIa", // ドライブ直リンク
    url: "https://kiri-fura.github.io/yukumoto/haruki-1/index.html"//動画url
  }
    ];
function renderVideos() {
    const grid = document.getElementById('video-grid');
    if (!grid)
        return;
    grid.innerHTML = myVideos.map(video => `
    <div class="video-card" onclick="location.href='${video.url}'">
      <img src="${video.thumbnail}" class="video-thumbnail" alt="thumbnail">
      <div class="video-info">
        <h3>${video.title}</h3>
      </div>
    </div>
  `).join('');
}
window.onload = () => {
    renderVideos();
};
