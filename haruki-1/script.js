"use strict";
// 1. メモ帳（localStorage）から前回のデータを読み込む
// || 0 や || 100 は「データが空ならこの数字を使う」という意味
let views = Number(localStorage.getItem('viewCount')) || 0;
let subscribers = Number(localStorage.getItem('subCount')) || 100;
let isSubscribed = localStorage.getItem('isSubscribed') === 'true';
function setupStats() {
    // HTML要素を取得
    const viewElement = document.getElementById('view-count');
    const subBtn = document.getElementById('subscribe-btn');
    const subCountElement = document.getElementById('sub-count');
    // --- 視聴回数の処理 ---
    views++; // ページを開くたびに+1
    localStorage.setItem('viewCount', views.toString()); // 保存
    if (viewElement) {
        viewElement.innerText = views.toLocaleString(); // 1,000のようにカンマを入れると本格的
    }
    // --- チャンネル登録の初期表示 ---
    if (subBtn && subCountElement) {
        // 以前に登録していたら「登録済み」の状態にする
        if (isSubscribed) {
            subBtn.innerText = "登録済み";
            subBtn.classList.add("subscribed");
        }
        subCountElement.innerText = subscribers.toLocaleString();
        // --- ボタンをクリックした時の動き ---
        subBtn.onclick = () => {
            if (!isSubscribed) {
                // 登録する
                subscribers++;
                isSubscribed = true;
                subBtn.innerText = "登録済み";
                subBtn.classList.add("subscribed");
            }
            else {
                // 登録解除する
                subscribers--;
                isSubscribed = false;
                subBtn.innerText = "チャンネル登録";
                subBtn.classList.remove("subscribed");
            }
            // 状態をメモ帳（localStorage）に保存
            localStorage.setItem('isSubscribed', isSubscribed.toString());
            localStorage.setItem('subCount', subscribers.toString());
            // 画面の数字を更新
            subCountElement.innerText = subscribers.toLocaleString();
        };
    }
}
// 他の関数と一緒に実行
window.onload = () => {
    setupStats(); // 回数と登録
    setupComments();
};
// --- 関数の外（一番上など）に置いておく変数 ---
let isAdmin = localStorage.getItem('isAdmin') === 'true';
let comments = JSON.parse(localStorage.getItem('myComments') || '[]');
function setupComments() {
    const input = document.getElementById('comment-input');
    const submitBtn = document.getElementById('comment-submit-btn');
    const list = document.getElementById('comment-list');
    const countDisplay = document.getElementById('comment-count');
    // 【重要】表示用関数を書き換え
    const render = () => {
        if (!list || !countDisplay)
            return;
        countDisplay.innerText = comments.length.toString();
        list.innerHTML = comments.map((c, index) => `
      <div class="comment-item">
        <div class="comment-text">
          <h4>${c.userName}</h4>
          <p>${c.text}</p>
          
          ${isAdmin ? `<button class="delete-btn" onclick="deleteComment(${index})">削除</button>` : ''}
        </div>
      </div>
    `).reverse().join('');
    };
    render(); // 初期表示
    // 送信ボタンの処理（前と同じ）
    if (submitBtn) {
        submitBtn.onclick = () => {
            if (input.value.trim() === "")
                return;
            const newComment = { userName: "ゆくもと（自分）", text: input.value };
            comments.push(newComment);
            localStorage.setItem('myComments', JSON.stringify(comments));
            input.value = "";
            render();
        };
    }
}
// 【重要】削除用関数を「関数の外」に作成（HTMLのonclickから呼ぶため）
window.deleteComment = (index) => {
    if (confirm("このコメントを削除しますか？")) {
        comments.splice(index, 1); // 配列から特定の番号を削除
        localStorage.setItem('myComments', JSON.stringify(comments)); // 保存し直し
        // 画面を更新するために setupComments 内の render を呼ぶ代わりに、
        // location.reload() または setupComments() を再実行するか、
        // render を外に出して共通化するのがスムーズです。
        location.reload();
    }
};