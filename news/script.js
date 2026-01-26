"use strict";
const newsData = [

                    {
        date: "2026/1/17",
        category: "社長のBlog",
        title: "第28回WBCで優勝しました！",
        content: "第28回WBCで無事優勝することができました！※WBCとは....World Black Companyの略だよ！世界でブラック企業のブラックさで競い合う！ゆくストは28年連続で優勝してるよ！"
        },
  
                  {
        date: "2026/1/14",
        category: "社長のBlog",
        title: "BAD APPLE!!",
        content: "BAD APPLE!!をBGMにしたmontage作りたいんでしばらく投稿遅れます"
        },
                {
        date: "2025/12/31",
        category: "社長のBlog",
        title: "今年も1年あざました",
        content: "もう2025が終わる！？早いって(笑)なんかいろいろあったな。今は紅白見てます。"
        },
        {
        date: "2025/12/29",
        category: "社長のBlog",
        title: "今年も1年あざました",
        content: "今年も1年あざました。3学期もみんな夜露死苦☆あと、グラコロ食べたんだけど、みんな、おいしいから絶対食べようね。とろーり3種のチーズパイも忘れずにね(圧"
        },
        
        {
        date: "2025/12/27",
        category: "社長のBlog",
        title: "ハルキくんとJAVA版してきた",
        content: "JAVA版を買ったハルキくんとJAVA版でハイピした。楽しかった"
        },
        
        {
        date: "2025/12/21",
        category: "サイト",
        title: "ホームページを作り直しました",
        content: "ホームページを見やすく、作り直しました。これで今週の土日の2日を棒に振ってますwww"
        },
    
    {
        date: "2025/12/21",
        category: "動画",
        title: "【新着】フォトナ版ブレインロットPart.1",
        content: "フォトナ版ブレインロットPart.1を投稿しました。見てくれたらうれしいです。"
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
