"use strict";
interface Video {
  title: string;
  thumbnail: string;
  url: string;
}
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
