"use strict";

// 1. 動画のデータを定義（= を忘れないように注意！）
const myVideos = [
    {
    title: "test",//動画タイトル
    thumbnail: "", // 前回のドライブ直リンクなど
    url: ""//動画url
  }
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
 // 表示する部分
list.innerHTML = videos.map(v => `
  <div class="video-item">
    <img src="${v.thumbnailUrl || 'https://lh3.googleusercontent.com/u/0/d/1MGd7qc3cvCn1q20VJz5VpZU0xxRTaeIa'}" alt="${v.title}">
    <h3>${v.title}</h3>
  </div>
`).join('');
}

// 3. ページが全部読み込まれたら実行する
window.addEventListener('load', renderVideos);
