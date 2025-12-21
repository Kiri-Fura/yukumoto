"use strict";
const newsData = [
    {
        date: "2025/12/20",
        category: "動画",
        title: "【新着】マイクラスキン比較動画をアップ！",
        content: "最新の動画をGoogleドライブ経由で視聴できるようになりました。"
    }
];
function renderNews() {
    const newsList = document.getElementById('news-list');
    if (!newsList)
        return;
    newsList.innerHTML = newsData.map(item => `
    <div class="news-item">
      <div class="news-meta">
        <span class="news-date">${item.date}</span>
        <span class="news-badge badge-${item.category}">${item.category}</span>
      </div>
      <h3 class="news-title">${item.title}</h3>
      <p class="news-content">${item.content}</p>
    </div>
  `).join('');
}
// ページ読み込み時に実行
window.onload = () => {
    renderNews();
};