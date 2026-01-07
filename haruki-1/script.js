"use strict";

// Firebaseから機能を取り出す（HTMLで準備した窓口を使います）
const db = window.db;
const { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, deleteDoc } = window.dbFunctions;

// --- 統計機能（視聴回数などは、一旦今まで通りlocalStorageで動かします） ---
function setupStats() {
    let views = Number(localStorage.getItem('viewCount')) || 0;
    let subscribers = Number(localStorage.getItem('subCount')) || 100;
    let isSubscribed = localStorage.getItem('isSubscribed') === 'true';

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

// --- コメント機能（ここがFirebase版です！） ---
let isAdmin = localStorage.getItem('isAdmin') === 'true';

function setupComments() {
    const input = document.getElementById('comment-input');
    const submitBtn = document.getElementById('comment-submit-btn');
    const list = document.getElementById('comment-list');
    const countDisplay = document.getElementById('comment-count');

    if (!list || !countDisplay) return;

    // 1. クラウド(Firestore)からコメントを自動取得する設定
    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    
    // 誰かが投稿すると、この中身が自動で動きます（リアルタイム同期）
    onSnapshot(q, (snapshot) => {
        const commentsData = [];
        snapshot.forEach((snapshotDoc) => {
            commentsData.push({ id: snapshotDoc.id, ...snapshotDoc.data() });
        });

        countDisplay.innerText = commentsData.length.toString();
        
        list.innerHTML = commentsData.map((c) => `
            <div class="comment-item">
                <div class="comment-text">
                    <h4>${c.userName || "名無しさん"}</h4>
                    <p>${c.text}</p>
                    ${isAdmin ? `<button class="delete-btn" onclick="deleteComment('${c.id}')">削除</button>` : ''}
                </div>
            </div>
        `).join('');
    });

    // 2. 送信ボタンを押した時、クラウドに保存する
    if (submitBtn) {
        submitBtn.onclick = async () => {
            if (input.value.trim() === "") return;

            try {
                await addDoc(collection(db, "comments"), {
                    userName: "ゲストさん", // ここをゆくもと（自分）にしてもOK
                    text: input.value,
                    createdAt: serverTimestamp() // サーバーの時間を使う
                });
                input.value = ""; // 入力欄を空にする
            } catch (e) {
                console.error("保存に失敗しました:", e);
            }
        };
    }
}

// 管理者用の削除機能
window.deleteComment = async (id) => {
    if (confirm("このコメントを完全に削除しますか？")) {
        try {
            await deleteDoc(doc(db, "comments", id));
            // 削除された瞬間、画面も自動で更新されます
        } catch (e) {
            console.error("削除失敗:", e);
        }
    }
};

// 読み込み時に全部実行
window.onload = () => {
    setupStats();
    setupComments();
};
