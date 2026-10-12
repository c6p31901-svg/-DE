
import { initializeApp, getApp, getApps } from "firebase/app";
import { getDataConnect } from "firebase/data-connect";
import {
    connectorConfig,
    listGarbagePosts
} from "../src/dataconnect-generated/esm/index.esm.js";

const firebaseConfig = {
    apiKey: "AIzaSyCYDC_cEmV1ElV6GqFqph5ieGS9akQ8v9tg",
    authDomain: "beach-cleanup-14fd4.firebaseapp.com",
    projectId: "beach-cleanup-14fd4",
    storageBucket: "beach-cleanup-14fd4.firebasestorage.app",
    messagingSenderId: "415491442995",
    appId: "1:415491442995:web:f354f5aceb67c4c5a75646"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const dataConnect = getDataConnect(app, connectorConfig);
const trashList = document.getElementById("trash-list");

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function formatDate(value) {
    if (!value) return "日時不明";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
        ? "日時不明"
        : date.toLocaleString("ja-JP");
}

async function loadTrashPosts() {
    trashList.innerHTML =
        '<p class="text-slate-600">投稿を読み込んでいます...</p>';

    try {
        const result = await listGarbagePosts(dataConnect);
        const posts = result.data?.garbagePosts ?? [];

        if (posts.length === 0) {
            trashList.innerHTML =
                '<p class="text-slate-600">投稿はまだありません。</p>';
            return;
        }

        posts.sort((a, b) =>
            new Date(b.postedAt ?? 0) - new Date(a.postedAt ?? 0)
        );

        trashList.innerHTML = posts.map(post => {
            const photo = post.photoUrl
                ? `<img src="${escapeHtml(post.photoUrl)}"
                    alt="投稿されたごみの写真"
                    class="w-36 h-28 object-cover rounded border"
                    loading="lazy">`
                : `<div class="w-36 h-28 bg-slate-200 flex items-center justify-center">
                    写真なし
                   </div>`;

            return `
                <article class="flex flex-col sm:flex-row gap-4 pb-6 border-b border-slate-300">
                    <div class="shrink-0">${photo}</div>
                    <div class="flex-1 min-w-0 space-y-2 text-slate-900">
                        <p>${escapeHtml(formatDate(post.postedAt))}</p>
                        <p>投稿者：${escapeHtml(post.user?.displayName || "投稿者不明")}</p>
                        <p class="break-words">コメント：${escapeHtml(post.comment || "コメントなし")}</p>
                        <p>回収状況：${escapeHtml(post.collectionStatus || "未設定")}</p>
                        <p>緯度：${escapeHtml(post.latitude)} / 経度：${escapeHtml(post.longitude)}</p>
                    </div>
                </article>
            `;
        }).join("");
    } catch (error) {
        console.error("投稿一覧の取得に失敗しました:", error);
        trashList.innerHTML =
            '<p class="text-red-600">投稿を読み込めませんでした。F12のConsoleを確認してください。</p>';
    }
}

document.getElementById("nav-trash-btn")
    ?.addEventListener("click", loadTrashPosts);
