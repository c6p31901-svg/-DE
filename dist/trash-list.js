
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

const app = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig);

const dataConnect = getDataConnect(app, connectorConfig);
const trashList = document.getElementById("trash-list");

/**
 * HTMLに表示する文字列をエスケープする
 */
function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

/**
 * 日時を日本語形式にする
 */
function formatDate(value) {
    if (!value) return "日時不明";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
        ? "日時不明"
        : date.toLocaleString("ja-JP");
}

/**
 * ごみ投稿一覧を表示する
 */
async function loadTrashPosts() {
    if (!trashList) {
        console.error("trash-list 要素が見つかりません。");
        return;
    }

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
                ? `
                    <img
                        src="${escapeHtml(post.photoUrl)}"
                        alt="投稿されたごみの写真"
                        class="w-36 h-28 object-cover rounded border"
                        loading="lazy"
                    >
                `
                : `
                    <div class="w-36 h-28 bg-slate-200
                                flex items-center justify-center
                                rounded text-slate-600">
                        写真なし
                    </div>
                `;

            return `
                <article class="flex flex-col sm:flex-row gap-4
                                pb-6 border-b border-slate-300">

                    <div class="shrink-0">
                        ${photo}
                    </div>

                    <div class="flex-1 min-w-0 space-y-2 text-slate-900">
                        <p>
                            <strong>投稿日時：</strong>
                            ${escapeHtml(formatDate(post.postedAt))}
                        </p>

                        <p>
                            <strong>投稿者：</strong>
                            ${escapeHtml(post.user?.displayName || "投稿者不明")}
                        </p>

                        <p class="break-words">
                            <strong>コメント：</strong>
                            ${escapeHtml(post.comment || "コメントなし")}
                        </p>

                        <p>
                            <strong>回収状況：</strong>
                            ${escapeHtml(post.collectionStatus || "未設定")}
                        </p>

                        <p>
                            <strong>緯度：</strong>
                            ${escapeHtml(post.latitude)}
                            /
                            <strong>経度：</strong>
                            ${escapeHtml(post.longitude)}
                        </p>
                    </div>
                </article>
            `;
        }).join("");

    } catch (error) {
        console.error("投稿一覧の取得に失敗しました:", error);

        trashList.innerHTML = `
            <p class="text-red-600">
                投稿を読み込めませんでした。
                F12のConsoleを確認してください。
            </p>
        `;
    }
}

/**
 * ごみ投稿用アイコンを作成する
 * ごみ集積場所のマーカーには影響しない
 */
const garbageIcon = L.divIcon({
    className: "garbage-post-icon",
    html: `
        <div style="
            width: 38px;
            height: 38px;
            background: #ffffff;
            border: 3px solid #f97316;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        ">
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="ごみ袋"
                role="img"
            >
                <path
                    d="M9 4 L15 4 L17 7
                       L19 19
                       Q19 21 17 21
                       L7 21
                       Q5 21 5 19
                       L7 7 Z"
                    fill="#fb923c"
                    stroke="#ea580c"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                />
                <path
                    d="M9 4 Q12 7 15 4"
                    fill="none"
                    stroke="#ea580c"
                    stroke-width="1.5"
                    stroke-linecap="round"
                />
                <path
                    d="M9 11 L15 11"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                />
            </svg>
        </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -19]
});

/**
 * 地図上にごみ投稿を表示する
 * index.html から window.loadGarbagePostsOnMap(map) で呼び出す
 */
async function loadGarbagePostsOnMap(map) {
    if (!map) {
        console.error("地図オブジェクトが渡されていません。");
        return;
    }

    try {
        const result = await listGarbagePosts(dataConnect);
        const posts = result.data?.garbagePosts ?? [];

        let displayedCount = 0;

        posts.forEach(post => {
            const lat = Number(post.latitude);
            const lng = Number(post.longitude);

            if (
                !Number.isFinite(lat) ||
                !Number.isFinite(lng) ||
                lat < -90 ||
                lat > 90 ||
                lng < -180 ||
                lng > 180
            ) {
                console.warn("座標が不正な投稿をスキップしました:", post);
                return;
            }

            
            const marker = L.marker([lat, lng], {
                icon: garbageIcon
            });

            const popupContent = document.createElement("div");
            popupContent.style.minWidth = "180px";

            const title = document.createElement("strong");
            title.textContent = "ごみ投稿";
            popupContent.appendChild(title);

            const date = document.createElement("p");
            date.textContent = `投稿日時：${formatDate(post.postedAt)}`;
            popupContent.appendChild(date);

            const poster = document.createElement("p");
            poster.textContent = `投稿者：${post.user?.displayName || "投稿者不明"}`;
            popupContent.appendChild(poster);

            const comment = document.createElement("p");
            comment.textContent = `コメント：${post.comment || "コメントなし"}`;
            popupContent.appendChild(comment);

            const status = document.createElement("p");
            status.textContent = `回収状況：${post.collectionStatus || "未設定"}`;
            popupContent.appendChild(status);

            if (post.photoUrl) {
                const photo = document.createElement("img");
                photo.src = post.photoUrl;
                photo.alt = "投稿されたごみの写真";
                photo.style.display = "block";
                photo.style.maxWidth = "200px";
                photo.style.maxHeight = "150px";
                photo.style.marginTop = "8px";
                photo.style.borderRadius = "6px";
                photo.style.objectFit = "cover";
                popupContent.appendChild(photo);
            }

            const collectButton = document.createElement("button");
            collectButton.textContent = "回収する";
            collectButton.type = "button";
            collectButton.style.display = "block";
            collectButton.style.width = "100%";
            collectButton.style.marginTop = "12px";
            collectButton.style.padding = "10px";
            collectButton.style.backgroundColor = "#059669";
            collectButton.style.color = "#ffffff";
            collectButton.style.border = "none";
            collectButton.style.borderRadius = "8px";
            collectButton.style.cursor = "pointer";
            collectButton.style.fontWeight = "bold";

            collectButton.addEventListener("click", () => {
                alert("ユーザー情報を取得できませんでした");
            });

            popupContent.appendChild(collectButton);

            marker.bindPopup(popupContent);
            marker.addTo(map);

            displayedCount++;
        });

        console.log(`地図に表示したごみ投稿：${displayedCount}件`);

    } catch (error) {
        console.error("地図上のごみ投稿取得に失敗しました:", error);
    }
}

/**
 * HTML側から呼び出せるようにする
 */
window.loadGarbagePostsOnMap = loadGarbagePostsOnMap;

/**
 * ごみ投稿一覧ボタン
 */
document.getElementById("nav-trash-btn")
    ?.addEventListener("click", loadTrashPosts);
