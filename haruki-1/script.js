"use strict";

// 1. Firebaseの設定（HTML側で window に入れたものを使います）
const db = window.db;
const { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } = window.dbFunctions;

// --- チャンネル登録・視聴回数 (ここも将来的にDB化できますが、一旦維持します) ---
let views = Number(localStorage.getItem('viewCount')) || 0;
let subscribers = Number(localStorage.getItem('subCount')) || 100;
let isSubscribed = localStorage.getItem('isSubscribed') === 'true';

function setupStats() {
    const viewElement = document.getElementById('view-count');
    const subBtn = document.getElementById('subscribe-btn');
    const subCountElement = document.getElementById('sub-count');

    views++;
    localStorage.setItem('viewCount', views.toString());
    if (viewElement) viewElement.innerText = views.toLocaleString();

    if (subBtn && subCountElement) {
        if (isSubscribed) {
            subBtn.innerText = "登録済み";
            subBtn.classList.add("subscribed");
        }
        subCountElement.innerText = subscribers.toLocaleString();

        subBtn.onclick = () => {
            if (!isSubscribed) {
                subscribers++;
                isSubscribed = true;
                subBtn.innerText = "登録済み";
                subBtn.classList.add("subscribed");
            } else {
                subscribers--;
                isSubscribed = false;
                subBtn.innerText = "チャンネル登録";
                subBtn.classList.remove("subscribed");
            }
            localStorage.setItem('isSubscribed', isSubscribed.toString());
            localStorage.setItem('subCount', subscribers.toString());
            subCountElement.innerText = subscribers.toLocaleString();
        };
    }
}

// --- コメント機能 (Firebase版) ---
let isAdmin = localStorage.getItem('isAdmin') === 'true';

function setupComments() {
    const input = document.getElementById('comment-input');
    const submitBtn = document.getElementById('comment-submit-btn');
    const list = document.getElementById('comment-list');
    const countDisplay = document.getElementById('comment-count');

    if (!list || !countDisplay) return;

    // 2. クラウド上のコメントを監視（リアルタイム更新）
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    
    onSnapshot(q, (snapshot) => {
        const commentsData = [];
        snapshot.forEach((doc) => {
            commentsData.push({ id: doc.id, ...doc.data() });
        });

        countDisplay.innerText = commentsData.length.toString();
        
        list.innerHTML = commentsData.map((c) => `
            <div class="comment-item">
                <div class="comment-text">
                    <h4>${c.userName}</h4>
                    <p>${c.text}</p>
                    ${isAdmin ? `<button class="delete-btn" onclick="deleteComment('${c.id}')">削除</button>` : ''}
                </div>
            </div>
        `).join(''); // Firebase側で降順取得するので、reverseは不要
    });

    // 3. 送信ボタンをクラウド保存に変更
    if (submitBtn) {
        submitBtn.onclick = async () => {
            if (input.value.trim() === "") return;

            try {
                await addDoc(collection(db, "comments"), {
                    userName: "ゆくもと（ゲスト）", // ここを好きな名前に
                    text: input.value,
                    createdAt: serverTimestamp() // サーバー時間で保存
                });
                input.value = "";
            } catch (e) {
                console.error("保存失敗:", e);
                alert("コメントの送信に失敗しました。");
            }
        };
    }
}

// 起動時に実行
window.onload = () => {
    setupStats();
    setupComments();
};
